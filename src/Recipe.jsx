// @flow
/*
 * Recipe.js
 * By Martin Josefsson <hello@martinjosefsson.com>
 *
 * This is an app to gather understanding from a collection of Sales.
 * Recipes are JS programs to present the data in different way.
 */

import React from 'react'
import type {SaleType} from './Sale'
import {map, addIndex} from 'ramda'

export type RecipeType = {
  fn: (salesList: SaleType[]) => SaleType[],
  name: string,
  author: string,
  license: string
}

export function applyRecipe(recipe: RecipeType, salesList: SaleType[]): SaleType[] {
  return recipe.fn(salesList)
}

const RecipeMenuItemView = (recipe, index) => (
  <li key={index}>
    <button onClick={(e) => window.setRecipe(recipe)} >
      {recipe.name} ({recipe.author})
    </button>
  </li>
)

const mapIndexed = addIndex(map) // Curry is yummy!
export function RecipeMenuView(props: {recipes: RecipeType[]}) {
  return (
    <ul>
      {mapIndexed(RecipeMenuItemView, props.recipes)}
    </ul>
  )
}
