import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';

import Collections from './Collections';
import Analytics from './Analytics';

import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Bikes from './Collections/components/Bikes';


const drawerWidth = 240;

const classes = {
    root: {
      display: 'flex',
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
      padding: "0px 8px",
    },
    content: {
      flexGrow: 1,
      padding: "24px",
      marginLeft: -drawerWidth,
    },
    contentShift: {
      marginLeft: 0,
      flexGrow: 1,
      padding: "24px",
    },
  };

export default class Dashboard extends React.Component {

  constructor(props){
    super(props);
    this.state={
      open: false,
      selectedTab: <Bikes />
    };
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
  }

  handleDrawerOpen = () => {
    this.setState({open:true});
  };

  handleDrawerClose = () => {
    this.setState({open:false});
  };

  handleClick = (component) => {
    this.setState({selectedTab:component});
  };

  render() {
    return (
      <div style={classes.root}>
        <CssBaseline />
        <div style={classes.drawerHeader}>
          <IconButton
            onClick={this.handleDrawerOpen}
            edge="start"
            style={this.state.open? classes.hide : null}
          >
            <ChevronRightIcon />
          </IconButton>
        </div>
        <Drawer
          style={classes.drawer}
          variant="persistent"
          anchor="left"
          open={this.state.open}
        >
          <div style={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
          </div>
          <Collections callBack={this.handleClick} />
          <Analytics callBack={this.handleClick}/>
        </Drawer>
        <main
          style={this.state.open ? classes.contentShift : classes.content}
        >
          {this.state.selectedTab}
        </main>
      </div>
    );
  }
}