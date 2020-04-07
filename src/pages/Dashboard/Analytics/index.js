import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';

import PieChartIcon from '@material-ui/icons/PieChart';
import BarChartIcon from '@material-ui/icons/BarChart';
import TimelineIcon from '@material-ui/icons/Timeline';

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
    borderBottom: "1px solid gray"
  },
  content: {
    color:"lightgray"
  },
  expanded: {

  },
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    backgroundColor: "#4080c0",
    borderBottom: "1px solid gray"
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
