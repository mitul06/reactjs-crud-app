import {
  Typography,
  Box,
  makeStyles,
  Grid,
  TextField,
  Button
} from '@material-ui/core'

import { lightBlue } from '@material-ui/core/colors'
import List from '../students/List'
import axios from 'axios'
import { useState } from 'react'

const useStyle = makeStyles({
  headingColor: {
    backgroundColor: lightBlue[500],
    color: 'white'
  },
  addStuColor: {
    backgroundColor: '#ffa726',
    color: 'white'
  },
})

const Home = () => {
  const classes = useStyle()
  const [student, setStudent] = useState({ stuname: '', email: '' })
  const [status, setStatus] = useState()

  function onTextChange (e) {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    })
  }

  async function onFormSubmit (e) {
    e.preventDefault()
    try {
      await axios.post(`http://localhost:3333/students`, student)
      setStatus(true)
    } catch (error) {
      console.log('Something is Wrong')
    }
  }

  if (status) {
    return <Home />
  }

  return (
    <>
      <Box textAlign='center' className={classes.headingColor} p={2} mb={2}>
        <Typography variant='h4'>React CRUD API</Typography>
      </Box>
      <Grid container justifyContent='center' spacing={4}>
        <Grid item md={6} xs={12}>
          <Box textAlign='center' p={2} mb={2} className={classes.addStuColor}>
            <Typography variant='h4'>Add Student</Typography>
          </Box>
          <form noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete='stuname'
                  name='stuname'
                  variant='outlined'
                  required
                  fullWidth
                  id='stuname'
                  label='Name'
                  onChange={e => onTextChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete='email'
                  name='email'
                  variant='outlined'
                  required
                  fullWidth
                  id='email'
                  label='Email'
                  onChange={e => onTextChange(e)}
                />
              </Grid>
            </Grid>
            <Box m={3}>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                fullWidth
                onClick={e => onFormSubmit(e)}
              >
                Add Student
              </Button>
            </Box>
          </form>
        </Grid>
        <Grid item md={6} xs={12}>
          <List />
        </Grid>
      </Grid>
    </>
  )
}

export default Home
