import {
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  Typography,
} from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Page from '../Page'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckIcon from '@mui/icons-material/Check'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Link } from 'react-router-dom'
import MessageContext from '../../MessageContext'
import StateContext from '../../StateContext'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import axios from 'axios'
import DispatchContext from '../../DispatchContext'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})
const Profile = () => {
  //for deleting
  const [open, setOpen] = useState(false)

  const [email, setEmail] = useState('')

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const { number } = useParams()
  const navigate = useNavigate()
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const message = useContext(MessageContext)
  //phone number
  //addresses
  //email
  //cart
  //orders

  const handleDelete = async () => {
    if (email.toLowerCase() == appState.user.email.toLowerCase()) {
      console.log('yeaaa')
      await axios
        .delete(`/Customer/RemoveCustomer?cusomerId=${appState.user.id}`)
        .then((res) => {
          console.log(res.data)
          message.success(res.data.message)
          appDispatch({ type: 'logout' })
          navigate('/')
          handleClose()
        })
        .catch((res) => {
          console.log('failed')
          console.log(res)
        })
    } else console.log('nooo')
  }

  useEffect(() => {
    if (!appState.loggedIn) {
      navigate('/login')
      message.info('Login first')
    }
  }, [])
  return (
    <Page container={true} nav={true} title="Profile">
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle color={'#9b2c2c'}>
            {'Are you sure you want to delete this accout?'}
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1" color={'#9b2c2c'}>
              Please confirm your email address to delete
            </Typography>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} style={{ color: 'black' }}>
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              variant="contained"
              style={{ backgroundColor: '#9b2c2c' }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <Grid container spacing={4}>
        {/* left side  */}
        <Grid item xs={12} xl={6}>
          <Grid container spacing={3} className="justify-center mt-16">
            <Grid item xs={12}>
              <Typography variant="h3" className="text-red-800 my-5">
                <AccountCircleIcon fontSize="large" /> Your Profile Data
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                label="Full Name"
                fullWidth
                defaultValue={appState.user.fullName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                label="Email"
                fullWidth
                defaultValue={appState.user.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                label="Phone Number"
                fullWidth
                defaultValue={appState.user.phoneNumber}
              />
            </Grid>
            <Grid item xs={6} className="text-center"></Grid>
            <Grid item xs={6} className="text-center">
              <Button
                variant="contained"
                onClick={handleClickOpen}
                className="px-8 py-3 bg-red-800"
              >
                <DeleteIcon fontSize="medium" className="text-white mr-2" />
                Delete Account
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {/* right side  */}
        <Grid item xs={12} xl={6}>
          <List sx={{ width: '100%', marginTop: 10, marginLeft: 3 }}>
            <Divider variant="inset" component="li" />
            <Link to={`/orders`} className="text-black no-underline">
              <ListItem alignItems="flex-start" className="ml-12 my-10">
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Typography variant="h3">Orders</Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </Link>
            <Divider variant="inset" component="li" />
            <Link to="/addresses" className="text-black no-underline">
              <ListItem alignItems="flex-start" className="ml-12 my-10">
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Typography variant="h3">Adresses</Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </Link>
            <Divider variant="inset" component="li" />
          </List>
        </Grid>
      </Grid>
    </Page>
  )
}
export default Profile
