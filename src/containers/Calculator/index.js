import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { sendNewCustomer } from './DataAction'
import Slider from 'react-rangeslider'
import { fetchSettings } from './getSettingsAction'

import {
  CalcContainer,
  CalcName,
  Color,
  SliderCont,
  Input,
  Value,
  SliderDescr,
  ResolutionMsg,
  ResolutionAmount,
  Button,
} from './style'

class Calculator extends React.Component {
  constructor(props) {
    super(props)
    this.minPayment = 0
    this.maxPayment = 0
    this.minTermLength = 0
    this.maxTermLength = 0
    this.rate = this.props.rate
    this.state = {
      paymentValue: this.minPayment,
      termLength: 1,
      savings: '',
      configurator: this.props.version,
    }
  }
  componentDidMount() {
    this.props.fetchSettings().then(
      res => {
        console.log('setting loaded', res)
        this.minPayment = res.amountInterval.min
        this.maxPayment = res.amountInterval.max
        this.paymentStep = res.amountInterval.step
        this.paymentDefaultValue = res.amountInterval.defaultValue

        this.minTermLength = res.termInterval.min
        this.maxTermLength = res.termInterval.max
        this.termStep = res.termInterval.step
        this.termDefaultValue = res.termInterval.defaultValue
        //this.forceUpdate()
        this.setState({
          paymentValue: res.amountInterval.defaultValue,
          termLength: res.termInterval.defaultValue,
        })
      },
      err => {
        console.log('fail', err)
      },
    )
  }
  handlePaymentChange = value => {
    this.setState({ paymentValue: value }, () => this.calcSavings())
  }
  handlePaymentTextChange = event => {
    this.setState({ paymentValue: parseInt(event.target.value) }, () => this.calcSavings())
  }
  handleLengthChange = value => {
    this.setState({ termLength: value }, () => this.calcSavings())
  }
  handleLengthTextChange = event => {
    this.setState({ termLength: parseInt(event.target.value) }, () => this.calcSavings())
  }
  calcSavings() {
    let multiply = this.state.termLength * (this.state.paymentValue * 12)
    let savings = this.formatNumber(multiply + multiply * this.rate)
    this.setState({ savings })
  }
  submit = event => {
    event.preventDefault()
    console.log('submit')

    this.props.sendNewCustomer(this.state).then(
      res => {
        console.log('customer added')
      },
      err => {
        console.log('fail with customer', err)
      },
    )
  }
  formatNumber(value) {
    let nStr = String(Math.round(value, 2))
    nStr += ''
    let x = nStr.split('.')
    let x1 = x[0]
    let x2 = x.length > 1 ? '.' + x[1] : ''
    var rgx = /(\d+)(\d{3})/
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ' ' + '$2')
    }
    return x1 + x2
  }

  render() {
    const { paymentValue, termLength } = this.state
    const { title, version } = this.props
    //console.log('SETTINGS', this.props.settings.settingsValues)
    return (
      <div>
        <CalcName>
          termice <Color name={version}>{title}</Color>
        </CalcName>
        <CalcContainer>
          <SliderDescr>Amount</SliderDescr>
          <SliderCont
            min={this.minPayment}
            max={this.maxPayment}
            step={this.paymentStep}
            value={paymentValue}
            orientation="horizontal"
            onChange={this.handlePaymentChange}
          />
          <Value>
            <Input type="number" value={paymentValue} onChange={this.handlePaymentTextChange} /> Kč
          </Value>

          <SliderDescr>Term</SliderDescr>
          <SliderCont
            min={this.minTermLength}
            max={this.maxTermLength}
            step={this.termStep}
            value={termLength}
            orientation="horizontal"
            onChange={this.handleLengthChange}
          />
          <Value>
            <Input type="number" value={termLength} onChange={this.handleLengthTextChange} /> let
          </Value>
          <ResolutionMsg>resolution {this.rate * 100}% </ResolutionMsg>
          <ResolutionAmount>
            {this.state.savings}
            {this.state.savings != '' && ' Kč'}
          </ResolutionAmount>
          <Button name={version} onClick={this.submit}>
            ok
          </Button>
        </CalcContainer>
      </div>
    )
  }
}
Calculator.propTypes = {
  /* sendNewCustomer: PropTypes.func.isRequired, */
  fetchSettings: PropTypes.func.isRequired,
}
function mapStateToProps(state) {
  return {
    settings: state.settings,
  }
}
export default connect(mapStateToProps, { fetchSettings })(Calculator)
