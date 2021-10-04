import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  TextField,
  Button,
  Select,
  InputLabel,
  MenuItem,
  Grid,
} from '@material-ui/core'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { toast } from 'react-toastify'
import { devApi } from '../../api'
import DateFnsUtils from '@date-io/date-fns'
import 'date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'

import UploadImage from './FileUpload'
const useStyles = makeStyles((theme) => ({
  main: {
    display: 'grid ',
    width: '80%',
    gap: '10px',
    '@media (max-width: 500px)': {},
  },
}))

const validationSchema = yup.object({
  email: yup.string().email('Please enter a valid email address'),
})
const Formm = ({ config, id, setNewData }) => {
  const classes = useStyles()
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18T21:11:54')
  )

  const onSubmit = async (value) => {
    const { ...data } = value
    try {
      const { data: dataa } = await axios.put(
        `${devApi}edituser/${id}`,
        data,
        config
      )
      if (dataa) {
        formik.resetForm()
        setNewData(dataa)
        toast.success('User Data is updated.')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      phone: '',
      email: '',
    },
    onSubmit,
    validationSchema,
  })

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit} className={classes.main}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              id='username'
              name='username'
              variant='standard'
              label='Username'
              value={formik.values.username}
              onChange={formik.handleChange}
              className={classes.lastNamee}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id='phone'
              name='phone'
              variant='standard'
              label='Phone'
              value={formik.values.phone}
              onChange={formik.handleChange}
              className={classes.lastNamee}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id='email'
              name='email'
              variant='standard'
              error={formik.touched.email && formik.errors.email ? true : false}
              helperText={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : null
              }
              onBlur={formik.handleBlur}
              label='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              className={classes.lastNamee}
              fullWidth
            />
          </Grid>
        </Grid>
        <Button variant='outlined' color='primary' type='submit'>
          Update
        </Button>
      </form>
    </>
  )
}
export default Formm
