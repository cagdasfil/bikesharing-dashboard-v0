import React from 'react';
import CollectionTable from '../../../../components/CollectionTable';
import configuration from '../../../../constants/configuration';

export default class Zones extends React.Component {
  constructor(props){
    super(props);
    this.state={
      zones:[]
    };
  }

  columns = [
    { id: 'id',
      label: 'id',
      minWidth: 100
    },
    { id: 'name',
      label: 'name',
      minWidth: 50 
    },
    {
      id: 'address',
      label: 'address',
      minWidth: 100,
    },
    {
      id: 'coordinates',
      label: 'coordinates',
      minWidth: 50,
    },
    {
      id: 'createdAt',
      label: 'createdAt',
      minWidth: 100,
    },
    {
      id: 'updatedAt',
      label: 'updatedAt',
      minWidth: 100,
    },
  ];

  handleCoordinateData = (coordinates) => {
      return coordinates[0].map((c)=>{
          var stringCoordinates = ""
          stringCoordinates += "["+c[0].toString()+",\n";
          stringCoordinates += c[1].toString()+"],\n";
          return stringCoordinates;
      });
  }

  handleZoneData = (data) => {
      let formattedData = []
      for(var i in data){
          formattedData.push({ id: data[i]._id,
                                name: data[i].name,
                                address: data[i].address,
                                coordinates: this.handleCoordinateData(data[i].polygon.geometry.coordinates),
                                createdAt: data[i].createdAt,
                                updatedAt: data[i].updatedAt,
          });
      }
      this.setState({zones:formattedData});
  };

  getData(){
    fetch( configuration.server.apiAddress + '/zones', {
      method : 'get',
      headers : {'Content-Type':'application/json',
      'Authorization': `Bearer ${this.props.jwt}`},
    })
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
      <CollectionTable columns={this.columns} rows={this.state.zones} />
    );
  }
}