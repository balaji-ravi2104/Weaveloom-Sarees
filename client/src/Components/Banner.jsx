import React from 'react'
import { useNavigate } from "react-router-dom";

function Banner() {
    const nagivate = useNavigate();
  return (
    <div>
        <div className='banner' id='section-p1'>
            <h4 id="banner-h4">Repair Services</h4>
            <h2 id='banner-h2'>Up to <span>70% Off</span>- All Type Of Sarees</h2>
            <button id="banner-button" onClick={()=>{nagivate("/shop")}}>Explore More</button>
        </div>
    </div>
  )
}

export default Banner