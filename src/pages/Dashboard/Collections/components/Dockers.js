import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
  
  export default class Dockers extends React.Component {
    constructor(props){
      super(props);
      this.state={
        page:0,
        rowsPerPage:10,
        dockers:[]
      };
      this.handleDockerData = this.handleDockerData.bind(this);
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
      { id: 'dockerName',
        label: 'dockerName',
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

    handleDockerData = (data) => {
        let formattedData = []
        for(var i in data){
            formattedData.push({ id: data[i]._id,
                                 dockerName: data[i].dockerName,
                                 address: data[i].address,
                                 coordinates: this.handleCoordinateData(data[i].coordinates.geometry.coordinates),
                                 createdAt: data[i].createdAt,
                                 updatedAt: data[i].updatedAt,
            });
        }
        this.setState({dockers:formattedData});
    };

    getData(){
      fetch('http://35.234.156.204/dockers')
          .then((response) => {
              return response.json();
          })
          .then((data) => {
              this.handleDockerData(data);
      });
    }

    componentWillMount(){
      this.getData();
    }

    render(){
      return (
        <Paper style={this.classes.root}>
          <TableContainer style={this.classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {this.columns.map(column => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.dockers.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(row => {
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
            count={this.state.dockers.length}
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
      );
    }
  }