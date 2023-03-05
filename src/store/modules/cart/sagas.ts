import { AxiosResponse } from 'axios'
import { all, select, takeLatest, call, put } from 'redux-saga/effects'
import { IState } from '../..'
import { api } from '../../../services/api'
import { addProductToCartRequest, addProductToCartSuccess, addProductToCartFailure} from './actions'
import { ActionTypes } from './types'

type checkProductStockRequest = ReturnType<typeof addProductToCartRequest>

interface IStockResponse {
  id: number
  amount: number
}

function* checkProductStock({ payload }: checkProductStockRequest) {
  const { product } = payload

  const currentAmount: number = yield select((state: IState) => {
    return state.cart.items.find(item => item.product.id === product.id)?.amount ?? 0
  })

  const availableStockResponse: AxiosResponse<IStockResponse> = yield call(api.get, `stock/${product.id}`)

  if(availableStockResponse.data.amount > currentAmount) {
    yield put(addProductToCartSuccess(product))
  } else {
    yield put(addProductToCartFailure(product.id))
  }
}

export default all([
  takeLatest(ActionTypes.addProductToCartRequest, checkProductStock)
])