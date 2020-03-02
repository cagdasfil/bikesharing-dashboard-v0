import React from "react";
import {Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import "./map.css"

function Mapping() {



    
    

  return (
  

    
    <Map center={[39.8909236,32.7777734]} zoom={10}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </Map>

  );
}

export default Mapping;