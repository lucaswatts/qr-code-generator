import React, { useState, useEffect } from 'react';
import Wifi from './components/Wifi';
import './App.css';

//WIFI:T:WPA;S:BMG;P:********;H:; example of our home wifi decoded. Need to add the information in as it is here 

function App() {
  const [temp, setTemp] = useState("");
  const [networkname, setNetworkname] = useState("");
  const [password, setPassword] = useState("");
  const [size, setSize] = useState(200);
  const [bgColor, setBgColor] = useState("ffffff");
  const [qrCode, setQrCode] = useState("");
  // Changing the URL only when the user
  // changes the input
  useEffect(() => {
    setQrCode
 (`http://api.qrserver.com/v1/create-qr-code/?data=${`WIFI:T:WPA;S:${networkname};P:${password};H:;`}!&size=${size}x${size}&bgcolor=${bgColor}`);
  }, [networkname, size, bgColor]);
  
  // Updating the input network name when user
  // click on the generate button
  function handleClick() {
    setNetworkname(temp);
  }
  
  return (
    <div className="App">
      <h1 className="h1">Wifi QR Code Generator</h1>
      <div className="input-box">
        <Wifi></Wifi>
        <div className="gen">
          <input type="text" onChange={
            (e) => {setTemp(e.target.value)}}
            placeholder="Enter text to encode" />
            <input type="text" onChange={
            (e) => {setPassword(e.target.value)}}
            placeholder="Enter your wifi password" />
          <button className="button" 
            onClick={handleClick}>
            Generate
          </button>
        </div>
        <div className="extra">
          <h5>Background Color:</h5>
          <input type="color" onChange={(e) => 
          { setBgColor(e.target.value.substring(1)) }} />
          <h5>Dimension:</h5>
          <input type="range" min="200" max="600"
           value={size} onChange={(e) => 
           {setSize(e.target.value)}} />
        </div>
      </div>
      <div className="output-box">
        <img src={qrCode} alt="" />
        <a href={qrCode} download="QRCode">
          <button type="button">Download</button>
        </a>
      </div>
    </div>
  );
}

export default App;
