// @flow
import React, { Component } from 'react'
import './App.css'
import {concat, map, range, sortBy, reverse} from 'ramda'
import * as Sale from './Sale'
import type {SaleType} from './Sale'

import type {RecipeType} from './Recipe'

const sortByDateRecipe: RecipeType = {
  // SaleType[] => SaleType[]
  fn: (sales: SaleType[]): SaleType[] =>
    reverse(sortBy((sale) => sale.OrderDate.getTime(), sales)),
  name: "Recipe made for test purposes",
  author: "Martin Josefsson",
  license: "GNU GPL v3"
}

class App extends Component {
  state: {
    sales: SaleType[],
    recipe: RecipeType
  }
  constructor(props: any) {
    super(props)
    // Poor mans redux - simple version for this demonstration
    window.updateAppSate = this.setState
    this.state = {
      sales: [],
      recipe: sortByDateRecipe // By default sort by date, newest first
    }
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
        Sorted by date, newest first
        <Sale.SalesVisualiserView sales={this.state.sales}
                                  recipe={this.state.recipe} />
      </div>
    )
  }
}

export default App;
