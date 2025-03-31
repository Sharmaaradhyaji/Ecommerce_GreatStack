import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">

        <div>
            <img src={assets.logo} alt="" className='mb-5 w-32' />
            <p className='w-full md:w-2/3 text-gray-600'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus, beatae iste mollitia architecto nam quasi voluptatum minus dolore eos odit, magni possimus rem pariatur voluptas sit quod debitis magnam unde suscipit nesciunt culpa reprehenderit illum. Fugit, sunt accusantium. Et, earum.
            </p>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li className='mb-3'>Home</li>
                <li className='mb-3'>About</li>
                <li className='mb-3'>Delivery</li>
                <li className='mb-3'>Privacy Policy</li>
            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li className='mb-3'>+1 234 567 890</li>
                <li className='mb-3'>contact@foreverYou.com</li>
            </ul>
        </div>

      </div>

        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright &copy; 2025@ forever.com -  All rights reserved.</p>
        </div>

    </div>
  )
}

export default Footer
