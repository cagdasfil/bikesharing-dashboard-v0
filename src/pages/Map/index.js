import React, { useState } from "react";

import { Icon } from "leaflet";
import { Button, Form } from "react-bootstrap";
import { Container, Row, Col } from 'reactstrap';
import {Map, Marker, Popup, TileLayer, Polygon } from "react-leaflet";
import Draw from 'leaflet-draw';
import "./map.css"
import { render } from "@testing-library/react";
import L from 'leaflet';


console.log("WINDOW", window)

const blueIcon = L.icon({ iconUrl: 'https://calendar.duke.edu/assets/v2016/icon-login.svg' });
const greenIcon = L.icon({ iconUrl: 'http://readyhedgeltd.com/wp-content/uploads/2016/09/home_icon-20.png' });
const redIcon = L.icon({ iconUrl: 'http://krimsonsalon.com/img/icon_address.png' });
const orangeIcon = L.icon({ iconUrl: 'https://ak1.ostkcdn.com//img/mxc/sn_review_star_full.svg' });

const events = [{
	title:'Sport Thing',
  description: 'the biggest sport thing ever',
  type: 'Sports',
  lat: 42.616841,
  lng: -70.671173,
  id: 'CAT',
},
{
	title:'Town Hall Meeting',
  description: 'Come one come all',
  type: 'Government',
  lat: 42.619281,
  lng: -70.669735,
  id: 'DOG',
}]

var data = [{
  "type": "Feature",
  "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [2.504410743713379,44.28253972334941],
          [2.504410743713379,44.28929846767132],
          [2.5168561935424805,44.28929846767132],
          [2.5168561935424805,44.28253972334941],
          [2.504410743713379,44.28253972334941]
        ]
      ]
    }}]

    
  var customPopup = "<div>"+
                      "<form>"+
                        "<div>"+
                          "<div>"+
                            "Name :<input/>"+
                            "Adress :<input/>"+
                            "<Button type='submit'>Insert Zone</Button>"+
                          "</div>"+
                        "</div>"+
                      "</form>"+
                    "</div>";
  
  var customOptions =
    {
    'maxWidth': '150',
    'width': '50',
    'className' : 'popupCustom'
    }

    
export default class Mapping extends React.Component{


  constructor(props){
    super(props);
    this.state={
      bi: [39.8909236,32.7777734],
      rowsPerPage:10,
      zone:[],
      checkZone: true,
      geojsonLayer: []
    };
    this.handleZoneData = this.handleZoneData.bind(this);
  }

  

  handleZoneData = (data) => {
    let zoneData = []
    let dgn = []
    for(var i in data){
      /*for(var j = 0 ; j< data[i].polygon.geometry.coordinates[0].length ; j++){
        dgn.push([data[i].polygon.geometry.coordinates[0][j][1],data[i].polygon.geometry.coordinates[0][j][0]])
      }*/
      dgn.push([data[i].polygon])
      //zoneData.push(dgn)

      //dgn = []
    }
    
    this.setState({zone: dgn});
    console.log('1--1:', this.state.zone)
    //this.setState({zone: zoneData});
    this.setState({checkZone: false});
  };


  getData(){
    fetch('http://35.234.156.204/zones')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
          this.handleZoneData(data);
    });
  }

  


  componentDidMount() {
    this.getData();
    const map = this.leafletMap.leafletElement;
    var drawnItems = new L.FeatureGroup();
    
    //console.log('DOGİ:', drawnItems)
    map.addLayer(drawnItems);

    

    
    //map.addLayer(this.state.zone);
    const drawControl = new L.Control.Draw({
      position: 'topright',
      draw: {
        polyline: true,
        polygon: true,
        circle: false,
        marker: true,
      },
      edit: {
        featureGroup: drawnItems,
        remove: true,
      },
    });
  

  

    map.addControl(drawControl);


    map.on(L.Draw.Event.DRAWSTART, (e) => {
      for(var i = 0 ; i< this.state.zone.length ; i++) {
      var geojsonLayer = L.geoJson(this.state.zone[i]);
      geojsonLayer.getLayers()[0].addTo(drawnItems);   
      
      
    }});

    map.on(L.Draw.Event.CREATED, (e) => {

    

      const type = e.layerType;
      const layer = e.layer;
      if (type === 'marker') {
        layer.bindPopup('<object data="http://www.youtube.com/embed/W7qWa52k-nE" width="560" height="315"></object>', {
          maxWidth : 200
      });
      }

      
      drawnItems.bindPopup(customPopup,customOptions);
      
      console.log('LAYER ADDED:', layer)

      
      if (layer.getRadius) {
        console.log('It\'s a circle');
      }

      
      
      drawnItems.addLayer(layer);
      
      console.log('GEO JSONNNN', drawnItems.toGeoJSON());
      console.log('GET THEM LAYERS', drawnItems.getLayers());
      console.log('DOGİ:', drawnItems)
      
    });

    map.on(L.Draw.Event.EDITED, (e) => {
      const layers = e.layers;
      let countOfEditedLayers = 0;
      console.log('LAYER EDITED:', layers)
      layers.eachLayer((layer) => {
        countOfEditedLayers++;
      });
    });
  }
  
  handleClick(e) {
  	console.log(e);
  }
  
  getEventIcon(type) {
  switch (type) {
    case 'Sports':
      return greenIcon;
    case 'Music':
      return blueIcon;
    case 'Government':
      return redIcon;
    default:
      return orangeIcon;
  	}
	}


  render() {
    return (
      <div className="Mapping">
        <Map
          ref={m => { this.leafletMap = m; }}
          center={[39.8909236,32.7777734]} zoom={15}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          

          {events.map(({ id, lat, lng, title, description, type }) => (
            <Marker
              id={id}
              key={id}
              position={[lat, lng]}
              icon={this.getEventIcon(type)}
              onClick={this.handleClick}
            >
              <Popup>
                <span>
                  {title}<br />
                  {description}
                </span>
              </Popup>
            </Marker>
          ))}
        </Map>
        
      </div>

    );
  }
}






//<Button className ="SetMargin" type="submit">Set</Button>

//onChange={e => ben[0][0]=Number(e.target.value)}