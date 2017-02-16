// @flow
import React, { Component } from 'react'
import './App.css'
import {concat, range, assoc, or} from 'ramda'
import * as Sale from './Sale'
import type {SaleType} from './Sale'

import {RecipeMenuView, RecipeEditor} from './Recipe'
import type {RecipeType} from './Recipe'
import * as store from 'store2'

const sortByDateNewestFirstRecipe: RecipeType = {
  // SaleType[] => SaleType[]
  source: "(sales) => R.reverse(R.sortBy((sale) => sale.OrderDate.getTime(), sales))",
  name: "Sort by date (newest first)",
  author: "Martin Josefsson",
  license: "GNU GPL v3"}

const sortByDateOldestFirstRecipe: RecipeType = {
  // SaleType[] => SaleType[]
  source: "(sales) => R.sortBy((sale) => sale.OrderDate.getTime(), sales)",
  name: "Sort by date (oldest first)",
  author: "Martin Josefsson",
  license: "GNU GPL v3"}

class App extends Component {
  state: {
    sales: SaleType[],
    recipe: RecipeType,
    recipes: RecipeType[],
    isEditing: boolean}
  constructor(props: any) {
    super(props)
    // Poor mans redux - simple version for this demonstration
    this.state = {
      sales: [],
      recipe: sortByDateNewestFirstRecipe,/*By default sort by date, newest first*/
      recipes: or(store.get('recipes'), // In prod, would likely be a server
                  [sortByDateNewestFirstRecipe, // Defaults
                   sortByDateOldestFirstRecipe]),
      isEditing: false}
    window.state = {
      // eslint-disable-next-line
      setRecipe: this.setRecipe.bind(this),
      toggleEditor: this.toggleEditor.bind(this)}}
  setRecipe (recipe: RecipeType) {this.setState(assoc('recipe', recipe, this.state))}
  toggleEditor () {
    const oldState = this.state;
    this.setState(assoc('isEditing',
                        (!oldState.isEditing),
                        oldState))}
  simulateAjax() {
    this.setState(() => ({
      sales: concat(
        this.state.sales,
        (range(0, 100).map(Sale.createRandomSale)))}))}
  render() {
    return (
      <div className="App">
        <button onClick={this.simulateAjax.bind(this)}>
          Simulate loading 100 sales from server
        </button>
        <div className="App-header">
          <h2>Sales Explorer</h2>
          <RecipeEditor recipe={this.state.recipe}
                        isEditing={this.state.isEditing}/>
          <RecipeMenuView recipes={this.state.recipes} />
        </div>
        <Sale.SalesVisualiserView sales={this.state.sales}
                                  recipe={this.state.recipe} />
      </div>)}}

export default App;
