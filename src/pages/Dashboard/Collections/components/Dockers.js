import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';


const columns = [
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
  
  const useStyles = makeStyles({
    root: {
      width: '100%'
    },
    container: {
      maxHeight: 620
    },
  });
  
  export default function Dockers() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [dockers, setDockers] = React.useState([]);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = event => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const handleCoordinateData = (coordinates) => {
        var stringCoordinates = ""
        coordinates[0].map((c)=>{
            stringCoordinates += "["+c[0].toString()+",\n";
            stringCoordinates += c[1].toString()+"],\n";
        });
        return stringCoordinates;
    }

    const handleDockerData = (data) => {
        let formattedData = []
        for(var i in data){
            formattedData.push({ id: data[i]._id,
                                 dockerName: data[i].dockerName,
                                 address: data[i].address,
                                 coordinates: handleCoordinateData(data[i].coordinates.geometry.coordinates),
                                 createdAt: data[i].createdAt,
                                 updatedAt: data[i].updatedAt,
            });
        }
        setDockers(formattedData);
    };
  
    fetch('http://35.234.156.204/dockers')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            handleDockerData(data);
    });

    return (
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(column => (
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
              {dockers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map(column => {
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
          count={dockers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    );
  }