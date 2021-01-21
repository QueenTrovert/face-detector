import React from 'react';
import './FaceDetector.css'

const FaceDetector = ({imgUrl, box}) =>{
    return(
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputImage' alt='logo' src = {imgUrl} width = '500px' height='auto'/>
                <div className='boundingBox' style = {{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>
            
        </div>
    )
}
export default FaceDetector;