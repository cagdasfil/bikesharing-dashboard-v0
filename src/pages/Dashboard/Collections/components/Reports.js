import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
  
  export default class Reports extends React.Component {

    constructor(props){
      super(props);
      this.state={
        page:0,
        rowsPerPage:10,
        reports:[]
      };
      this.handleReportData = this.handleReportData.bind(this);
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
      { id: 'userId',
        label: 'userId',
        minWidth: 100 
      },
      {
        id: 'title',
        label: 'title',
        minWidth: 100,
      },
      {
        id: 'description',
        label: 'description',
        minWidth: 100,
      },
      {
        id: 'userLocation',
        label: 'userLocation',
        minWidth: 100,
      },
      {
        id: 'createdAt',
        label: 'createdAt',
        minWidth: 100,
      },
    ];

    handleChangePage = (event, newPage) => {
      this.setState({page:newPage});
    };
  
    handleChangeRowsPerPage = event => {
      this.setState({rowsPerPage:+event.target.value, page:0});
    };

    handleReportData = (data) => {
        let formattedData = []
        for(var i in data){
            formattedData.push({ id: data[i]._id,
                                 userId: data[i].userId,
                                 title: data[i].title,
                                 description: data[i].description,
                                 userLocation: JSON.stringify(data[i].userLocation),
                                 createdAt: data[i].createdAt,
            });
        }
        this.setState({reports:formattedData});
    };
  
    getData(){
      fetch('http://35.234.156.204/reports')
          .then((response) => {
              return response.json();
          })
          .then((data) => {
              this.handleReportData(data);
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
                {this.state.reports.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(row => {
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
            count={this.state.reports.length}
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
      );
    }
  }