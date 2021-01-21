import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceDetector from './components/FaceDetector/FaceDetector';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

const app = new Clarifai.App({
    apiKey: '3913a22b3a43497c8a7dfd75001aa2da'
});

const particleOptions = {
    "particles": {
        "number": {
            "value": 50
        },
        "size": {
            "value": 3
        }
    },
    "interactivity": {
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse"
            }
        }
    }
}

class App extends Component{
    constructor(){
        super();
        this.state = {
            input: '',
            imgUrl: 'https://samples.clarifai.com/face-det.jpg',
            box: {},
            route: 'signIn',
            isSignedIn: true,
            user: {
                name: '',
                email: '',
                password: ''
            }
        }
    }
    loadUser = (data) =>{
        this.setState({user: {
            name: data.name,
            email: data.email,
            password: data.password
        }})
    }
    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    }

    displayFaceBox = (box) =>{
        this.setState({box: box});
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }
    
    

    onButtonSubmit = () => {
        this.setState({imgUrl: this.state.input})
        app.models.initModel({
            id: Clarifai.FACE_DETECT_MODEL,
        })
        .then((faceDetectModel) => faceDetectModel.predict(this.state.input))
        .then((response) => this.displayFaceBox(this.calculateFaceLocation(response)))
        .catch(err => console.log(err))
    }

    onRouteChange = (route) => {
        if(route === 'signout')
            this.setState({isSignedIn: false})
        else if(route === 'home')
            this.setState({isSignedIn: true})
        this.setState({route: route})
    }



    render() {
        const {isSignedIn, route, imgUrl, box} = this.state;
        
        return (
          <div className="App">
            <Particles className='particles' params={particleOptions} />
            <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
            {(() => {
                if(route === 'signIn'){
                    return <SignIn onRouteChange={this.onRouteChange}/> 
                }
                else if(route === 'home'){
                    return (
                        <div>
                        <Logo/>
                        <Rank/>
                        <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit} imgUrl={imgUrl} />
                        <FaceDetector imgUrl = {imgUrl} box={box}/>
                        </div>
                    )
                }
                else if(route === 'register'){
                    return <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
                }
            })()}   
            </div>
            )
        }
}



export default App;
