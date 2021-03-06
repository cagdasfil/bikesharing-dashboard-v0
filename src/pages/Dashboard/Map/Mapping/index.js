import React, { useState } from "react";

import { Icon, LatLng } from "leaflet";
import { Button, Form } from "react-bootstrap";
import { Container, Row, Col } from 'reactstrap';
import {Map, Marker, Popup, TileLayer, Polygon } from "react-leaflet";
import Draw from 'leaflet-draw';
import "./map.css"
import { render } from "@testing-library/react";
import configuration from "../../../../constants/configuration";
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
      zoneName:"hi",
      zoneAddres:"",
      newZone: [],
      name: "",
      address: "",
      names:[],
      addresses:[],
      ids:[],
      dataBaseZones:[],
      newDataBaseZones:[],
      indexOf:[],
      delete: false,
      isUpdate: false,
      updateCoordinates: [],
      jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOTYwMWYxMTg3OThiNzYyYzRlOGFmOCIsImlhdCI6MTU4Njg5MTIwMywiZXhwIjoxNTg5NDgzMjAzfQ.i6y02fhkMIgXBJT_pdCjzzEHID4-gI__EslUZdqp5eM",
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
    let zoneData = [];
    let dgn = [];
    this.setState({dataBaseZones: []});
    for(var i in data){
      /*for(var j = 0 ; j< data[i].polygon.geometry.coordinates[0].length ; j++){
        dgn.push([data[i].polygon.geometry.coordinates[0][j][1],data[i].polygon.geometry.coordinates[0][j][0]])
      }*/
      dgn.push([data[i]]);
      //zoneData.push(dgn)
      this.state.dataBaseZones.push({name: data[i].name,
                                    address: data[i].address,
                                    id: data[i].id,
                                    coordinates: data[i].polygon.geometry.coordinates[0],
                                    leaflet_id:""
                                  });

      //dgn = []
      console.log('1--1:', data[i]);
    }
    
    this.setState({zone: dgn});
    
    this.setState({gotData: false});
    //this.setState({zone: zoneData});
    
    //console.log('1--1:', this.state.zone[0][0].polygon)
  };


  getData(){
    fetch( configuration.server.apiAddress + '/zones', {
      method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization:  'Bearer ' + this.state.jwt,
          },
        

    }).then((response) => {
            return response.json();
        })
        .then((data) => {
          this.handleZoneData(data);
    });
  }


  postData(coord){
    const requestOptions = {
      method: 'POST',
      headers: { Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization:  'Bearer ' + this.state.jwt,
    },
      body: JSON.stringify({ name: this.state.name, address: this.state.address, coordinates: [coord]})
    };
    console.log('deneme', requestOptions.body)
    fetch( configuration.server.apiAddress + '/zones/insertZone', requestOptions)
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


  UpdateZone(id, coord){
    const requestOptions = {
      method: 'POST',
      headers: { Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization:  'Bearer ' + this.state.jwt,
    },
      body: JSON.stringify({ zoneId: id, newCoordinates: [coord]})
    };
    console.log('deneme', requestOptions.body)
    fetch(configuration.server.apiAddress + '/zones/updatePolygon', requestOptions)
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
 


  componentDidMount() {
    this.getData();
    const map = this.leafletMap.leafletElement;
    var drawnItems = new L.FeatureGroup();
    var popup = L.popup();
    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map);
    }

    //map.on('click', onMapClick);
    
    
    map.addLayer(drawnItems);

    

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


    map.on('mouseover', (e) => {
      if(!this.state.gotData){
        for(var i = 0 ; i< this.state.zone.length ; i++) {
          var geojsonLayer = L.geoJson(this.state.zone[i][0].polygon);
          this.state.dataBaseZones[i].leaflet_id = geojsonLayer._leaflet_id-1;
          geojsonLayer.getLayers()[0].addTo(drawnItems);
          
        }
        this.setState({newDataBaseZones: this.state.dataBaseZones});
        console.log('DATABASE', drawnItems);
        this.setState({gotData: true});  
      }
      });

    var container = $('<div />');

    var update = [];

    function sayHello(e) {
      var ds = [];
      popup
        .setLatLng(e.latlng)
        .setContent(container[0])
        .openOn(map);
      
      e.layer._latlngs[0].forEach(element => { ds.push([element.lng, element.lat]);
      update = ds;
      
        
      
        
      });
      console.log('E.LATLNG', ds);
  }
    // Delegate all event handling for the container itself and its contents to the container
    container.on('click', '.smallPolygonLink', 
        this.handleClick
    );

    /*container.on('click', '.smallPolygonLink',function() {

      alert("Zone Reshaped");
  });*/
    
    // Insert whatever you want into the container, using whichever approach you prefer
    container.html("<a href='#' class='smallPolygonLink'>Update Zone</a>.");
    container.append($('<span class="bold">').text(" :)"))

    // Insert the container into the popup
    drawnItems.on('click', sayHello);

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

      


      //drawnItems.bindPopup(customPopup,customOptions);
      
      
      console.log('LAYER ADDED:', layer)

      
      if (layer.getRadius) {
        console.log('It\'s a circle');
      }

      
      
      drawnItems.addLayer(layer);
      
      console.log('GEO JSONNNN', drawnItems.toGeoJSON());
      console.log('GET THEM LAYERS', drawnItems.getLayers());

      var allLayer = drawnItems.toGeoJSON().features;
      var LatLng = [];
      var zones = [];
      for (let i = this.state.dataBaseZones.length; i < allLayer.length; i++) {
        var LatLng = [];
        if(allLayer[i].geometry.coordinates[0].length >= 3){
          for (let j = 0; j < allLayer[i].geometry.coordinates[0].length; j++) {
            LatLng.push([allLayer[i].geometry.coordinates[0][j][1], allLayer[i].geometry.coordinates[0][j][0]]);           
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

      var index = [];
      for (let i = 0; i < this.state.dataBaseZones.length; i++) {
        if (e.layers._layers[this.state.dataBaseZones[i].leaflet_id]) {
          index.push(i);
          var temp = [];
          var latlngs = e.layers._layers[this.state.dataBaseZones[i].leaflet_id]._latlngs[0];
          for (let j = 0; j < latlngs.length; j++) {
            temp.push([latlngs[j].lng, latlngs[j].lat]);            
          }
          temp.push([latlngs[0].lng, latlngs[0].lat]);  
          console.log('ID-1', this.state.dataBaseZones[i].coordinates)
          this.state.dataBaseZones[i].coordinates = temp;
          this.UpdateZone(this.state.dataBaseZones[i].id, this.state.dataBaseZones[i].coordinates);
          console.log('ID-2', temp)
        }
        
      }

      this.setState({indexOf: index})

      console.log('E', this.state.indexOf)
      
      
    });

    map.on(L.Draw.Event.DELETED, (e) => {
      console.log('DELETED', e)
      this.setState({delete: true})
     
    });

    
  }

  ters(array){
    var newArray = array;
    for (let i = 0; i < array.length; i++) {
      newArray[i].reverse();
      
    }
    console.log('Array', newArray);
    return newArray;
  }
  
  deleteClick(id){
    fetch(configuration.server.apiAddress + '/zones/' + id, {
      method: 'DELETE',
      headers: { Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization:  'Bearer ' + this.state.jwt,
    },
    })
    .then(res => res.text()) // or res.json()
    .then(res => console.log(res))
    for (let i = 0; i < this.state.dataBaseZones.length; i++) {
      if(this.state.dataBaseZones[i].id === id){
        this.state.dataBaseZones.splice(i, 1);
      }
    }
  }

  updateNameAndAddress(idx, coord){
    var temp = [];
    temp.push({id: idx, coordinates: coord});
    this.setState({updateCoordinates: temp, isUpdate:true});
    //console.log('DOGAN', this.state.updateCoordinates);
    /*for (let i = 0; i < this.state.newDataBaseZones.length; i++) {
      if (this.state.newDataBaseZones[i].id ===idx) {
        this.state.newDataBaseZones.splice(i, 1);
        console.log('DOGAN', this.state.newDataBaseZones);
      }
      
    }*/
  }


 /* update(id, coordinates){
    fetch('http://35.234.156.204/zones/' + id, {
      method: 'PUT',
      headers: { Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization:  'Bearer ' + this.state.jwt,
    },
      body: JSON.stringify({ zoneId: id, newCoordinates: [coord]})
    })
    .then(res => res.text()) // or res.json()
    .then(res => console.log('Salı', res))
  }*/

  update(id, coord){
    const requestOptions = {
      method: 'PUT',
      headers: { Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization:  'Bearer ' + this.state.jwt,
    },
      body: JSON.stringify({name: this.state.name, address: this.state.address})
    };
    fetch(configuration.server.apiAddress + '/zones/' + id, requestOptions)
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
    
    for (let i = 0; i < this.state.newDataBaseZones.length; i++) {
      if(this.state.newDataBaseZones[i].id === id){
        this.state.newDataBaseZones[i].name = this.state.name;
        this.state.newDataBaseZones[i].address = this.state.address;
      }
    }

    this.setState({isUpdate:false});
    
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
          
          {this.state.newDataBaseZones.map(({name, address, id, coordinates}) => (
            <Polygon
              
              positions={this.ters(coordinates)}


              color='#3E2723'
              onClick={this.handleClick}
            >
              {!this.state.isUpdate?
              <Popup >
                <div className="Name">
                  <form  >
                    <div >
                      <div className="Setting">
                        <Form.Label className="FormLabels">{name}</Form.Label>
                      </div>
                      
                      <div className="Setting">
                        <Form.Label className="FormLabels">{address}</Form.Label>
                      </div>
                      <button className ="SetMargin" type="button" onClick={() => this.updateNameAndAddress(id, coordinates)}>Update Zone</button>
                      <button className ="SetMargin" type="submit" onClick={() => this.deleteClick(id)}>Delete Zone</button>
                                    
                    </div>                   
                  </form>
                </div>
              </Popup>
              :
              <Popup >
                <div className="Name">
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
                      <button className ="SetMargin" type="button" onClick={() => this.update(id, coordinates)}>Update Zone</button>
                                    
                    </div>                   
                  </form>
                </div>
              </Popup>
            }
            </Polygon>
          ))}
          
          {this.state.newZone.map(({name, address, coordinates }) => (
            <Polygon
              
              positions={coordinates}


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
                      <button className ="SetMargin" type="submit" onClick={() => this.postData(this.ters(coordinates))}>Insert Zone</button>
                                    
                    </div>                   
                  </form>
                </div>
              </Popup>
            </Polygon>
          ))}
        </Map>
        

      </div>
      
    );
  }
}






//<Button className ="SetMargin" type="submit">Set</Button>

//onChange={e => ben[0][0]=Number(e.target.value)}