import { useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { IProduct } from "../store/modules/cart/types"
import { api } from "../services/api"
import { addProductToCart } from "../store/modules/cart/actions"

export function Catalog() {
  const dispatch = useDispatch()
  const [catalog, setCatalog] = useState<IProduct[]>([])

  useEffect(() => {
    async function loadCatalog() {
      await api.get('products').then(res => setCatalog(res.data))
    }

    loadCatalog()
  }, [])

  const handleAddProductToCart = (product: IProduct) => {
    dispatch(addProductToCart(product))
  }

  return (
    <div>
      <h1>catalog</h1>
      {catalog.map(item => (
        <article onClick={() => handleAddProductToCart(item)} key={item.id}>
          <strong>{item.title}</strong> {" - "}
          <strong>{item.price}</strong> {" - "}
          <button>Comprar</button>
        </article>
      ))}
    </div>
  )
}