import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div className="about-page-container">
      {/* About Us Title */}
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={"About"} text2={"Us"} />
      </div>

      {/* About Us Content */}
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} alt="About Forever" className='w-full md:max-w-[450px] rounded-xl shadow-lg' />

        <div className='flex flex-col gap-6 md:w-2/4 text-gray-600 justify-center'>
          <p>
            At Forever, we believe in creating timeless products that blend style, quality, and sustainability. Our journey began with a simple mission: to provide customers with thoughtfully designed pieces that last—not just in quality, but also in meaning. Every product we create is a reflection of our commitment to excellence, detail, and authenticity.
          </p>

          <p>
            We are more than just a brand; we are a movement committed to redefining the way people shop. Our focus is on curating items that stand the test of time, not only in durability but in their ability to inspire. We aim to foster a lifestyle of intentional purchasing, where every item serves a purpose and becomes part of a personal legacy.
          </p>

          <b className='text-gray-800 text-lg'>Our Mission</b>
          <p>
            Our mission at Forever is to empower individuals to embrace products that reflect their values and enhance their lives. We are committed to making sustainability a core part of everything we do, from sourcing materials to delivering our products. We believe in offering high-quality items that are designed to be cherished for a lifetime. Our vision is to help people build a collection of meaningful pieces that transcend trends and stand as symbols of individuality and longevity.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className='text-xl py-4 text-center'>
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className='flex-col flex md:flex-row gap-20 text-sm md:text-base'>
        <div className='flex flex-col border rounded-xl px-10 md:px-16 py-8 sm:py-10 gap-5 shadow-lg hover:shadow-2xl transition-all'>
            <b className='font-semibold text-gray-800'>Quality Assurance:</b>
            <p className='text-gray-600'>
              At Forever, we take pride in offering products of the highest quality, ensuring that every item is carefully selected and meticulously crafted to perfection. Our commitment to quality means you can trust that each purchase is an investment in long-lasting excellence.
            </p>
        </div>

        <div className='flex flex-col border rounded-xl px-10 md:px-16 py-8 sm:py-10 gap-5 shadow-lg hover:shadow-2xl transition-all'>
            <b className='font-semibold text-gray-800'>Convenience:</b>
            <p className='text-gray-600'>
              Shopping with Forever is a seamless experience. Our website is designed to be intuitive and easy to navigate, allowing you to find what you need in just a few clicks. Whether you’re searching for your next wardrobe staple or a special gift, we make it easy to shop with confidence.
            </p>
        </div>

        <div className='flex flex-col border rounded-xl px-10 md:px-16 py-8 sm:py-10 gap-5 shadow-lg hover:shadow-2xl transition-all'>
            <b className='font-semibold text-gray-800'>Customer Satisfaction:</b>
            <p className='text-gray-600'>
              We are committed to delivering exceptional customer service. Your satisfaction is our top priority, and we are always here to assist you with any questions or concerns. Our customer-first approach ensures that every interaction with us is positive and hassle-free.
            </p>
        </div>
      </div>

      {/* Newsletter Signup Section */}
      <div className='mt-20'>
        <NewsLetterBox />
      </div>
    </div>
  )
}

export default About
