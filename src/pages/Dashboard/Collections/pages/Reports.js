import React from 'react';
import CollectionTable from '../../../../components/CollectionTable';
  
  export default class Reports extends React.Component {

    constructor(props){
      super(props);
      this.state={
        reports:[]
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
        id: 'title',
        label: 'title',
        minWidth: 100,
      },
      {
        id: 'description',
        label: 'description',
        minWidth: 100,
      },
      {
        id: 'userLocation',
        label: 'userLocation',
        minWidth: 100,
      },
      {
        id: 'createdAt',
        label: 'createdAt',
        minWidth: 100,
      },
    ];

    handleReportData = (data) => {
        let formattedData = []
        for(var i in data){
            formattedData.push({ id: data[i]._id,
                                 userId: data[i].userId,
                                 title: data[i].title,
                                 description: data[i].description,
                                 userLocation: JSON.stringify(data[i].userLocation),
                                 createdAt: data[i].createdAt,
            });
        }
        this.setState({reports:formattedData});
    };
  
    getData(){
      fetch('http://35.234.156.204/reports')
          .then((response) => {
              return response.json();
          })
          .then((data) => {
              this.handleReportData(data);
      });
    }

    componentWillMount(){
      this.getData();
    }

    render(){
      return (
        <CollectionTable columns={this.columns} rows={this.state.reports} />
      );
    }
  }