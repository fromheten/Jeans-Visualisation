// @flow
import {applyRecipe} from './Recipe'
import type {RecipeType} from './Recipe'
import * as Sale from './Sale'
import type {SaleType} from './Sale'
import {map, range, take} from 'ramda'
import mockSales from './mockSales'

const sortByDateRecipe: RecipeType = {
  source: "(sales) => R.reverse(R.sortBy((sale) => sale.OrderDate.getTime(), sales))",
  name: "Recipe made for test purposes",
  author: "Martin Josefsson",
  license: "GNU GPL v3"}

it('applies a "sort by date" recipe successfully', () =>
  expect(
    applyRecipe(
      sortByDateRecipe,
      take(3, mockSales)))
    .toEqual([{OrderDate: (new Date("2016-05-31T03:55:06.519Z")),
               DeliveryCountry: 'Sweden',
               Manufacturer: 'Jeans Company',
               Gender: 'Unisex',
               Size: 34,
               Colour: 'blue',
               Style: 'Fit',
               Count: 5},
              {OrderDate: (new Date("2016-03-09T15:53:22.507Z")),
               DeliveryCountry: 'UK',
               Manufacturer: 'Ben\'s Jeans',
               Gender: 'Male',
               Size: 34,
               Colour: 'blue',
               Style: 'Fit',
               Count: 5},
              {OrderDate: (new Date("2013-08-12T13:40:01.695Z")),
               DeliveryCountry: 'UK',
               Manufacturer: 'Levis',
               Gender: 'Female',
               Size: 34,
               Colour: 'blue',
               Style: 'Fit',
               Count: 5}]))
