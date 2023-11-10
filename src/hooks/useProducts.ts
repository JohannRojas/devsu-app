import axios from 'axios'
import { useEffect, useState } from 'react'
import { USER_ID } from '../constants'
import { ProductType } from '../types/types'

const URL = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros'

export const useProducts = () => {

  const headers = {
    authorId: USER_ID,
  }

  const [products, setProducts] = useState<ProductType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

  const [statusSave, setStatusSave] = useState<number>(0)
  const [statusDelete, setstatusDelete] = useState<number>(0)

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await axios.get(`${URL}/bp/products`, { headers })
        setProducts(response.data)
      } catch (error) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    obtenerProductos()
  }, [products])

  const saveProduct = async (product: ProductType) => {
    try {
      const response = await axios.post(`${URL}/bp/products`, product, { headers })
      setProducts([...products, response.data])
      setStatusSave(response.status)
    } catch (error) {
      setError(true)
    }
  }

  const deleteProduct = async (id: string) => {
    try {
      const response = await axios.delete(`${URL}/bp/products`, { headers, params: { id } })
      setProducts(products.filter(product => product.id !== response.data.id))
      setstatusDelete(response.status)
    } catch (error) {
      setError(true)
    }
  }

  const editProduct = async (product: ProductType) => {
    try {
      const response = await axios.put(`${URL}/bp/products`, product, { headers })
      setProducts(products.map(product => product.id === response.data.id ? response.data : product))
      setStatusSave(response.status)
    } catch (error) {
      setError(true)
    }
  }

  return {
    //properties
    products,
    loading,
    error,
    statusSave,
    statusDelete,

    //methods
    saveProduct,
    deleteProduct,
    editProduct,
    setStatusSave,

  }
}
