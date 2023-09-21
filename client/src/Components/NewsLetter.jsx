import React from 'react'

function NewsLetter() {
  return (
    <div>
        <div className='news'>
            <div className='news-text'>
                <h4 id='news-h4'>Sign Up For NewsLetters</h4>
                <br></br>
                <p id='news-p'>Get E-mail updates about our latest collections and <span>special offers.</span></p>
            </div>
            <div className='news-form'>
                <input type='text'placeholder='Your email address'/>
                <button id='news-button'>Sign Up</button>
            </div>
        </div>
    </div>
  )
}

export default NewsLetter