// @flow
/*
 * Recipe.js
 * By Martin Josefsson <hello@martinjosefsson.com>
 *
 * This is an app to gather understanding from a collection of Sales.
 * Recipes are JS programs to present the data in different way.
 */

import type {SaleType} from './Sale'

export type RecipeType = {
  fn: (salesList: SaleType[]) => SaleType[],
  name: string,
  author: string,
  license: string
}

export function applyRecipe(recipe: RecipeType, salesList: SaleType[]): SaleType[] {
  return salesList
}
