import React, { useState } from "react";
import {Map, Marker, Popup, TileLayer, Polygon } from "react-leaflet";
import { Icon } from "leaflet";
import { Button, Form } from "react-bootstrap";
import { Container, Row, Col } from 'reactstrap';
import "./map.css"
import { render } from "@testing-library/react";

export default class Mapping extends React.Component{


  constructor(props){
    super(props);
    this.state={
      bi: [39.8909236,32.7777734],
      rowsPerPage:10,
      zone:[],
      checkZone: true
    };
    this.handleZoneData = this.handleZoneData.bind(this);
  }

  //const [zone, setZone] = React.useState([]);
  
  //const [newZone, setNewZone] = React.useState([]);









  

  handleZoneData = (data) => {
    let zoneData = []
    let dgn = []
    for(var i in data){
      for(var j = 0 ; j< data[i].polygon.geometry.coordinates[0].length ; j++){
        dgn.push([data[i].polygon.geometry.coordinates[0][j][1],data[i].polygon.geometry.coordinates[0][j][0]])
      }
      zoneData.push(dgn)
      dgn = []
    }
    this.setState({zone: zoneData});
    this.setState({checkZone: false});
  };

  


  /*if (checkZone === true){

    fetch('http://35.234.156.204/zones')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
          this.handleZoneData(data);
            //console.log(data[0].coordinates.geometry)
    });
    this.setState({checkZone: false});
  }*/
  

  getData(){
    fetch('http://35.234.156.204/zones')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
          this.handleZoneData(data);
    });
  }

  componentWillMount(){
    this.getData();
  }



  
  
  
  
  render(){
    return (
      
      <div className="Login">
      
        
        <Map center={[39.8909236,32.7777734]} zoom={10}>
          
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          <Marker position={this.state.bi} ></Marker>
          <Polygon positions={[this.state.zone]} color='#0099CC' ></Polygon>
        
          <Polygon positions={[[39.8909236,32.7777734],[39.8909236,32.7777734],[39.8909236,32.7777734]]} color='#660033'></Polygon>
          
          
        </Map>
        
        <div className="Form">
          <form >
            <div >
              <div>Coordinates</div>
              <div className="Setting">
              <Form.Label className="FormLabels">x1 : </Form.Label>
              <Form.Control className="FormBoxes"
                
              />
              <Form.Label className="FormLabels">y1 : </Form.Label>
              <Form.Control className="FormBoxes"
                
              />
              <Button className ="SetMargin" type="submit">Set</Button>
              </div>
              <div className="Setting">
              <Form.Label className="FormLabels">x2 : </Form.Label>
              <Form.Control className="FormBoxes"
                
              />
                
              <Form.Label className="FormLabels">y2 : </Form.Label>
              <Form.Control className="FormBoxes"
              
              />
              </div>
              <div className="Setting"> 
              <Form.Label className="FormLabels">x3 : </Form.Label>
              <Form.Control className="FormBoxes"
              
              />
              <Form.Label className="FormLabels">y3 : </Form.Label>
              <Form.Control className="FormBoxes"
              
              />
              </div>
              <div className="Setting">
              <Form.Label className="FormLabels">x4 : </Form.Label>
              <Form.Control className="FormBoxes"
              
              />
              <Form.Label className="FormLabels">y4 : </Form.Label>
              <Form.Control className="FormBoxes"
              
              />
              </div>
              <Button className ="SetMargin" type="button">Set</Button>
            </div>
              
              
          
          </form>
        </div>

        
        
    </div>
    

    );
  }
}


//<Button className ="SetMargin" type="submit">Set</Button>

//onChange={e => ben[0][0]=Number(e.target.value)}