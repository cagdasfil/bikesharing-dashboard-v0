import React from 'react';
import CollectionTable from '../../../../components/CollectionTable';
import configuration from '../../../../constants/configuration';
  
export default class Transactions extends React.Component {

    constructor(props){
      super(props);
      this.state={
        transactions:[]
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
        id: 'operationType',
        label: 'operationType',
        minWidth: 100,
      },
      {
        id: 'transactionAmount',
        label: 'transactionAmount',
        minWidth: 100,
      },
      {
        id: 'balanceBefore',
        label: 'balanceBefore',
        minWidth: 100,
      },
      {
        id: 'balanceAfter',
        label: 'balanceAfter',
        minWidth: 100,
      },
      {
        id: 'createdAt',
        label: 'createdAt',
        minWidth: 100,
      },
    ];

    handleTransactionData = (data) => {
        let formattedData = []
        for(var i in data){
            formattedData.push({ id: data[i]._id,
                                 userId: data[i].userId,
                                 operationType: data[i].operationType,
                                 transactionAmount: data[i].details.transactionAmount,
                                 balanceBefore: data[i].details.balanceBefore,
                                 balanceAfter: data[i].details.balanceAfter,
                                 createdAt: data[i].createdAt,
            });
        }
        this.setState({transactions:formattedData});
    };
  
    getData(){
      fetch( configuration.server.apiAddress + '/transactions', {
        method : 'get',
        headers : {'Content-Type':'application/json',
        'Authorization': `Bearer ${this.props.jwt}`},
      })
          .then((response) => {
              return response.json();
          })
          .then((data) => {
              this.handleTransactionData(data);
          });
    }

    componentWillMount(){
      this.getData();
    }

    render(){
      return (
        <CollectionTable columns={this.columns} rows={this.state.transactions} />
      );
    }
  }