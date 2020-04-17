import React from 'react';
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
      backgroundColor:"#23395B",
      color:"white",
    },
});


class CollectionTable extends React.Component {

    constructor(props){
        super(props);
        this.state={
            page:0,
            rowsPerPage:10
          };
    }

    handleChangePage = (event, newPage) => {
        this.setState({page:newPage});
    };
    
    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage:+event.target.value, page:0});
    };

    render(){
        const {classes} = this.props;
        return (
            <div>
              <TableContainer className={classes.tablecontainer}>
                <Table stickyHeader aria-label="sticky table" >
                  <TableHead >
                    <TableRow >
                      {this.props.columns.map(column => (
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
                    {this.props.rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(row => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                          {this.props.columns.map(column => {
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
                count={this.props.rows.length}
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(CollectionTable);