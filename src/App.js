import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import './App.css';

function App() {

  const [admin, setAdmin] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return admin.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="App">
        <div className="LoginBoxIn">
          <form onSubmit={handleSubmit} className="Form">
            <Form.Label className="FormLabels">Admin</Form.Label>
            <Form.Control
              autoFocus
              type="admin"
              value={admin}
              onChange={e => setAdmin(e.target.value)}
              className="FormBoxes"
            />
            <Form.Label className="FormLabels">Password</Form.Label>
            <Form.Control
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              className="FormBoxes"
            />
            <Button className="Button" block bsSize="large" disabled={!validateForm()} type="submit">
              Login
            </Button>
          </form>
        </div>
    </div>
  );
}

export default App;
