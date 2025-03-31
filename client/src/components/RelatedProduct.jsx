import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProduct = ({category, subCategory}) => {
  
    const {products} = useContext(ShopContext)
    const [related, setRelated] = useState([]);

    useEffect(() => {
        
        if(products.length > 0){
            let productsCopy = products.slice();

            productsCopy = productsCopy.filter((item) => item.category === category && item.subCategory === subCategory);
            
            setRelated(productsCopy.slice(0, 5));
        }
    
    }, [products])
  
    return (
    <div className='my-24'>
        <div className='text-center text-3xl py-3'>
            <Title text1={"RELATED"} text2={"PRODUCTS"} />
        </div>
      
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:grid-cols-3'>
            {related.map((item, index) => (
                <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
            ))}
        </div>
    </div>
  )
}

export default RelatedProduct
