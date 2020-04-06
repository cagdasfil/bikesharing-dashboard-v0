import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';

import PieChartIcon from '@material-ui/icons/PieChart';
import BarChartIcon from '@material-ui/icons/BarChart';
import TimelineIcon from '@material-ui/icons/Timeline';

const ExpansionPanel = withStyles({
  root: {
    //border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      //margin: 'auto',
      margin:0,
      padding:0
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor:"#336699",

    //borderBottom: '1px solid rgba(0, 0, 0, .125)',
    //marginBottom: -1,
    //minHeight: 56,
    padding:10,
    margin:0,
    '&$expanded': {
      height:0,
      padding:10,
      margin:0
    },
  },
  content: {
    padding:0,
    '&$expanded': {
      //margin: '6px 0',
      padding:0
    },
    color:"lightgray"
  },
  expanded: {

  },
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    backgroundColor: "#336699",
    padding:"20 0 0 0",
    margin:0
  },
}))(MuiExpansionPanelDetails);

const StyledListItem = withStyles(theme => ({
  root: {
    padding:0
  }
}))(ListItem);


export default class Analytics extends React.Component {

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

  tabs = ['Pie Charts', 'Bar Graphs', 'Timelines'];

  render(){
    return (
      <div>
        <ExpansionPanel square expanded={this.state.expanded === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon style={{color:"lightgray"}}/>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <ListItemIcon>
              <BarChartIcon style={{color:"lightgray"}}/>
            </ListItemIcon>
            <ListItemText primary="Analytics"/>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List>
              {this.tabs.map((text, index) => (
                <StyledListItem button key={text}>
                  <ListItemIcon> 
                    {
                      index === 0 ? <PieChartIcon style={{color:"lightgray"}}/> : null
                    }
                    {
                      index === 1 ? <BarChartIcon style={{color:"lightgray"}}/> : null
                    }
                    {
                      index === 2 ? <TimelineIcon style={{color:"lightgray"}}/> : null
                    }
                  </ListItemIcon>
                  <ListItemText primary={text} style={{color:"lightgray"}}/>
                </StyledListItem>
              ))}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}
