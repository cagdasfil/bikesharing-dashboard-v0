import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import StorageIcon from '@material-ui/icons/Storage';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MapIcon from '@material-ui/icons/Map';
//import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { Typography, List } from '@material-ui/core';
import Mapping from "./Mapping";

const ExpansionPanel = withStyles({
    root: {
      backgroundColor:"#336699",
      boxShadow: 'none',
    },
    expanded: {
  
    },
  })(MuiExpansionPanel);
  
  const ExpansionPanelSummary = withStyles({
    root: {
      borderBottom: "1px solid gray",
      '&$expanded': {
        minHeight: 56,
      },
    },
    content: {
      '&$expanded': {
        margin: '12px 0',
      },
      color:"lightgray"
    },
    expanded: {
  
    },
  })(MuiExpansionPanelSummary);

export default class Map extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {

    };
  }

  handleClick(){
    this.props.callBack(<Mapping jwt={this.props.jwt}/>);
  }

  render(){
    return (
      <div>
        <ExpansionPanel square onClick={()=>this.props.callBack(<Mapping jwt={this.props.jwt}/>)}>
            <ExpansionPanelSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <ListItemIcon>
                    <MapIcon style={{color:"lightgray"}} />
                </ListItemIcon>
                <ListItemText primary="Map"/>
            </ExpansionPanelSummary>
        </ExpansionPanel>
      </div>
    );
  }
}
