import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Helmet } from 'react-helmet'
import Navbar from '../components/Navbar'
import EditUser from '../components/EditUser'
import Sidebar from '../components/Sidebar'

const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    display: 'grid',
    margin: '0px auto',
    gridTemplateColumns: '80px auto',
    '@media (max-width: 500px)': {
      gridTemplateColumns: '1fr',
    },
  },
}))
const InvoicePage = () => {
  const classes = useStyles()

  return (
    <>
      <Helmet>
        <title>ZigZa | UserEdit</title>
      </Helmet>
      <Navbar />

      <section className={classes.main}>
        <Sidebar />
        <EditUser />
      </section>
    </>
  )
}
export default InvoicePage
