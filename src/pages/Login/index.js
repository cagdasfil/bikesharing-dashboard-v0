import React from "react";
import { Button, Form } from "react-bootstrap";
import './login.css';
import history from "../../services/history";

export default class Login extends React.Component{

  constructor(props){
    super(props);
    this.state={
      admin : "",
      password : ""
    };
    this.validateForm = this.validateForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
  }

  validateForm() {
    return this.state.admin.length > 0 && this.state.password.length > 0;
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  loginHandler() {
    history.push("/dashboard");
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
              <Button className="Button" block bsSize="large" disabled={!this.validateForm()} type="submit" onClick={this.loginHandler}>
                  Login
              </Button>
            </form>
          </div>
      </div>
    );
  }
}
