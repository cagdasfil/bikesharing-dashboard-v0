import React, { useState } from "react";

import { Icon, LatLng } from "leaflet";
import { Button, Form } from "react-bootstrap";
import { Container, Row, Col } from 'reactstrap';
import {Map, Marker, Popup, TileLayer, Polygon } from "react-leaflet";
import Draw from 'leaflet-draw';
import "./map.css"
import { render } from "@testing-library/react";
import L from 'leaflet';
import $ from 'jquery';
window.$ = $;


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

    
  

    
export default class Mapping extends React.Component{


  constructor(props){
    super(props);
    this.state={
      bi: [39.8909236,32.7777734],
      rowsPerPage:10,
      zone:[],
      gotData: false,
      geojsonLayer: [],
      hello:"",
      zoneName:"hi",
      zoneAddres:"",
      newZone: [],
      name: "",
      address: "",
    };
    this.handleZoneData = this.handleZoneData.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({zoneName: event.target.value});
  }

  handleSubmit(event) {
    console.log(this.state.coord);
    event.preventDefault();
  }


  /*handleSubmit(e){
    e.preventDefault();
    this.setState({
      hello: "merhaba"
    });
    
  }*/

  

  

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
    console.log('2--2:', this.state.zone[0][0].geometry.coordinates)
    this.setState({gotData: false});
    //this.setState({zone: zoneData});
      
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


