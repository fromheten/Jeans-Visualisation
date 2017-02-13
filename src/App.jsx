// @flow
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const r = require('rambda')

const Sale = require('./Sale')

class App extends Component {
  constructor(props: any) {
    super(props);
    // Poor mans redux - simple version for this demonstration
    window.updateAppSate = this.setState

    this.state = {sales: []}
  }
  simulateAjax() {
    this.setState(() => ({
      sales: r.map(Sale.createRandomSale, r.range(0, 100))
    }))
  }
  render() {
    return (
      <div className="App">
        <button onClick={this.simulateAjax.bind(this)}>
          Simulate loading sales from server
        </button>
        <div className="App-header">
          <img src={logo}
               className="App-logo"
               alt="logo" />
          <h2>Welcome to React</h2>
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
          {r.map(Sale.SaleRow, this.state.sales)}
        </table>
      </div>
    );
  }
}

export default App;
