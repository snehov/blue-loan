import React from 'react'
import PropTypes from 'prop-types'
import { CalcName } from './style'
import { formatNumber } from 'utils/functions'

class OfferForm extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { offer } = this.props
    return (
      <div>
        <CalcName>Offer:</CalcName>
        totalPrincipal: {formatNumber(offer.totalPrincipal)}
        <br />
        term:{offer.term}
        <br />
        totalCostOfCredit: {formatNumber(offer.totalCostOfCredit)}
        <br />
        totalRepayableAmount: {formatNumber(offer.totalRepayableAmount)}
        <br />
        monthlyPayment: {formatNumber(offer.monthlyPayment)}
        <br />
      </div>
    )
  }
}
OfferForm.propTypes = {
  offer: PropTypes.object.isRequired,
}
export default OfferForm
