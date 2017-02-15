// @flow
import React, { Component } from 'react';
import './App.css';
import {concat, map, range} from 'ramda'
import * as Sale from './Sale'
import type {SaleType} from './Sale'

class App extends Component {
  state: {
    sales: SaleType[]
  }
  constructor(props: any) {
    super(props);
    // Poor mans redux - simple version for this demonstration
    window.updateAppSate = this.setState

    this.state = {sales: []}
  }
  simulateAjax() {
    this.setState(() => ({
      sales: concat(
        this.state.sales,
        (map(Sale.createRandomSale, range(0, 100))),
      )
    }))
  }
  render() {
    return (
      <div className="App">
        <button onClick={this.simulateAjax.bind(this)}>
          Simulate loading 100 sales from server
        </button>
        <div className="App-header">
          <h2>Sales Explorer</h2>
        </div>
        <table>
          <tr>
            <th>OrderDate</th>
            <th>DeliveryCountry</th>
            <th>Manufacturer</th>
            <th>Gender</th>
            <th>Size</th>
            <th>Colour</th>
            <th>Style</th>
            <th>Count</th>
          </tr>
          {map(Sale.SaleRow, this.state.sales)}
        </table>
      </div>
    );
  }
}

export default App;
