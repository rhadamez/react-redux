import { Reducer } from "redux"
import { ICartState } from "./types"

const INITIAL_STATE: ICartState = {
  items: []
}

const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case 'ADD_PRODUCT_TO_CART': {
      const { product } = action.payload

      const isAdded = state.items.findIndex(p => p.product.id === product.id)
      const newProductsArray = [...state.items]

      if(isAdded !== -1) {
        const currentProducot = state.items[isAdded]
        currentProducot.amount = currentProducot.amount + 1
        newProductsArray[isAdded] = currentProducot
      } else {
        newProductsArray.push({ product, amount: 1 })
      }

      return {...state, items: newProductsArray}
    }

    default: {
      return state
    }
  }
}

export default cart