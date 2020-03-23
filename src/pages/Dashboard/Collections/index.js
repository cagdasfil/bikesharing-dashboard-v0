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
import Usages from "./components/Usages";
import Users from './components/Users';
import Bikes from './components/Bikes';
import Dockers from './components/Dockers';
import Payments from './components/Payments';
import Transactions from './components/Transactions';
import Errors from './components/Errors';

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);

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
    () => {this.props.callBack(<Users/>);},
    () => {this.props.callBack(<Bikes/>);},
    () => {this.props.callBack(<Dockers/>);},
    () => {this.props.callBack(<Usages/>);},
    () => {this.props.callBack(<Payments/>);},
    () => {this.props.callBack(<Transactions/>);},
    () => {this.props.callBack(<Errors/>);},
  ];

  tabs = ["Users", "Bikes", "Dockers", "Usages", "Payments", "Transactions", "Errors"];

  render(){
    return (
      <div>
        <ExpansionPanel square expanded={this.state.expanded === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
          <ListItemIcon>
            <StorageIcon/>
          </ListItemIcon>
            <ListItemText primary="Collections"/>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          <List>
              {this.tabs.map((text, index) => (
                <ListItem button key={text} onClick={this.handleClick[index]}>
                  <ListItemIcon> 
                    {
                      index === 0 ? <PersonIcon/> : null
                    }
                    {
                      index === 1 ? <FaBicycle size={25}/> : null
                    }
                    {
                      index === 2 ? <LocationOnIcon/> : null
                    }
                    {
                      index === 3 ? <DirectionsBikeIcon/> : null
                    }
                    {
                      index === 4 ? <MonetizationOnIcon/> : null
                    }
                    {
                      index === 5 ? <SwapHorizIcon/> : null
                    }
                    {
                      index === 6 ? <ErrorIcon/> : null
                    }
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}
