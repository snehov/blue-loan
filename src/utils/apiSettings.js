const apiSettings = {
  getSettings: {
    method: 'get',
    url: 'https://js-developer-second-round.herokuapp.com/api/v1/application/constraints',
    headers: { 'Content-Type': 'text/plain' },
  },
  getOffer: {
    method: 'get',
    url: 'https://js-developer-second-round.herokuapp.com/api/v1/application/real-first-loan-offer?',
    headers: { 'Content-Type': 'text/plain' },
  },
}
export default apiSettings
