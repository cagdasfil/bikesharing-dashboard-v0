import React from 'react';
import CollectionTable from '../../../../components/CollectionTable';
import configuration from '../../../../constants/configuration';
  
  export default class Usages extends React.Component {

    constructor(props){
      super(props);
      this.state={
        usages:[]
      };
    }

    columns = [
      { id: 'id',
        label: 'id',
        minWidth: 100
      },
      { id: 'userId',
        label: 'userId',
        minWidth: 100 
      },
      {
        id: 'startZoneId',
        label: 'startZoneId',
        minWidth: 100,
      },
      {
        id: 'endZoneId',
        label: 'endZoneId',
        minWidth: 100,
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

    handleUsageData = (data) => {
        let formattedData = []
        for(var i in data){
            formattedData.push({ id: data[i]._id,
                                 userId: data[i].userId,
                                 startZoneId: data[i].startZoneId,
                                 endZoneId: data[i].endZoneId,
                                 createdAt: data[i].createdAt,
                                 updatedAt: data[i].updatedAt,
            });
        }
        this.setState({usages:formattedData});
    };
  
    getData(){
      fetch( configuration.server.apiAddress + '/usages', {
        method : 'get',
        headers : {'Content-Type':'application/json',
        'Authorization': `Bearer ${this.props.jwt}`},
      })
          .then((response) => {
              return response.json();
          })
          .then((data) => {
              this.handleUsageData(data);
          });
    }

    componentWillMount(){
      this.getData();
    }

    render(){
      return (
        <CollectionTable columns={this.columns} rows={this.state.usages} />
      );
    }
  }