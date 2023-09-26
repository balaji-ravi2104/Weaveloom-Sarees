import React from 'react';
import Navbar from '../Components/Navbar';
import { useSelector } from 'react-redux';


function Welcome(){
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    console.log(isLoggedIn);

    return(
        <div>
            <Navbar />
        </div>
    )
}

export default Welcome;