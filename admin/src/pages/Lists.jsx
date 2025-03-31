import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'

const Lists = ({token}) => {

  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if(response.data.success){
        setList(response.data.products)
      }
      else{
        toast.error(response.data.message)
      }
    }
    catch (error) {
      console.log(error)
      toast.error('Error fetching products')
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', {id}, {headers: {Authorization: 'Bearer ' + token}})
      console.log(response.data)
      if(response.data.success){
        toast.success('Product removed successfully')
        await fetchList()
      }
      else{
        toast.error(response.data.message)
      }
    }
    catch (error) {
      console.log(error)
      toast.error('Error removing product')
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      <p className='text-2xl font-medium mb-4 text-gray-700'>All Products List</p>
      <div>

        {/* List Table Title  */}
        <div className='hidden md:grid md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center bg-gray-100 px-2 py-1 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* Product List */}
        {
          list.map((item, index) => (
            <div className='grid md:grid-cols-[1fr_3fr_1fr_1fr_1fr] grid-cols-[1fr_3fr_1fr] items-center gap-2 border px-2 py-1 text-sm' key={index}>
              <img className='w-12' src={item.image[0]}  />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p onClick={() => removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default Lists
