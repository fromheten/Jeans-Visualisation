// @flow
import React, { Component } from 'react'
import './App.css'
import {concat, range, assoc, not, equals} from 'ramda'
import * as Sale from './Sale'
import type {SaleType} from './Sale'

import {RecipeMenuView, RecipeEditorView, RecipeDisplayView} from './Recipe'
import type {RecipeType} from './Recipe'
import * as store from 'store2'

const sortByDateNewestFirstRecipe: RecipeType = {
  // (SaleType[] => SaleType[])
  source: "(sales) => R.reverse(R.sortBy((sale) => sale.OrderDate.getTime(), sales))",
  name: "Sort by date (newest first)",
  author: "Martin Josefsson",
  license: "GNU GPL v3"}

const sortByDateOldestFirstRecipe: RecipeType = {
  // (SaleType[] => SaleType[])
  source: "(sales) => R.sortBy((sale) => sale.OrderDate.getTime(), sales)",
  name: "Sort by date (oldest first)",
  author: "Martin Josefsson",
  license: "GNU GPL v3"}

const bensJeansUKRecipe: RecipeType = {
  source: `(sales) => Enumerable.from(sales)
                      .Where(s => s.DeliveryCountry === 'UK')
                      .Where(s => s.Manufacturer === "Ben's Jeans")
                      .ToArray()`,
  author: "Martin Josefsson",
  license: "GNU GPL",
  name: "Ben's Jeans sales to UK"}

type AppStateType = {
    sales: SaleType[],
    recipe: RecipeType,
    recipes: RecipeType[],
    isEditing: boolean}

export function addRecipe(newRecipe: RecipeType, state: AppStateType) {
  // Set the new recipe in the top of the list, and set it as current recipe
  return assoc('recipe',
               newRecipe,
               assoc('recipes', concat([newRecipe], state.recipes), state))}

export default class App extends Component {
  state: AppStateType // Type annotation of component

  constructor(props: any) {
    super(props)
    this.state = {
      sales: [],
      recipe: sortByDateNewestFirstRecipe,/*By default sort by date, newest first*/
      recipes: (store.get("recipes") || [bensJeansUKRecipe,
                                         sortByDateNewestFirstRecipe,
                                         sortByDateOldestFirstRecipe]),
      isEditing: false,
      error: false}
    window.state = {
      // Poor mans redux - simple version for this demonstration
      // eslint-disable-next-line
      setRecipe: this.setRecipe.bind(this),
      toggleEditor: this.toggleEditor.bind(this),
      saveRecipe: this.saveRecipe.bind(this),
      addRecipe: this.addRecipe.bind(this)}}

  addRecipe () {
    const oldState = this.state
    const newRecipe = {
      author: "",
      source: "(sales) => /* Add script here! */",
      name: "",
      license: "GNU GPL"}
    console.log(addRecipe(newRecipe, oldState))
    this.setState(addRecipe(newRecipe, oldState))}

  setRecipe (recipe: RecipeType) {this.setState(assoc('recipe', recipe, this.state))}

  toggleEditor () {
    const oldState = this.state;
    this.setState(assoc('isEditing',
                        (!oldState.isEditing),
                        oldState))}
  saveRecipe (oldRecipe: RecipeType, change: {name: string, value: string}) {
    // Overwrites the old recipe with the new one
    // A novel idea would be to keep commits
    // Since Recipes are immutable, we could save a long history of them.
    // With that you would also get "undo save", and be able to go back in history
    const newRecipe = assoc(change.name,
                            change.value,
                            oldRecipe)

    const oldState = this.state
    // Check for compilation errors, not persisting if they occur
    let error = true;
    try {
      // eslint-disable-next-line
      eval(newRecipe.source)
      error = false}
    catch (e) {
      error = e}

    const newRecipesState = assoc(
      'error',
      error,
      assoc('recipe',
            newRecipe,
            assoc('recipes',
                  saveRecipe(oldRecipe,
                             newRecipe,
                             oldState.recipes),
                  oldState)))

    if (!this.state.error) {store.set('recipes', newRecipesState.recipes)}
    return this.setState(newRecipesState)}

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
          <div className={this.state.error ? 'error App-header ' : 'App-header '}>
            <h2>Sales Explorer</h2>
            {this.state.isEditing ? <RecipeEditorView recipe={this.state.recipe} />
             : <RecipeDisplayView recipe={this.state.recipe} />}
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
    [newRecipe])}
