// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import App, {saveRecipe, addRecipe} from './App';
import type {RecipeType} from './Recipe'
import {assoc} from 'ramda'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

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

it('updates the state with a new recipe, replacing the old', () => {
  expect(saveRecipe(
    sortByDateNewestFirstRecipe,
    assoc('author', 'Karl XVI Gustaf', sortByDateNewestFirstRecipe),
    [sortByDateOldestFirstRecipe,
     sortByDateNewestFirstRecipe]))
    .toEqual(
      [sortByDateOldestFirstRecipe,
       assoc('author', 'Karl XVI Gustaf', sortByDateNewestFirstRecipe)])})

const blankRecipe = {author: "",
                     source: "(sales) => /* Add script here! */",
                     name: "",
                     license: "GNU GPL"}
it('can add a new recipe to the app state', () =>
  expect(addRecipe(blankRecipe,
                   {recipes: [sortByDateOldestFirstRecipe,
                              sortByDateNewestFirstRecipe],
                    sales: [],
                    recipe: sortByDateNewestFirstRecipe,
                    isEditing: false}))
    .toEqual({recipes: [blankRecipe,
                        sortByDateOldestFirstRecipe,
                        sortByDateNewestFirstRecipe],
              sales: [],
              recipe: blankRecipe,
              isEditing: false}))
