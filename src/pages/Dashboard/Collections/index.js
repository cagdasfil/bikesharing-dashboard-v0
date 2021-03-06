import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';

import StorageIcon from '@material-ui/icons/Storage';
import PersonIcon from '@material-ui/icons/Person';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FaBicycle } from 'react-icons/fa';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import ErrorIcon from '@material-ui/icons/Error';
import DescriptionIcon from '@material-ui/icons/Description';
import Usages from "./pages/Usages";
import Users from './pages/Users';
import Bikes from './pages/Bikes';
import Zones from './pages/Zones';
import Payments from './pages/Payments';
import Transactions from './pages/Transactions';
import Errors from './pages/Errors';
import Reports from './pages/Reports';

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
    borderTop: "1px solid gray",
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

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    backgroundColor: "#4080c0",
    borderBottom: "1px solid gray",
  },
}))(MuiExpansionPanelDetails);

const StyledListItem = withStyles(theme => ({
  root: {
    padding:0
  }
}))(ListItem);

export default class Collections extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      expanded: "panel1"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = panel => (event, newExpanded) => {
    this.setState({expanded: newExpanded? panel : false});
  };


  handleClick = [
    () => {this.props.callBack(<Users jwt={this.props.jwt}/>);},
    () => {this.props.callBack(<Bikes jwt={this.props.jwt}/>);},
    () => {this.props.callBack(<Zones jwt={this.props.jwt}/>);},
    () => {this.props.callBack(<Usages jwt={this.props.jwt}/>);},
    () => {this.props.callBack(<Payments jwt={this.props.jwt}/>);},
    () => {this.props.callBack(<Transactions jwt={this.props.jwt}/>);},
    () => {this.props.callBack(<Errors jwt={this.props.jwt}/>);},
    () => {this.props.callBack(<Reports jwt={this.props.jwt}/>);},
  ];

  tabs = ["Users", "Bikes", "Zones", "Usages", "Payments", "Transactions", "Errors", "Reports"];

  render(){
    return (
      <div>
        <ExpansionPanel square expanded={this.state.expanded === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon style={{color:"lightgray"}} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <ListItemIcon>
              <StorageIcon style={{color:"lightgray"}} />
            </ListItemIcon>
            <ListItemText primary="Collections"/>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          <List>
              {this.tabs.map((text, index) => (
                <StyledListItem button key={text} onClick={this.handleClick[index]}>
                  <ListItemIcon> 
                    {
                      index === 0 ? <PersonIcon style={{color:"lightgray"}}/> : null
                    }
                    {
                      index === 1 ? <FaBicycle size={25} style={{color:"lightgray"}}/> : null
                    }
                    {
                      index === 2 ? <LocationOnIcon style={{color:"lightgray"}}/> : null
                    }
                    {
                      index === 3 ? <DirectionsBikeIcon style={{color:"lightgray"}}/> : null
                    }
                    {
                      index === 4 ? <MonetizationOnIcon style={{color:"lightgray"}}/> : null
                    }
                    {
                      index === 5 ? <SwapHorizIcon style={{color:"lightgray"}}/> : null
                    }
                    {
                      index === 6 ? <ErrorIcon style={{color:"lightgray"}}/> : null
                    }
                    {
                      index === 7 ? <DescriptionIcon style={{color:"lightgray"}}/> : null
                    }
                  </ListItemIcon>
                  <ListItemText primary={text} style={{color:"lightgray"}} />
                </StyledListItem>
              ))}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}
