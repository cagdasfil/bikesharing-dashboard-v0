import React from 'react';
import CollectionTable from '../../../../components/CollectionTable';
  
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
        id: 'startDockerId',
        label: 'startDockerId',
        minWidth: 100,
      },
      {
        id: 'endDockerId',
        label: 'endDockerId',
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
                                 startDockerId: data[i].startDockerId,
                                 endDockerId: data[i].endDockerId,
                                 createdAt: data[i].createdAt,
                                 updatedAt: data[i].updatedAt,
            });
        }
        this.setState({usages:formattedData});
    };
  
    getData(){
      fetch('http://35.234.156.204/usages')
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