import React from "react";
import './FaceRecognition.css';

const FaceRecognition = ({ boxes, imageUrl }) => {
    const boundingBoxes = boxes.map(({topRow, rightCol , bottomRow, leftCol}) => (
        <div className="bounding-box" style={{ top: topRow, right: rightCol, bottom: bottomRow, left: leftCol }}></div>
    ));
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img id="outputImage" width='500px' height='auto' alt="" src={imageUrl} />
                {boundingBoxes}
            </div>
        </div>
    );
}

export default FaceRecognition;