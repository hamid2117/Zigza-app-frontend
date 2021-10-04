import React, { useState } from 'react'
import {
  TextField,
  Button,
  CssBaseline,
  makeStyles,
  Container,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core'
import { useFormik } from 'formik'
import { useAuthContext } from '../../context/AuthContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { devApi } from '../../api'
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    padding: '30px',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(0.2),
  },
  submit: {
    margin: theme.spacing(1.5, 0, 1),
  },
  changerr: {
    '@media (max-width: 500px)': {
      marginTop: '17px',
    },
  },
}))

export default function SignIn() {
  const classes = useStyles()
  const [phoneerror, setEmailerror] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const [pinerror, setpinerror] = useState(false)
  const [loading, setLoading] = useState(false)
  const { loginData } = useAuthContext()

  const onSubmit = async (value) => {
    setLoading(true)
    setpinerror(false)
    setEmailerror(false)
    const { ...data } = value
    const response = await axios
      .post(`${devApi}forgetpassword`, data)
      .catch((e) => {
        if (e && e.response) {
          setLoading(false)
          if (e.response.status === 400) {
            setEmailerror(true)
            setLoading(false)
          }
          if (e.response.status === 403) {
            setEmailerror(false)
            setLoading(false)

            setpinerror(true)
          }
        }
      })
    if (response && response.data) {
      loginData(response.data)
      formik.resetForm()
      setEmailerror(false)
      setLoading(false)
      setTimeout(() => {
        setRedirect(true)
      }, 800)
      toast.success('Email verification link is sended.', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit,
  })

  return (
    <>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <form className={classes.form} onSubmit={formik.handleSubmit}>
            <TextField
              variant='standard'
              margin='normal'
              required
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              helperText={phoneerror && 'This phone email not registered'}
              error={phoneerror ? true : false}
              id='email'
              label='Email'
              name='email'
              autoComplete='email'
              style={{ paddign: 5 }}
              autoFocus
            />
            <Button
              type='submit'
              fullWidth
              variant='outlined'
              color='primary'
              disabled={loading}
              className={classes.submit}
            >
              {loading ? 'Loading...' : 'Send verification'}
            </Button>
          </form>
        </div>
      </Container>
    </>
  )
}
