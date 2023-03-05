import { Reducer } from "redux"
import produce from 'immer'
import { ICartState } from "./types"

const INITIAL_STATE: ICartState = {
  items: []
}

const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch(action.type) {
      case 'ADD_PRODUCT_TO_CART': {
        const { product } = action.payload

        const isAdded = draft.items.findIndex(p => p.product.id === product.id)

        if(isAdded !== -1) draft.items[isAdded].amount++
        else draft.items.push({ product, amount: 1 })

        break
      }

      default: {
        return draft
      }
    }
  })
}

export default cart