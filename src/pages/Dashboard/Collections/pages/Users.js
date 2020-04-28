import React from "react";
import CollectionTable from '../../../../components/CollectionTable';





export default class Users extends React.Component{



    constructor(props){
        super(props);
        this.state={
          user:[]
        };
      }
  
      columns = [
        { id: 'id',
          label: 'id',
          minWidth: 100
        },
        { id: 'name',
          label: 'Name',
          minWidth: 100 
        },
        {
          id: 'surName',
          label: 'Surname',
          minWidth: 100,
        },
        { id: 'userName',
          label: 'User Name',
          minWidth: 100 
        },
        {
          id: 'email',
          label: 'E-mail',
          minWidth: 100,
        },
        {
          id: 'roleName',
          label: 'Role',
          minWidth: 100,
        },
      ];
  
      handleUserData = (data) => {
          let formattedData = []
          for(var i in data){
              formattedData.push({ id: data[i]._id,
                                   name: data[i].name,
                                   surName: data[i].surname,
                                   userName: data[i].username,
                                   email: data[i].email,
                                   roleName: data[i].role.name,
              });
          }
          this.setState({user:formattedData});
          console.log('Hi Everybody', data);
      };
    
      getData(){
        fetch('http://35.234.156.204/users', {
          method : 'get',
          headers : {'Content-Type':'application/json',
          'Authorization': `Bearer ${this.props.jwt}`},
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.handleUserData(data);
            });
      }
  
      componentWillMount(){
        this.getData();
      }
      
    render(){
        return (
            <CollectionTable columns={this.columns} rows={this.state.user} />
          );
    }
};