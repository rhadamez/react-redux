import { useDispatch } from "react-redux"
import { addProductToCart } from "../store/modules/cart/actions"
import { IProduct } from "../store/modules/cart/types"

interface Props {
  product: IProduct
}

export function CatalogItem({ product }: Props) {
  const dispatch = useDispatch()

  const handleAddProductToCart = (product: IProduct) => {
    dispatch(addProductToCart(product))
  }
  return (
    <article onClick={() => handleAddProductToCart(product)} key={product.id}>
      <strong>{product.title}</strong> {" - "}
      <strong>{product.price}</strong> {" - "}
      <button>Comprar</button>
    </article>
  )
}