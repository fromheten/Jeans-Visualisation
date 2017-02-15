// @flow
import {applyRecipe} from './Recipe'
import type {RecipeType} from './Recipe'
import * as Sale from './Sale'
import {map, range, sortBy, take} from 'ramda'
import mockSales from './mockSales'

const sortByDate = sortBy((sale) => sale.OrderDate.getTime())
const sortByDateRecipe: RecipeType = {
  fn: map(sortByDate), // SalesType[] => SalesType[]
  name: "Recipe made for test purposes",
  author: "Martin Josefsson",
  license: "GNU GPL v3" /* It's just for a test! */}

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