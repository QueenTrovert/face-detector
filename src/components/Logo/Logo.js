import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import face from './face-recognition.png';

const Logo = () => {
    return(
        <div>
            <Tilt className="Tilt" options={{ max : 25 }} style={{ height: 250, width: 250 }} >
                <div className="Tilt-inner">
                    <img className='facelogo' src={face} alt='logo'/></div>
            </Tilt>
        </div>
    )
}
export default Logo;