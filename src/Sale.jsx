// @flow
import React from 'react';
import {applyRecipe} from './Recipe'
import type {RecipeType} from './Recipe'
import {range} from 'ramda'

type Gender = "Male"
            | "Female"
            | "Unisex" // Controversial topic 2017 ;-)

type Style = "Relaxed"
           | "Skinny"
           | "Boot Cut"
           | "Cut"
           | "Flare Leg"
           | "Straight Leg"
           | "Fit"
           | "Slim Fit"

export type SaleType = {
  OrderDate: Date,
  DeliveryCountry: string,
  Manufacturer: string,
  Gender: Gender,
  Size: number,
  Colour: string,
  Style: Style,
  Count: number
}

/* Helper functions to simulate a server by creating random SaleTypes */
function randomFrom (arr: any[]) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function createRandomSale (): SaleType {
  const start = new Date(2012, 0, 1)
  return {
    OrderDate: (new Date(start.getTime() + Math.random() * ((new Date().getTime()) - new Date(2012, 0, 1).getTime()))),
    DeliveryCountry: randomFrom(["Sweden", "UK", "Germany", "France", "Japan", "China", "Austria"]),
    Manufacturer: randomFrom(["Levis", "Ben's Jeans", "ACNE", "Jeans Company"]),
    Gender: randomFrom(["Male", "Female", "Unisex"]),
    Size: randomFrom(range(10,45)),
    Colour: "blue",
    Style: randomFrom(["Relaxed", "Skinny", "Boot Cut", "Cut", "Flare Leg", "Straight Leg", "Fit", "Slim Fit"]),
    Count: randomFrom(range(1, 1000))
  }
}

export function SaleRow (sale: SaleType, index: number) {
  return (
    <tr key={index}>
      <td>{index}</td>
      <td>{sale.OrderDate.toString()}</td>
      <td>{sale.DeliveryCountry.toString()}</td>
      <td>{sale.Manufacturer.toString()}</td>
      <td>{sale.Gender.toString()}</td>
      <td>{sale.Size.toString()}</td>
      <td>{sale.Colour.toString()}</td>
      <td>{sale.Style.toString()}</td>
      <td>{sale.Count.toString()}</td>
    </tr>
  )
}

export function SalesVisualiserView (props: {sales: SaleType[],
                                             recipe: RecipeType}) {
  return (
    <table>
      <tbody>
        <tr>
          <th>#</th>
          <th>OrderDate</th>
          <th>DeliveryCountry</th>
          <th>Manufacturer</th>
          <th>Gender</th>
          <th>Size</th>
          <th>Colour</th>
          <th>Style</th>
          <th>Count</th>
        </tr>
        {applyRecipe(props.recipe, props.sales).map(SaleRow)}
      </tbody>
    </table>
  )
}
