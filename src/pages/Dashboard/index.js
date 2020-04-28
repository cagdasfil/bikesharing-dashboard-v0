import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';

import Collections from './Collections';
import Analytics from './Analytics';
import Map from './Map';

import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Bikes from './Collections/pages/Bikes';
import { withStyles } from "@material-ui/core/styles";
import clsx from 'clsx';

import {Redirect} from "react-router-dom"


const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    minHeight: "100vh",
    display: 'flex',
    backgroundColor: "#F7F7EE"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color:"#336699"
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor:"#336699"
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class Dashboard extends React.Component {

  constructor(props){
    super(props);
    this.state={
      open: false,
      selectedTab: <Bikes jwt={this.props.location.state.jwt}/>
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
    if(!this.props.location.state || !this.props.location.state.jwt){
      return <Redirect to ="/"/>;
    } 
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <div className={classes.drawerHeader}>
          <IconButton
            onClick={this.handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, this.state.open && classes.hide)}
          >
            <ChevronRightIcon style={{fontSize:50}} />
          </IconButton>
        </div>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={this.state.open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerClose}>
            <ChevronLeftIcon style={{color:"lightgray"}}/>
          </IconButton>
          </div>
          <Collections callBack={this.handleClick} jwt={this.props.location.state.jwt}/>
          <Analytics callBack={this.handleClick} jwt={this.props.location.state.jwt}/>
          <Map callBack={this.handleClick} jwt={this.props.location.state.jwt}/>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: this.state.open,
          })}
        >
          {this.state.selectedTab}
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Dashboard);
