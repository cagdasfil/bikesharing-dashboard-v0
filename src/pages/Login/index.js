import React from "react";
import { Button, Form } from "react-bootstrap";
import './login.css';
import history from "../../services/history";



export default class Login extends React.Component{

  constructor(props){
    super(props);
    this.state={
      jwt : {},
      user : {},
      admin : "",
      password : ""
    };

    this.validateForm = this.validateForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendLoginRequest = this.sendLoginRequest.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
    this.loginErrorHandler = this.loginErrorHandler.bind(this);
    
  }

  validateForm() {
    return this.state.admin.length > 0 && this.state.password.length > 0;
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  sendLoginRequest(){
    fetch('http://35.189.94.121/auth/local/', {
      method : 'post',
      headers : {'Content-Type':'application/json'},
      body : JSON.stringify({
        "identifier" : this.state.admin,
        "password" : this.state.password
      }),
    })
        .then((response) => {
            return response.json();
        })
        .then((loginResponse) => {
            loginResponse.user ? this.loginHandler(loginResponse) : this.loginErrorHandler(loginResponse)
        });
  }

  loginErrorHandler(loginResponse){
    //Invalid id password case
    console.log(loginResponse)
  }

  loginHandler(loginResponse) {
    
    //User return case
    this.setState({user : loginResponse.user})
    this.setState({jwt : loginResponse.jwt})

    //Check admin or user
    loginResponse.user.role.type === "admin" 
      ?
        this.props.history.push({
          pathname: '/dashboard',
          state: { jwt: loginResponse.jwt }
        })

      :
        console.log("You are not a system admin!")
  }

  render(){
    return (
      <div className="Login">
          <div className="LoginBoxIn">
            <form onSubmit={this.handleSubmit} className="Form">
              <Form.Label className="FormLabels">Admin</Form.Label>
              <Form.Control
                autoFocus
                type="admin"
                value={this.state.admin}
                onChange={e => this.setState({admin : e.target.value})}
                className="FormBoxes"
              />
              <Form.Label className="FormLabels">Password</Form.Label>
              <Form.Control
                value={this.state.password}
                onChange={e => this.setState({password : e.target.value})}
                type="password"
                className="FormBoxes"
              />
              <Button className="Button" block bsSize="large" disabled={!this.validateForm()} type="submit" onClick={this.sendLoginRequest}>
                  Login
              </Button>
            </form>
          </div>
      </div>
    );
  }
}
