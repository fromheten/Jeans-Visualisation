// @flow
import React, { Component } from 'react'
import './App.css'
import {concat, range, assoc, or, not, equals} from 'ramda'
import * as Sale from './Sale'
import type {SaleType} from './Sale'

import {RecipeMenuView, RecipeEditor, RecipeDisplay} from './Recipe'
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

export default class App extends Component {
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
      toggleEditor: this.toggleEditor.bind(this),
      saveRecipe: this.saveRecipe.bind(this)}}
  setRecipe (recipe: RecipeType) {this.setState(assoc('recipe', recipe, this.state))}
  toggleEditor () {
    const oldState = this.state;
    this.setState(assoc('isEditing',
                        (!oldState.isEditing),
                        oldState))}
  saveRecipe (oldRecipe: RecipeType, event: Event) {
    // Overwrites the old recipe with the new one
    // A novel idea would be to keep commits
    // Since Recipes are immutable, we could save a long history of them.
    // With that you would also get "undo save", and be able to go back in history
    const {target} = event;
    if (!(target instanceof window.HTMLInputElement)) {
      // If here, there is type error
      return;
    }
    const newRecipe = assoc(target.name,
                            target.value,
                            oldRecipe)
    const oldRecipeCollection = this.state.recipes
    const oldState = this.state
    this.setState(
      assoc('recipe',
            newRecipe,
            assoc('recipes',
                  saveRecipe(oldRecipe,
                             newRecipe,
                             oldRecipeCollection),
                  oldState)))}

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
          {this.state.isEditing ? <RecipeEditor recipe={this.state.recipe} />
           : <RecipeDisplay recipe={this.state.recipe} />}
          <RecipeMenuView recipes={this.state.recipes} />
        </div>
        <Sale.SalesVisualiserView sales={this.state.sales}
                                  recipe={this.state.recipe} />
      </div>)}}

export function saveRecipe(oldRecipe: RecipeType,
                           newRecipe: RecipeType,
                           recipeCollection: RecipeType[]) {
  return concat(
    recipeCollection.filter((recipe) => not(equals(recipe, oldRecipe))),
    [newRecipe]
  )
}
