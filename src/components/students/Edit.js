import {
  Typography,
  Box,
  makeStyles,
  Grid,
  TextField,
  Button
} from '@material-ui/core'
import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'

const useStyles = makeStyles({
  headingColor: {
    backgroundColor: '#03a9f4',
    color: 'white'
  },
  addStuColor: {
    backgroundColor: '#ffa726',
    color: 'white'
  }
})

const Edit = () => {
  const classes = useStyles()
  const { id } = useParams()
  const history = useHistory()
  const [student, setStudent] = useState({
    stuname: '',
    email: ''
  })
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

  function onTextChange (e) {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    })
  }

  async function onFormSubmit (e) {
    e.preventDefault()
    try {
      await axios.put(`http://localhost:3333/students/${id}`, student)
      history.push("/")
    } catch (error) {
      console.log('Something is Wrong')
    }
  }

  function goTOHomePage () {
    history.push('/')
  }
  return (
    <>
      <Box textAlign='center' p={2} className={classes.headingColor} mb={2}>
        <Typography variant='h4'>React CRUD API</Typography>
      </Box>
      <Grid container justifyContent='center' spacing={4}>
        <Grid item md={6} xs={12}>
          <Box textAlign='center' p={2} mb={2} className={classes.addStuColor}>
            <Typography variant='h4'> Edit Student</Typography>
          </Box>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='id'
                  label='ID'
                  name='id'
                  variant='outlined'
                  required
                  fullWidth
                  id='id'
                  autoFocus
                  value={id}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='stuname'
                  label='Student Name'
                  name='stuname'
                  variant='outlined'
                  required
                  fullWidth
                  id='stuname'
                  value={student.stuname}
                  onChange={e => onTextChange(e)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete='email'
                  label='Email'
                  name='email'
                  variant='outlined'
                  required
                  fullWidth
                  id='email'
                  value={student.email}
                  onChange={e => onTextChange(e)}
                  autoFocus
                />
              </Grid>
            </Grid>
            <Box m={3}>
              <Button
                type='button'
                variant='contained'
                color='primary'
                fullWidth
                onClick={e => onFormSubmit(e)}
              >
                Update Data
              </Button>
            </Box>
          </form>
          <Box m={3} textAlign='center'>
            <Button variant='contained' color='primary' onClick={goTOHomePage}>
              Back TO Home
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default Edit
