import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Collapse from '@material-ui/core/Collapse';



import StorageIcon from '@material-ui/icons/Storage';
import PersonIcon from '@material-ui/icons/Person';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import Bikes from './components/Bikes';
import PieChartIcon from '@material-ui/icons/PieChart';
import BarChartIcon from '@material-ui/icons/BarChart';
import TimelineIcon from '@material-ui/icons/Timeline';


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
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
    alignItems: 'center',
    padding: theme.spacing(0, 1),
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
  nested: {
    paddingLeft: theme.spacing(5),
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div className={classes.drawerHeader}>
      <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            //edge="start"
            className={open && classes.hide}
          >
            <ChevronRightIcon />
        </IconButton>
        </div>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
          <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <StorageIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Collections"/>
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <PersonIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Users" />
                    </ListItem>
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <DirectionsBikeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Bikes" />
                    </ListItem>
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <LocationOnIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Dockers" />
                    </ListItem>
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <MonetizationOnIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Transactions" />
                    </ListItem>
                    </List>
                </Collapse>
            </List>
            <Divider />
            <List>
              {['Pie Charts', 'Bar Graphs', 'Timelines'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon> 
                   {
                    index === 0 ? <PieChartIcon/> : null
                   }
                   {
                    index === 1 ? <BarChartIcon/> : null
                   }
                   {
                    index === 2 ? <TimelineIcon/> : null
                   }
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <Bikes />
      </main>
    </div>
  );
}