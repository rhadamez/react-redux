import { useEffect, useState } from "react"
import { IProduct } from "../store/modules/cart/types"
import { api } from "../services/api"
import { CatalogItem } from "./CatalogItem"

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
        <CatalogItem product={item} />
      ))}
    </div>
  )
}