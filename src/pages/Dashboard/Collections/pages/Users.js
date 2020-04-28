import React from "react";
import CollectionTable from '../../../../components/CollectionTable';

import { Button, Form } from "react-bootstrap";

import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import SaveIcon from '@material-ui/icons/Save';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);




export default class Users extends React.Component{


    constructor(props){
        super(props);
        this.state={
          user:[],
          role:10,
          changing_id:""
        };
      }

    
    handleChange = (event) => {
      this.setState({role:event.target.value});      
    };
  
      columns = [
        { id: 'id',
          label: 'User Id',
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
      };
    
      getData(){
        fetch('http://35.189.94.121/users', {
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
  
      componentDidMount(){
        this.getData();
      }

      sendAdminPost(){
        fetch('http://35.189.94.121/application/setAdmin/', {
          method : 'post',
          headers : {'Content-Type':'application/json',
          'Authorization': `Bearer ${this.props.jwt}`},
          body : JSON.stringify({userId: this.state.changing_id
          }),
        })
        .then((response) => {
          this.getData();
          return response.json();
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
      }

      sendAuthenticatedPost(){
        fetch('http://35.189.94.121/application/setAuthenticated/', {
          method : 'post',
          headers : {'Content-Type':'application/json', 'Authorization': `Bearer ${this.props.jwt}`},
          body : JSON.stringify({ userId: this.state.changing_id
          }),
        }).then((response) => {
          this.getData();
          return response.json();
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
      }

      send(rol){
        if (this.state.role === 10) {
          this.sendAdminPost();
        } else {
          this.sendAuthenticatedPost();        
        }
      }
      
    render(){
        return (
          <div>
            <CollectionTable columns={this.columns} rows={this.state.user} />

            <div >
              <FormControl >
                <InputLabel htmlFor="demo-customized-textbox">User Id</InputLabel>
                <BootstrapInput id="demo-customized-textbox" 
                onChange={e => this.setState({changing_id : e.target.value})}
                />
              </FormControl>
              <FormControl >
                <InputLabel id="demo-customized-select-label">Select Role</InputLabel>
                <Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  value={this.state.role}
                  onChange={this.handleChange}
                  input={<BootstrapInput />}
                  displayEmpty
                >
                  <MenuItem value={10}>Admin</MenuItem>
                  <MenuItem value={20}>Authenticated</MenuItem>
                </Select>
              </FormControl>
              <Button className="saveButton"  block bsSize="large" type="submit" onClick={() => this.send(this.state.role)}>
                Save
              </Button>
            </div>
          </div>
          );
    }
};