  postData(coord){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: this.state.name, address: this.state.address, coordinates: [coord]})
    };
    console.log('deneme', requestOptions.body)
    fetch('http://35.234.156.204/zones/insertZone', requestOptions)
        .then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

        })
        .catch(error => {
            console.error('There was an error!', error);
        });
  }
  

  boxVar(){ 
    return(
      <div className="Form">
          <form >
            <div >
              <div className="Setting">
              <Form.Label className="FormLabels">Name : </Form.Label>
              <Form.Control className="FormBoxes"
                
              />
              <Form.Label className="FormLabels">Adress : </Form.Label>
              <Form.Control className="FormBoxes2"
                
              />
              <Button className ="SetMargin" type="submit" onClick={this.setState({hello: true})} >Insert Zone</Button>
              </div>              
            </div>                   
          </form>
        </div>)
    
  }

  


  componentDidMount() {
    this.getData();
    const map = this.leafletMap.leafletElement;
    var drawnItems = new L.FeatureGroup();
    var popup = L.popup();
    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + "<div><Script >{this.boxVar}+Hİ</Script></div>")
            .openOn(map);
    }

    map.on('click', onMapClick);
    
    //console.log('DOGİ:', drawnItems)
    map.addLayer(drawnItems);

    

    
    //map.addLayer(this.state.zone);
    const drawControl = new L.Control.Draw({
      position: 'topright',
      draw: {
        polyline: true,
        polygon: true,
        circle: false,
        marker: false,
      },
      edit: {
        featureGroup: drawnItems,
        remove: true,
      },
    });
  

    

    map.addControl(drawControl);


    map.on(L.Draw.Event.DRAWSTART, (e) => {
      if(!this.state.gotData){
        for(var i = 0 ; i< this.state.zone.length ; i++) {
          
          var geojsonLayer = L.geoJson(this.state.zone[i]);
          console.log('LOOK',geojsonLayer)
          geojsonLayer.getLayers()[0].addTo(drawnItems);         
        }
        this.setState({gotData: true});  
      }
      });

    map.on(L.Draw.Event.CREATED, (e) => {

    

      const type = e.layerType;
      const layer = e.layer;
      if (type === 'marker') {
        layer.bindPopup('<object data="http://www.youtube.com/embed/W7qWa52k-nE" width="560" height="315"></object>', {
          maxWidth : 200
      });
      }
      
      var customPopup = '<div className="Form">'+
      '<form >'+
      '<div>'+
      '<div className="Setting">'+
      '<Form.Label className="FormLabels">Name : </Form.Label>'+
      '<input type="text" ' + (true ? 'value =' + this.state.zoneName.toString():null) +' onChange={this.handleChange} />'+
      '<Form.Label className="FormLabels">Adress : </Form.Label>'+
      '<input type="text" value=' + this.state.zoneName.toString() +' onChange={this.handleChange} />'+
      '<button type="button"  onclick={this.handleSubmit}>Create</button> <script>' + 'function AddRecord(){alert("Add it!");}' + '</script>' + 
      '</div>'+
      '</div>'+              
      '</form>'+
      '</div>';
  
      var customOptions =
        {
        'maxWidth': '150',
        'width': '50',
        'className' : 'popupCustom'
        }

      
      ////

      var container = $('<div />');

// Delegate all event handling for the container itself and its contents to the container
container.on('click', '.smallPolygonLink', function() {
    alert("test");
});

// Insert whatever you want into the container, using whichever approach you prefer
container.html("This is a link: <a href='#' class='smallPolygonLink'>Click me</a>.");
container.append($('<span class="bold">').text(" :)"))

// Insert the container into the popup
drawnItems.bindPopup(container[0]);


      //drawnItems.bindPopup(customPopup,customOptions);
      console.log('Check:',this.state.hello)
      
      console.log('LAYER ADDED:', layer)
      console.log('2--2', this.state.hello)

      
      if (layer.getRadius) {
        console.log('It\'s a circle');
      }

      
      
      drawnItems.addLayer(layer);
      
      console.log('GEO JSONNNN', drawnItems.toGeoJSON());
      console.log('GET THEM LAYERS', drawnItems.getLayers());
      console.log('DOGİ:', drawnItems)

      var allLayer = drawnItems.toGeoJSON().features;
      var LatLng = [];
      var zones = [];
      
      for (let i = 0; i < allLayer.length; i++) {
        var LatLng = [];
        if(allLayer[i].geometry.coordinates[0].length >= 3){
          for (let j = 0; j < allLayer[i].geometry.coordinates[0].length; j++) {
            LatLng.push([allLayer[i].geometry.coordinates[0][j][0], allLayer[i].geometry.coordinates[0][j][1]]);           
          }

          zones.push({coordinates: LatLng});
          
        }
      }

      this.setState({newZone: zones});


      console.log('NEW', drawnItems.getLayerId(layer));
      console.log('NEW787', allLayer[0]);

      console.log('ZONE',this.state.newZone)
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

  ters(array){
    for (let i = 0; i < array.length; i++) {
      array[i].reverse();
      
    }
    return array;
  }
  
  handleClick(e) {
  	console.log('n2',e);
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

          
          
          {this.state.newZone.map(({name, address, coordinates }) => (
            <Polygon
              
              positions={this.ters(coordinates)}


              color='#000099'
              onClick={this.handleClick}
            >
              <Popup>
                <div className="Form">
                  <form  >
                    <div >
                      <div className="Setting">
                        <Form.Label className="FormLabels">Name: </Form.Label>
                        <Form.Control className="FormBoxes"
                        autoFocus
                        onChange={e => this.setState({name : e.target.value})}
                        />
                      </div>
                      
                      <div className="Setting">
                        <Form.Label className="FormLabels">Address: </Form.Label>
                        <Form.Control className="FormBoxes2"
                        onChange={e => this.setState({address : e.target.value})}
                        />
                      </div>
                      <button className ="SetMargin" type="submit" onClick={() => this.postData(coordinates)}>Insert Zone</button>
                                    
                    </div>                   
                  </form>
                </div>
              </Popup>
            </Polygon>
          ))}
        </Map>
        <div className="Form">
          <form >
            <div >
              <div className="Setting">
              <Form.Label className="FormLabels">Name : </Form.Label>
              <Form.Control className="FormBoxes"
                
              />
              <Form.Label className="FormLabels">Adress : </Form.Label>
              <Form.Control className="FormBoxes2"
                
              />
              <button className ="SetMargin" type="submit" onClick={this.handleSubmit}>Insert Zone</button>
              </div>              
            </div>                   
          </form>
        </div>
      

      </div>
      
    );
  }
}






//<Button className ="SetMargin" type="submit">Set</Button>

//onChange={e => ben[0][0]=Number(e.target.value)}