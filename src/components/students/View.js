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
  Button
} from '@material-ui/core'
import { useParams, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const useStyles = makeStyles({
  stuListColor: {
    backgroundColor: '#4caf50',
    color: 'white'
  },
  tableHeadCell: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
})

const View = () => {
  const classes = useStyles()
  const { id } = useParams()
  const [student, setStudent] = useState([])
  const history = useHistory()

  useEffect(() => {
    async function getStudent () {
      try {
        const studentdata = await axios.get(
          `http://localhost:3333/students/${id}`
        )
        // console.log(studentdata.data)
        setStudent(studentdata.data)
      } catch (error) {
        console.log('Something wrong')
      }
    }
    getStudent()
  }, [id])

  
  function goTOHomePage () {
    history.push('/')
  }

  return (
    <>
      <Box textAlign='center' p={2} mb={2} className={classes.stuListColor}>
        <Typography variant='h4'>Student Details</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#ba68c8' }}>
              <TableCell align='center' className={classes.tableHeadCell}>
                ID
              </TableCell>
              <TableCell align='center' className={classes.tableHeadCell}>
                Name
              </TableCell>
              <TableCell align='center' className={classes.tableHeadCell}>
                Email
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align='center'>{student.id}</TableCell>
              <TableCell align='center'>{student.stuname}</TableCell>
              <TableCell align='center'>{student.email}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box m={3} textAlign='center'>
        <Button variant='contained' color='primary' onClick={goTOHomePage}>
          Back To Home
        </Button>
      </Box>
    </>
  )
}

export default View
