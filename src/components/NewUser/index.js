import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { useGlobalUiContext } from '../../context/uiContext'
import CloseIcon from '@material-ui/icons/Close'
import { useFormik } from 'formik'
import {
  IconButton,
  Divider,
  TextField,
  Button,
  Grid,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core'
import axios from 'axios'
import { toast } from 'react-toastify'
import { devApi } from '../../api'
import DateFnsUtils from '@date-io/date-fns'
import 'date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    borderRadius: '10px',
    padding: '15px 15px',
    width: '400px',
    '@media (max-width: 500px)': {
      padding: '50px 30px',
    },
  },
  head: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    justifyContent: 'start',
  },
  inputs: {
    padding: '18px 0px',
    display: 'grid',
    gap: '15px 0px',
    '@media (max-width: 500px)': {},
  },
  sign: {
    backgroundColor: '#ffb733',
    
    '&:hover': {
      backgroundColor: '#ffd280',
      color:"#4d3200",
    },
  },
}))

export default function NewUser() {
  const classes = useStyles()
  const { adminRegister, adminCloseRegister } = useGlobalUiContext()
  const [phoneError, setPhoneerror] = useState(false)
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18T21:11:54')
  )

  const onSubmit = async (value) => {
    const data = { ...value, birthday: selectedDate }
    console.log(data)
    const response = await axios.post(`${devApi}user`, data).catch((e) => {
      if (e && e.response) {
        if (e.response.status === 400) {
          setPhoneerror(true)
        }
      }
    })
    if (response && response.data) {
      adminCloseRegister()
      toast.success('User is Created.')
      formik.resetForm()
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      username:"",
      phone: '',
      passwrod:"",
    },
    onSubmit,
  })

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={adminRegister}
        onClose={adminCloseRegister}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={adminRegister}>
          <div className={classes.paper}>
            <div className={classes.head}>
              <h3>Register</h3>
              <div style={{ justifySelf: 'end' }}>
                <IconButton onClick={() => adminCloseRegister()}>
                  <CloseIcon />
                </IconButton>
              </div>
            </div>
            <Divider />
            <form onSubmit={formik.handleSubmit} className={classes.inputs}>
              <Grid container spacing={2}>
                <Grid item  xs={12}>
                  <TextField
                    id='username'
                    name='username'
                    variant='standard'
                    label='Username'
                    required
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    className={classes.lastNamee}
                    fullWidth
                    autoComplete='username'
                  />
                </Grid>
                 <Grid item xs={12}>
                  <TextField
                    id='email'
                    name='email'
                    variant='standard'
                    label='Email'
                    required
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className={classes.lastNamee}
                    fullWidth
                    autoComplete='email'
                  />
                </Grid>
                <Grid item xs={12} >
                  <TextField
                    id='phone'
                    name='phone'
                    variant='standard'
                    label='Phone'
                    required
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    className={classes.lastNamee}
                    fullWidth
                    autoComplete='phone'
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    id='password'
                    name='password'
                    variant='standard'
                    type="password"
                    label='Password'
                    required
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    className={classes.lastNamee}
                    fullWidth
                  />
                </Grid>
                

              </Grid>
              <Button className={classes.sign} type='submit'>
                add User
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}
