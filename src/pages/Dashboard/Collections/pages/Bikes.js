import React from 'react';
import CollectionTable from '../../../../components/CollectionTable';

export default class Bikes extends React.Component {

  constructor(props){
    super(props);
    this.state={
      bikes:[]
    }
  }

  columns = [
    { id: 'id',
      label: 'id',
      minWidth: 100
    },
    { id: 'barcode',
      label: 'barcode',
      minWidth: 100 
    },
    {
      id: 'lastZoneId',
      label: 'lastZoneId',
      minWidth: 100,
    },
    {
      id: 'isAvailable',
      label: 'isAvailable',
      minWidth: 50,
    },
    {
      id: 'isLocked',
      label: 'isLocked',
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
  
  handleBikeData = (data) => {
      let formattedData = []
      for(var i in data){
          formattedData.push({ id: data[i]._id,
                                barcode: data[i].barcode,
                                lastZoneId: data[i].lastZoneId,
                                isAvailable: data[i].isAvailable.toString(),
                                isLocked: data[i].isLocked.toString(),
                                createdAt: data[i].createdAt,
                                updatedAt: data[i].updatedAt,
          });
      }
      this.setState({bikes:formattedData});
  };

  getData(){
    fetch('http://35.189.94.121/bikes', {
      method : 'get',
      headers : {'Content-Type':'application/json',
      'Authorization': `Bearer ${this.props.jwt}`},
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            this.handleBikeData(data);
        });
  }

  componentWillMount(){
    this.getData();
  }

  render(){
    return (
      <CollectionTable columns={this.columns} rows={this.state.bikes} />
    );
  }
}
