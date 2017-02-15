// @flow
import React from 'react';
// Contains functions and types regarding sales

type Gender = "Male"
            | "Female"
            | "Unisex" // Controversial topic 2017

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
    Size: 34,
    Colour: "blue",
    Style: "Fit",
    Count: 5
  }
}

export function SaleRow (sale: SaleType) {
  return (
    <tr key={Math.random()}>
    <td>{sale.OrderDate.toString()}</td>
    <td>{sale.DeliveryCountry.toString()}</td>
    <td>{sale.Manufacturer.toString()}</td>
    <td>{sale.Gender.toString()}</td>
    <td>{sale.Size.toString()}</td>
    <td>{sale.Colour.toString()}</td>
    <td>{sale.Style.toString()}</td>
    <td>{sale.Count.toString()}</td>
    </tr>)
}
