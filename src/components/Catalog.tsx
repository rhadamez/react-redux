import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { addProductToCart } from '../store/modules/cart/actions'

import api from '../services/api'
import { IProduct } from '../store/modules/cart/types'

const Catalog: React.FC = () => {
    const dispatch = useDispatch()
    const [catalog, setCatalog] = useState<IProduct[]>([])

    useEffect(() => {
        api.get('products').then(response => {
            setCatalog(response.data)
        })
    }, [])

    const handleAddProductToCart = useCallback((product: IProduct) => {
        dispatch(addProductToCart(product))
    }, [dispatch])

    return (
        <>
            <h1>Catalog</h1>

            {catalog.map(product => (
                <article key={product.id}>
                    <strong>{product.title}</strong> {" - "}
                    <span>{product.price}</span> {" "}

                    <button onClick={() => handleAddProductToCart(product)}>Comprar</button>
                </article>
            ))}
        </>
    )
}

export default Catalog