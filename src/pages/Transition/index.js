import React from "react";
import './transition.css';
import history from '../../services/history'

function Transition() {

  function databaseClick(){
    history.push('/database');
  }

  function analyticsClick(){
    history.push('/analytics');    
  }

  return (
    <div className="View">
      <div className="OuterBox">
        <div className="InsideBox1" onClick={analyticsClick}>
          <p className="Text">Analytics</p>
        </div>
        <div className="InsideBox2" onClick={databaseClick}>
          <p className="Text">Database</p>
        </div>
      </div>
    </div>
  );
}

export default Transition;
