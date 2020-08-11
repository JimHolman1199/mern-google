import React from 'react';

import googleLogo from '../../assets/google-logo.png';

import './GoogleButton.scss';

const GoogleButton = () => (
    <a className='google-btn' href='/auth/google' >
        <div className='google-icon-wrapper'>
            <img className='google-icon' src= {googleLogo} alt='Google logo'/>    
        </div>
        <p className ='google-btn-text'>
            Sign in with google
        </p>
    </a>
)

export default GoogleButton;
