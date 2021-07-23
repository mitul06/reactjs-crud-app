import {
  Typography,
  Box,
  makeStyles,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip
} from '@material-ui/core'

import VisibilityIcon from '@material-ui/icons/Visibility'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'

const useStyle = makeStyles({
  addListColor: {
    backgroundColor: '#4caf50',
    color: 'white'
  },
  tableHeadCell: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
})

const List = () => {
  const classes = useStyle()
  const [students, setStudents] = useState([])
  useEffect(() => {
    async function getAllStudents () {
      try {
        const studentsdata = await axios.get('http://localhost:3333/students')
        // console.log(studentsdata.data)
        setStudents(studentsdata.data)
      } catch (error) {
        console.log('Something wrong')
      }
    }
    getAllStudents()
  }, [])

  const dataDelete = async id => {
    await axios.delete(`http://localhost:3333/students/${id}`)
    var newStudent = students.filter((item) => {
      return item.id !== id;
    });

    setStudents(newStudent);
  }

  return (
    <>
      <Box textAlign='center' p={2} mb={2} className={classes.addListColor}>
        <Typography variant='h4'>Student List</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#ba68c8' }}>
              <TableCell align='center' className={classes.tableHeadCell}>
                No
              </TableCell>
              <TableCell align='center' className={classes.tableHeadCell}>
                Name
              </TableCell>
              <TableCell align='center' className={classes.tableHeadCell}>
                Email
              </TableCell>
              <TableCell align='center' className={classes.tableHeadCell}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student, i) => {
              return (
                <TableRow key={i}>
                  <TableCell align='center'>{i + 1}</TableCell>
                  <TableCell align='center'>{student.stuname}</TableCell>
                  <TableCell align='center'>{student.email}</TableCell>
                  <TableCell align='center'>
                    <Tooltip title='View'>
                      <IconButton>
                        <Link to={`/view/${student.id}`}>
                          <VisibilityIcon color='primary' />
                        </Link>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title='Edit'>
                      <IconButton>
                        <Link to={`/edit/${student.id}`}>
                          <EditIcon />
                        </Link>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title='Delete'>
                      <IconButton onClick={() => dataDelete(student.id)}>
                        <DeleteIcon color='secondary' />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default List
