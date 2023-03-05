import { useEffect, useState } from "react"
import { api } from "../services/api"
import { IProduct } from "../store/modules/cart/types"

export function Catalog() {
  const [catalog, setCatalog] = useState<IProduct[]>([])

  useEffect(() => {
    async function loadCatalog() {
      await api.get('products').then(res => setCatalog(res.data))
    }

    loadCatalog()
  }, [])

  return (
    <div>
      <h1>catalog</h1>
      {catalog.map(item => (
        <article key={item.id}>
          <strong>{item.title}</strong> {" - "}
          <strong>{item.price}</strong> {" - "}
          <button>Comprar</button>
        </article>
      ))}
    </div>
  )
}