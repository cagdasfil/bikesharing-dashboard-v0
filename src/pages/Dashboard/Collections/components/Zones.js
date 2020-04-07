import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from "@material-ui/core/styles";


const styles = (theme) => ({
  tablecontainer:{
    width: "100%",
    borderRadius: 20,
    backgroundColor:"lightgray"
  },
  tableheadrow:{
    backgroundColor:"#333333",
    color:"white",
  },
});

class Zones extends React.Component {
  constructor(props){
    super(props);
    this.state={
      page:0,
      rowsPerPage:10,
      zones:[]
    };
    this.handleZoneData = this.handleZoneData.bind(this);
  }
  
  classes = {
    root: {
      width: '100%'
    },
    container: {
      maxHeight: 620
    },
  };

  columns = [
    { id: 'id',
      label: 'id',
      minWidth: 100
    },
    { id: 'name',
      label: 'name',
      minWidth: 50 
    },
    {
      id: 'address',
      label: 'address',
      minWidth: 100,
    },
    {
      id: 'coordinates',
      label: 'coordinates',
      minWidth: 50,
    },
    {
      id: 'createdAt',
      label: 'createdAt',
      minWidth: 100,
    },
    {
      id: 'updatedAt',
      label: 'updatedAt',
      minWidth: 100,
    },
  ];

  handleChangePage = (event, newPage) => {
    this.setState({page:newPage});
  };

  handleChangeRowsPerPage = event => {
    this.setState({rowsPerPage:+event.target.value, page:0});
  };

  handleCoordinateData = (coordinates) => {
      return coordinates[0].map((c)=>{
          var stringCoordinates = ""
          stringCoordinates += "["+c[0].toString()+",\n";
          stringCoordinates += c[1].toString()+"],\n";
          return stringCoordinates;
      });
  }

  handleZoneData = (data) => {
      let formattedData = []
      for(var i in data){
          formattedData.push({ id: data[i]._id,
                                name: data[i].name,
                                address: data[i].address,
                                coordinates: this.handleCoordinateData(data[i].polygon.geometry.coordinates),
                                createdAt: data[i].createdAt,
                                updatedAt: data[i].updatedAt,
          });
      }
      this.setState({zones:formattedData});
  };

  getData(){
    fetch('http://35.234.156.204/zones')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            this.handleZoneData(data);
    });
  }

  componentWillMount(){
    this.getData();
  }

  render(){
    const {classes} = this.props;
    return (
      <div>
        <TableContainer className={classes.tablecontainer}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {this.columns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    className={classes.tableheadrow}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.zones.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(row => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {this.columns.map(column => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={this.state.zones.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Zones);