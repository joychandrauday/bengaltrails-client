import React from 'react';
import Header from '../../Components/Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';

const Root = () => {
    return (
        <div>
            <div className="lg:absolute w-full z-[99999] ">
                <Header></Header>
            </div>
            <Outlet></Outlet>
            <div className="">
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Root;