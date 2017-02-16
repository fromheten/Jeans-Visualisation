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
import './Recipe.css'

export type RecipeType = {
  // fn: (salesList: SaleType[]) => SaleType[],
  source: string,
  name: string,
  author: string,
  license: string
}

export function applyRecipe(recipe: RecipeType, salesList: SaleType[]): SaleType[] {
  // eslint-disable-next-line
  const R = require('ramda')
  // eslint-disable-next-line
  return eval(recipe.source)(salesList)
}

const RecipeMenuItemView = (recipe, index) => (
  <li key={index}>
    <button onClick={(e) => window.state.setRecipe(recipe)} >
      {recipe.name} ({recipe.author})
    </button>
  </li>
)

export function RecipeMenuView(props: {recipes: RecipeType[]}) {
  return (
    <ul>
      {props.recipes.map(RecipeMenuItemView)}
    </ul>
  )
}

export function RecipeEditor (props: {
  isEditing: boolean,
  recipe: RecipeType
}) {
  return (
    <div>
      Currently set to <em>{props.recipe.name}</em>
      <button onClick={(e) => window.state.toggleEditor()}>
        edit
      </button>
      {props.isEditing ? (
         <div>
           <textarea className="code-editor"
                     value={props.recipe.source}
                     autoComplete={true}
                     autoFocus={true}
                     cols={80}
                     rows={10} />
         </div>): ''}
    </div>
  )
}
