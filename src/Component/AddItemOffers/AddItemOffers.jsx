import React from 'react'
import { AddItemComponent } from '../AddItemComponent/AddItemComponent'

export const AddItemOffers = () => {
  return (
    <>
    <AddItemComponent tabelName={"items_menu"} titlePage={"Add Item Offers"} to={"/dashbord/itemOffers"} />
    </>
  )
}
