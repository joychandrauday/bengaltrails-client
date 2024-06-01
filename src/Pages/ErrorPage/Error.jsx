import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div style={{
            backgroundImage:"url('https://i.ibb.co/qBFwhK0/eugenio-mazzone-6ywyo2qta-Z8-unsplash.jpg')",
            backgroundPosition:'center center',
            backgroundSize:'cover'
        }} className='min-h-screen flex items-center justify-center '>
            <Helmet>
                <title>Error | page not found.</title>
            </Helmet>
            <div className="wrapper backdrop-blur-lg p-24 rounded-lg">
                <img src="https://i.ibb.co/McLzr4x/2.gif" alt="" className='w-44 mx-auto rounded '/>
                <h1 className="capitalize font-bold text-4xl text-white py-3">Error 404 | page not found.</h1>
                <Link to={"/"} className="btn bg-basic capitalize font-bold rounded-none w-full">back to home</Link>
            </div>
        </div>
    );
};

export default Error;