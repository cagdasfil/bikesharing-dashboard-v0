import React from "react";
import './transition.css';

function Transition() {

  function databaseClick(){
  }

  function dashboardClick(){    
  }

  return (
    <div className="View">
      <div className="OuterBox">
        <div className="InsideBox1">
          <p className="Text" onClick={dashboardClick}>Dashboard</p>
        </div>
        <div className="InsideBox2">
          <p className="Text" onClick={databaseClick}>Database</p>
        </div>
      </div>
    </div>
  );
}

export default Transition;
