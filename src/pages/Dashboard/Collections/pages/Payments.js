import React from 'react';
import CollectionTable from '../../../../components/CollectionTable';
import configuration from '../../../../constants/configuration';
  
export default class Payments extends React.Component {

    constructor(props){
      super(props);
      this.state={
        payments:[]
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
        id: 'totalFee',
        label: 'totalFee',
        minWidth: 100,
      },
      {
        id: 'totalPaid',
        label: 'totalPaid',
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

    handlePaymentData = (data) => {
        let formattedData = []
        for(var i in data){
            formattedData.push({ id: data[i]._id,
                                 userId: data[i].userId,
                                 totalFee: data[i].totalFee,
                                 totalPaid: data[i].totalPaid,
                                 createdAt: data[i].createdAt,
                                 updatedAt: data[i].updatedAt,
            });
        }
        this.setState({payments:formattedData});
    };
  
    getData(){
      fetch( configuration.server.apiAddress + '/payments', {
        method : 'get',
        headers : {'Content-Type':'application/json',
        'Authorization': `Bearer ${this.props.jwt}`},
      })
          .then((response) => {
              return response.json();
          })
          .then((data) => {
              this.handlePaymentData(data);
          });
    }

    componentWillMount(){
      this.getData();
    }

    render(){
      return (
        <CollectionTable columns={this.columns} rows={this.state.payments} />
      );
    }
  }