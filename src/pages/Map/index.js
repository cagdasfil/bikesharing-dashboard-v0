import React, { useState } from "react";
import {Map, Marker, Popup, TileLayer, Polygon } from "react-leaflet";
import { Icon } from "leaflet";
import { Button, Form } from "react-bootstrap";
import { Container, Row, Col } from 'reactstrap';
import "./map.css"
import { render } from "@testing-library/react";

function Mapping() {

  const [zone, setZone] = React.useState([]);

  let ben = [[]]

  let polygon = [[
    [39.890905, 32.785445],
    [39.891275, 32.786311],
    [39.892258, 32.785482],
    [39.891842, 32.784751]
    ],[
      [39.891710, 32.783775],
      [39.891678, 32.783152],
      [39.891975, 32.783118]
      ]];

    let bi = [39.8909236,32.7777734];
  

  const handleZoneData = (data) => {
    let zoneData = []
    let dgn = []
    for(var i in data){
      for(var j = 0 ; j< data[i].coordinates.geometry.coordinates[0].length ; j++){
        dgn.push([data[i].coordinates.geometry.coordinates[0][j][1],data[i].coordinates.geometry.coordinates[0][j][0]])
      }
      zoneData.push(dgn)
      dgn = []
    }
    setZone(zoneData);
  };

  fetch('http://35.234.156.204/dockers')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
          handleZoneData(data);
            //console.log(data[0].coordinates.geometry)
    });
  

  return (
    
    <div className="Login">
    
      
      <Map center={[39.8909236,32.7777734]} zoom={10}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <Marker position={bi} ></Marker>
        <Polygon positions={[zone]} color='#000099' ></Polygon>
        
        
      </Map>
      
      <div className="Form">
        <form >
          <div >
            <div>Coordinates</div>
            <div className="Setting">
            <Form.Label className="FormLabels">x1 : </Form.Label>
            <Form.Control className="FormBoxes"/>
            <Form.Label className="FormLabels">y1 : </Form.Label>
            <Form.Control className="FormBoxes"/>
            </div>
            <div className="Setting">
            <Form.Label className="FormLabels">x2 : </Form.Label>
            <Form.Control className="FormBoxes"/>
            <Form.Label className="FormLabels">y2 : </Form.Label>
            <Form.Control className="FormBoxes"/>
            </div>
            <div className="Setting"> 
            <Form.Label className="FormLabels">x3 : </Form.Label>
            <Form.Control className="FormBoxes"/>
            <Form.Label className="FormLabels">y3 : </Form.Label>
            <Form.Control className="FormBoxes"/>
            </div>
            <div className="Setting">
            <Form.Label className="FormLabels">x4 : </Form.Label>
            <Form.Control className="FormBoxes"/>
            <Form.Label className="FormLabels">y4 : </Form.Label>
            <Form.Control className="FormBoxes"/>
            </div>
            <Button className ="SetMargin" type="submit">Set</Button>
          </div>
            
            
        
        </form>
      </div>
      
  </div>
  

  );
}

export default Mapping;

//<Button className ="SetMargin" type="submit">Set</Button>