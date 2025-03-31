import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';

const Contact = () => {
  return (
    <div className="contact-page-container">

      {/* Title */}
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1="Contact" text2="Us" />
      </div>

      {/* Contact Information and Image Side-by-Side */}
      <div className="my-16 mx-4 md:mx-16 flex flex-col md:flex-row items-center justify-between gap-16">
        {/* Text Section */}
        <div className="flex-1 flex flex-col gap-6 text-gray-600 justify-center">
          <h2 className="text-xl font-semibold text-gray-800">
            We’d Love to Hear From You
          </h2>
          <p>
            At Forever, we are committed to providing exceptional service and building lasting relationships. Whether you have a question, feedback, or just want to connect, we're here to assist you. Feel free to reach out, and our team will get back to you as soon as possible.
          </p>
          <p>
            Our mission is to ensure that your experience with us is seamless and enjoyable. We are always looking for ways to improve, and we value your input in helping us grow and evolve.
          </p>
          
          {/* Contact Info Section */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-gray-800">Contact Information</h3>
            <p><b>Phone:</b> +1 (800) 123-4567</p>
            <p><b>Email:</b> contact@forever.com</p>
            <p><b>Address:</b> 123 Forever Blvd, Suite 100, New York, NY 10001, USA</p>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex-1">
          <img src={assets.contact_img} alt="Contact Us" className="w-full md:w-3/4 rounded-lg shadow-xl"/>
        </div>
      </div>

      {/* Explore Jobs Button */}
      <div className="mt-10 flex justify-center">
        <button 
          className="px-8 py-3 bg-white text-black font-semibold rounded-full shadow-lg border-2 border-black hover:bg-black hover:text-white transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-black focus:ring-opacity-50"
        >
          Explore Careers
        </button>
      </div>

      {/* Border between sections */}
      <div className="border-t my-10"></div>

      {/* Newsletter Box */}
      <NewsLetterBox />
    </div>
  );
};

export default Contact;
