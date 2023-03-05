import { useDispatch, useSelector } from "react-redux"
import { IState } from "../store"
import { addProductToCartRequest } from "../store/modules/cart/actions"
import { ICartItem, IProduct } from "../store/modules/cart/types"

interface Props {
  product: IProduct
}

export function CatalogItem({ product }: Props) {
  const dispatch = useDispatch()

  const hasFailedStockCheck = useSelector<IState, boolean>(state => {
    return state.cart.failedStockCheck.includes(product.id)
  })

  const handleAddProductToCart = (product: IProduct) => {
    dispatch(addProductToCartRequest(product))
  }
  return (
    <article onClick={() => handleAddProductToCart(product)} key={product.id}>
      <strong>{product.title}</strong> {" - "}
      <strong>{product.price}</strong> {" - "}
      <button>Comprar</button>

      { hasFailedStockCheck && <span style={{ color: 'red'}}>Falta de estoque</span>}
    </article>
  )
}