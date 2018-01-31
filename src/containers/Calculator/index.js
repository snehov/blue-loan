import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Slider from 'react-rangeslider'
import OfferForm from './OfferForm'
import { isEmpty } from 'lodash'
import { sendNewCustomer } from './DataAction'
import { fetchSettings } from './getSettingsAction'
import { fetchOffer } from './offerAction'

import { CalcContainer, CalcName, SliderCont, Input, Value, SliderDescr, Button } from './style'

class Calculator extends React.Component {
  constructor(props) {
    super(props)
    this.termValues = []

    this.state = {
      paymentValue: 0,
      termLength: 0,
      offer: {},
      reacalculating: false,
    }
  }
  componentDidMount() {
    this.props.fetchSettings().then(
      res => {
        console.log('settings loaded', res)
        for (
          let i = res.termInterval.min;
          i < res.termInterval.max / res.termInterval.step;
          i += res.termInterval.step
        ) {
          this.termValues.push({ name: i, value: i })
        }
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
  //  amount handlers
  handlePaymentChange = value => {
    this.setState({ paymentValue: value })
  }
  handlePaymentChangeComplete = value => {
    this.giveMeAnOffer()
  }
  handlePaymentTextChange = event => {
    this.setState({ paymentValue: parseInt(event.target.value) })
  }
  handlePaymentTextChangeComplete = value => {
    this.giveMeAnOffer()
  }
  _handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.giveMeAnOffer()
      e.target.blur()
    }
  }
  validatePaymentValue() {
    const { paymentValue } = this.state
    const valid = Math.round(paymentValue / 10) * 10
    if (valid !== paymentValue) {
      this.setState({ paymentValue: valid })
    }
    console.log('validate num ' + this.state.paymentValue + ' => ' + valid)
    return valid
  }
  // length handlers
  handleLengthChange = value => {
    this.setState({ termLength: value })
  }
  handleLengthTextChange = event => {
    this.setState({ termLength: parseInt(event.target.value) }, () => this.giveMeAnOffer())
  }
  handleLengthChangeComplete = value => {
    this.giveMeAnOffer()
  }
  // call for an offer to a server
  giveMeAnOffer() {
    const { termLength } = this.state
    const paymentValue = this.validatePaymentValue(this.state.paymentValue)
    this.setState({ reacalculating: true })
    console.log('give me an offer with length: ' + termLength + ', and amount: ' + paymentValue)
    this.props.fetchOffer(paymentValue, termLength).then(
      res => {
        this.setState({ offer: res, reacalculating: false })
        console.log('result of offer', res)
      },
      err => {
        console.log('fail with offer', err)
      },
    )
  }

  render() {
    const { paymentValue, termLength, offer, reacalculating } = this.state
    const { title, version } = this.props
    const settings = this.props.settings.settingsValues

    if (isEmpty(settings)) {
      return <div>Loading</div>
    } else {
      return (
        <div>
          <CalcName>{title}</CalcName>
          <CalcContainer>
            <SliderDescr>Amount</SliderDescr>
            <SliderCont
              min={settings.amountInterval.min}
              max={settings.amountInterval.max}
              step={settings.amountInterval.step}
              value={paymentValue}
              orientation="horizontal"
              onChange={this.handlePaymentChange}
              onChangeComplete={this.handlePaymentChangeComplete}
            />
            <Value>
              <Input
                type="number"
                value={paymentValue}
                onChange={this.handlePaymentTextChange}
                onBlur={this.handlePaymentTextChangeComplete}
                onKeyPress={this._handleKeyPress}
              />
            </Value>

            <SliderDescr>Term</SliderDescr>
            <SliderCont
              min={settings.termInterval.min}
              max={settings.termInterval.max}
              step={settings.termInterval.step}
              value={termLength}
              orientation="horizontal"
              onChange={this.handleLengthChange}
              onChangeComplete={this.handleLengthChangeComplete}
            />
            <Value>
              <select name="termLength" value={termLength} onChange={this.handleLengthTextChange}>
                {!isEmpty(this.termValues) &&
                  this.termValues.map(function(value) {
                    return (
                      <option value={value.value} key={value.value}>
                        {value.name}
                      </option>
                    )
                  })}
              </select>
            </Value>
            {reacalculating ? <p>calculating...</p> : <OfferForm offer={offer} />}
          </CalcContainer>
        </div>
      )
    }
  }
}
Calculator.propTypes = {
  fetchSettings: PropTypes.func.isRequired,
  fetchOffer: PropTypes.func.isRequired,
}
function mapStateToProps(state) {
  return {
    settings: state.settings,
  }
}
export default connect(mapStateToProps, { fetchSettings, fetchOffer })(Calculator)
