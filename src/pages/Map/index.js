import React from "react";
import {Map, Marker, Popup, TileLayer, Polygon } from "react-leaflet";
import { Icon } from "leaflet";
import "./map.css"

function Mapping() {



    
    

  return (
  

    
    <Map center={[39.8909236,32.7777734]} zoom={10}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <Marker position={[39.8909236,32.7777734]} ></Marker>
      <Polygon positions={[
    [39.890905, 32.785445],
    [39.891275, 32.786311],
    [39.892258, 32.785482],
    [39.891842, 32.784751]
]} color='#000099' ></Polygon>
      
    </Map>

  );
}

export default Mapping;