import React, { useState } from 'react'
import {
  TextField,
  Button,
  CssBaseline,
  makeStyles,
  Container,
} from '@material-ui/core'
import { useFormik } from 'formik'
import { useAuthContext } from '../../context/AuthContext'
import { Redirect, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import * as yup from 'yup'
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

const validationSchema = yup.object({
  newpassword: yup
    .string()
    .min(8, 'Please enter strong password')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .when('password', {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref('password')], 'Password does not matched'),
    })
    .required('Password is required'),
})

export default function SignIn() {
  const classes = useStyles()
  const [phoneerror, setEmailerror] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const [pinerror, setpinerror] = useState(false)
  const [loading, setLoading] = useState(false)
  const { loginData } = useAuthContext()
  const { token } = useParams()
  const onSubmit = async (value) => {
    setLoading(true)
    setpinerror(false)
    setEmailerror(false)
    const { ...data } = value
    const response = await axios
      .get(`${devApi}updatepassword/${token}`, data)
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
      toast.success('Your password is saved .', {
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
    initialValues: {
      newpassword: '',
      confirmPassword: '',
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema,
  })

  if (redirect) {
    return <Redirect to='/' />
  }

  return (
    <>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <form className={classes.form} onSubmit={formik.handleSubmit}>
            <TextField
              name='newpassword'
              type='password'
              id='newpassword'
              autoComplete='none'
              label='New Password'
              variant='standard'
              fullWidth
              value={formik.values.newpassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              error={
                formik.touched.newpassword && formik.errors.newpassword
                  ? true
                  : false
              }
              helperText={
                formik.touched.newpassword && formik.errors.newpassword
                  ? formik.errors.newpassword
                  : null
              }
            />
            <TextField
              name='confirmPassword'
              type='password'
              id='confirmPassword'
              autoComplete='none'
              id='filled-disabled'
              label='Confirm Password'
              variant='standard'
              fullWidth
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              error={
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? true
                  : false
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? formik.errors.confirmPassword
                  : null
              }
            />
            <Button
              type='submit'
              fullWidth
              variant='standard'
              color='primary'
              disabled={loading}
              className={classes.submit}
            >
              {loading ? 'Loading...' : 'Reset Password'}
            </Button>
          </form>
        </div>
      </Container>
    </>
  )
}
