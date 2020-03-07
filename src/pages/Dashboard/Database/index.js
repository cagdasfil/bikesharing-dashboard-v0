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

export default function Database() {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <ExpansionPanel square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
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
          <List component="div" disablePadding>
            <ListItem button>
              <ListItemIcon>
                <PersonIcon/>
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <DirectionsBikeIcon />
              </ListItemIcon>
              <ListItemText primary="Bikes" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <LocationOnIcon/>
              </ListItemIcon>
              <ListItemText primary="Dockers" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <MonetizationOnIcon/>
              </ListItemIcon>
              <ListItemText primary="Transactions" />
            </ListItem>
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
