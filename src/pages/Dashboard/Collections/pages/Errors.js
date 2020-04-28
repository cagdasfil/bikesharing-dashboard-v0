import React from 'react';
import CollectionTable from '../../../../components/CollectionTable';
import configuration from '../../../../constants/configuration';
  
export default class Errors extends React.Component {

  constructor(props){
    super(props);
    this.state={
      errors:[]
    };
  }
  
  columns = [
    { id: 'id',
      label: 'id',
      minWidth: 100
    },
    { id: 'status',
      label: 'status',
      minWidth: 100 
    },
    {
      id: 'errorCode',
      label: 'errorCode',
      minWidth: 100,
    },
    {
      id: 'message',
      label: 'message',
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

  handleErrorData = (data) => {
      let formattedData = []
      for(var i in data){
          formattedData.push({ id: data[i]._id,
                                status: data[i].status,
                                errorCode: data[i].errorCode,
                                message: data[i].message? data[i].message.message : null,
                                createdAt: data[i].createdAt,
                                updatedAt: data[i].updatedAt,
          });
      }
      this.setState({errors:formattedData});
  };

  getData(){
    fetch( configuration.server.apiAddress + '/errors', {
      method : 'get',
      headers : {'Content-Type':'application/json',
      'Authorization': `Bearer ${this.props.jwt}`},
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            this.handleErrorData(data);
        });
  }

  componentWillMount(){
    this.getData();
  }

  render(){
    return (
      <CollectionTable columns={this.columns} rows={this.state.errors} />
    );
  }
}