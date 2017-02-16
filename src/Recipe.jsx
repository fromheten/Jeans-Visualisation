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
import CodeMirror from 'react-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'

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

export function RecipeEditorView (props: {recipe: RecipeType}) {
  return (
    <form onChange={(e) => window.state.saveRecipe(props.recipe, {
        name: e.target.name,
        value: e.target.value
      })} >
      Currently editing <input type="text"
                               name="name"
                               value={props.recipe.name} />
      <button onClick={window.state.toggleEditor}>
        Done
      </button>
      <button onClick={alert}>
        Clone recipe
      </button>
      <div>
        <div>
          By <input type="text"
                    name="author"
                    value={props.recipe.author} />
        </div>
        <CodeMirror value={props.recipe.source}
                    onChange={(newSource) => window.state.saveRecipe(props.recipe, {
                        name: 'source',
                        value: newSource
                      })}
                    options={{
                      lineNumbers: true,
                      mode: 'javascript'
                    }} />
        <div>
          <input type="text"
                 name="license"
                 value={props.recipe.license} />
        </div>
      </div>
    </form>
  )
}

export function RecipeDisplayView (props: {recipe: RecipeType}) {
  return (
    <div>
      Currently set to <em>{props.recipe.name}</em>
      <button onClick={(e) => window.state.toggleEditor()}>
        Edit
      </button>
    </div>
  )
}
