import './App.css';
import { Component } from 'react';
import ParticlesBg from 'particles-bg';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/SignIn/Signin';

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      boxes: []
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFaces = data.outputs[0].data.regions;
    // const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('outputImage');
    const imageWidth = Number(image.width);
    const imageHeight = Number(image.height);
    const facesProperties = [];
    clarifaiFaces.forEach((face)=>{
      facesProperties.push({
        leftCol: face.region_info.bounding_box.left_col * imageWidth,
        topRow: face.region_info.bounding_box.top_row * imageHeight,
        rightCol: imageWidth - (face.region_info.bounding_box.right_col * imageWidth),
        bottomRow: imageHeight - (face.region_info.bounding_box.bottom_row * imageHeight)
      })
    })
    return facesProperties;
  }

  displayFaceBoxes = (boxes) => {
    this.setState({boxes:boxes});
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    const MODEL_ID = 'face-detection';
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", this.getClarifaiRequestOptions(this.state.input))
      .then(response => response.json())
      .then(result => this.displayFaceBoxes(this.calculateFaceLocation(result)))
      .catch(error => console.log('error', error));
  }

  getClarifaiRequestOptions = (imageUrl) => {
    const PAT = 'f26c0352f9aa4111bcada6c9804cc9f1';
    const USER_ID = 'lru8s1dml630';
    const APP_ID = 'facedetection-app';
    const IMAGE_URL = imageUrl;

    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": IMAGE_URL
            }
          }
        }
      ]
    });

    return {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
      },
      body: raw
    };
  }

  render() {
    return (
      <div className='App'>
        <div>
          <Navigation />
          {/* <Signin /> */}
          <Logo />
          <Rank />
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
          <FaceRecognition boxes={this.state.boxes} imageUrl={this.state.imageUrl} />
        </div>
        <ParticlesBg
          color='#02616e'
          num={200} type="cobweb"
          bg={{
            position: "absolute",
            zIndex: -1,
            top: 0,
            left: 0
          }} />
      </div>
    )
  }
}

export default App;
