import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { backendUrl } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({ token }) => {
    const [image1, setImage1] = useState(false)
    const [image2, setImage2] = useState(false)
    const [image3, setImage3] = useState(false)
    const [image4, setImage4] = useState(false)

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('Men')
    const [subCategory, setSubCategory] = useState('Topwear')
    const [price, setPrice] = useState('')
    const [bestSeller, setBestSeller] = useState(false)
    const [sizes, setSizes] = useState([])

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()

            formData.append('name', name)
            formData.append('description', description)
            formData.append('category', category)
            formData.append('subCategory', subCategory)
            formData.append('price', price)
            formData.append('bestseller', bestSeller)
            formData.append('sizes', JSON.stringify(sizes))

            image1 && formData.append('image1', image1)
            image2 && formData.append('image2', image2)
            image3 && formData.append('image3', image3)
            image4 && formData.append('image4', image4)

            const response = await axios.post(backendUrl + '/api/product/add', formData, {
                headers: {Authorization: 'Bearer ' + token}
            })
            if (response.data.success) {
                toast.success('Product added successfully')
                setName('')
                setDescription('')
                setCategory('Men')
                setSubCategory('Topwear')
                setPrice('')
                setBestSeller(false)
                setSizes([])
                setImage1(false)
                setImage2(false)
                setImage3(false)
                setImage4(false)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Error adding product')
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
            <div>
                <p className='mb-2'>Upload Image</p>
                <div className='flex gap-4'>
                    <label htmlFor="image1">
                        <img 
                            onClick={() => document.getElementById('image1').click()}
                            className='w-20 cursor-pointer' 
                            src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} 
                            alt="Image 1" 
                        />
                        <input 
                            type="file" 
                            id="image1" 
                            hidden 
                            onChange={(e) => setImage1(e.target.files[0])} 
                        />
                    </label>
                    <label htmlFor="image2">
                        <img 
                            onClick={() => document.getElementById('image2').click()}
                            className='w-20 cursor-pointer' 
                            src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} 
                            alt="Image 2" 
                        />
                        <input 
                            type="file" 
                            id="image2" 
                            hidden 
                            onChange={(e) => setImage2(e.target.files[0])} 
                        />
                    </label>
                    <label htmlFor="image3">
                        <img 
                            onClick={() => document.getElementById('image3').click()}
                            className='w-20 cursor-pointer' 
                            src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} 
                            alt="Image 3" 
                        />
                        <input 
                            type="file" 
                            id="image3" 
                            hidden 
                            onChange={(e) => setImage3(e.target.files[0])} 
                        />
                    </label>
                    <label htmlFor="image4">
                        <img 
                            onClick={() => document.getElementById('image4').click()}
                            className='w-20 cursor-pointer' 
                            src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
                            alt="Image 4" 
                        />
                        <input 
                            type="file" 
                            id="image4" 
                            hidden 
                            onChange={(e) => setImage4(e.target.files[0])} 
                        />
                    </label>
                </div>
            </div>

            <div className='w-full'>
                <p className='mb-2'>Product Name</p>
                <input 
                    onChange={(e) => setName(e.target.value)} 
                    value={name} 
                    type="text" 
                    placeholder='Enter Product Name' 
                    className='w-full max-w-[500px] border px-3 py-2' 
                    required 
                />
            </div>
            <div className='w-full'>
                <p className='mb-2'>Product Description</p>
                <textarea 
                    onChange={(e) => setDescription(e.target.value)} 
                    value={description} 
                    placeholder='Enter Product Description' 
                    className='w-full max-w-[500px] border px-3 py-2' 
                    required 
                />
            </div>

            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
                <div>
                    <p className='mb-2'>Product Category</p>
                    <select onChange={(e) => setCategory(e.target.value)} value={category} className='w-full px-3 py-2'>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                    </select>
                </div>
                <div>
                    <p className='mb-2'>Product Sub-Category</p>
                    <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className='w-full px-3 py-2'>
                        <option value="Topwear">Topwear</option>
                        <option value="Bottomwear">Bottomwear</option>
                        <option value="Winterwear">Winterwear</option>
                    </select>
                </div>

                <div>
                    <p className='mb-2'>Product Price</p>
                    <input 
                        onChange={(e) => setPrice(e.target.value)} 
                        value={price} 
                        type="Number" 
                        className='w-full sm:w-[120px] px-3 py-2' 
                        placeholder='Price' 
                        required 
                    />
                </div>
            </div>

            <div>
                <p className='mb-2'>Product Sizes</p>
                <div className='flex gap-3'>
                    {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                        <div 
                            key={size}
                            onClick={() => setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size])}
                        >
                            <p className={`${sizes.includes(size) ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>{size}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className='flex gap-2 mt-2'>
                <input 
                    onChange={() => setBestSeller(prev => !prev)} 
                    checked={bestSeller} 
                    type="checkbox" 
                    id='bestseller' 
                />
                <label className='cursor-pointer' htmlFor="bestseller">Add to Best Seller</label>
            </div>

            <button className='bg-black text-white px-4 py-2 rounded-md mt-4' type='submit'>Add Product</button>
        </form>
    )
}

export default Add
