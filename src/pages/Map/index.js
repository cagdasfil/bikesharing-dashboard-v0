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

export default class Mapping extends React.Component{


  componentDidMount() {
    const map = this.leafletMap.leafletElement;
    var drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);
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
  map.on(L.Draw.Event.CREATED, (e) => {
    const type = e.layerType;
    const layer = e.layer;
    if (type === 'marker') {
      layer.bindPopup('A popup!');
    }
    console.log('LAYER ADDED:', layer)
    if (layer.getRadius) {
			console.log('It\'s a circle');
    }
    drawnItems.addLayer(layer);
    
    console.log('GEO JSONNNN', drawnItems.toGeoJSON());
    console.log('GET THEM LAYERS', drawnItems.getLayers());
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