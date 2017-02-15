// @flow
import React, { Component } from 'react'
import './App.css'
import {concat, map, range, sortBy, reverse, assoc} from 'ramda'
import * as Sale from './Sale'
import type {SaleType} from './Sale'

import {RecipeMenuView} from './Recipe'
import type {RecipeType} from './Recipe'
import * as store from 'store2'

const sortByDateNewestFirstRecipe: RecipeType = {
  // SaleType[] => SaleType[]
  fn: (sales: SaleType[]): SaleType[] =>
    reverse(sortBy((sale) => sale.OrderDate.getTime(), sales)),
  name: "Sort by date (newest first)",
  author: "Martin Josefsson",
  license: "GNU GPL v3"
}

const sortByDateOldestFirstRecipe: RecipeType = {
  // SaleType[] => SaleType[]
  fn: (sales: SaleType[]): SaleType[] =>
    (sortBy((sale) => sale.OrderDate.getTime(), sales)),
  name: "Sort by date (oldest first)",
  author: "Martin Josefsson",
  license: "GNU GPL v3"
}

function getAvailableRecepies (): RecipeType[] {
  // In the real world this would likely persist to a server
  return store.get('recipes') || [sortByDateNewestFirstRecipe,
                                  sortByDateOldestFirstRecipe]}

class App extends Component {
  state: {
    sales: SaleType[],
    recipe: RecipeType}
  constructor(props: any) {
    super(props)
    // Poor mans redux - simple version for this demonstration
    window.setRecipe = ((recipe: RecipeType) => this.setState(
      // eslint-disable-next-line
      assoc('recipe', recipe, this.state))).bind(this)
    this.state = {
      sales: [],
      recipe: sortByDateNewestFirstRecipe/*By default sort by date, newest first*/}}
  simulateAjax() {
    this.setState(() => ({
      sales: concat(
        this.state.sales,
        (map(Sale.createRandomSale, range(0, 100))))}))}
  render() {
    return (
      <div className="App">
        <button onClick={this.simulateAjax.bind(this)}>
          Simulate loading 100 sales from server
        </button>
        <div className="App-header">
          <h2>Sales Explorer</h2>
          Currently set to <em>{this.state.recipe.name}</em>
          <RecipeMenuView recipes={getAvailableRecepies()} />
        </div>
        Sorted by date, newest first
        <Sale.SalesVisualiserView sales={this.state.sales}
                                  recipe={this.state.recipe} />
      </div>
    )
  }
}

export default App;
