import React from 'react'
import Caclutator from 'containers/Calculator'
import { Page, Column } from './style'
class Home extends React.Component {
  render() {
    return (
      <Page>
        <h1>Loan calculator</h1>
        <Column>
          <Caclutator version="mladej" title="calc" rate={0.0374} />
        </Column>
      </Page>
    )
  }
}

export default Home
