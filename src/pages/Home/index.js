import React from 'react'
import Caclutator from 'containers/Calculator'
import { Page, Column } from './style'
class Home extends React.Component {
  render() {
    return (
      <Page>
        <h1>Loan calculator</h1>
        <Column>
          <Caclutator title="Calc" />
        </Column>
      </Page>
    )
  }
}

export default Home
