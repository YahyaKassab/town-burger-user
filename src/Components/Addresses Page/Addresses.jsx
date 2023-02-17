import {
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  Typography,
} from '@mui/material'
import { forwardRef, Fragment, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import DispatchContext from '../../DispatchContext'
import StateContext from '../../StateContext'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Page from '../Page'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import MessageContext from '../../MessageContext'
import axios from 'axios'
import LoadingIcon from '../LoadingIcon'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const Addresses = () => {
  const [open, setOpen] = useState(0)
  useEffect(() => {
    appDispatch({ type: 'fetchAddresses' })
  }, [])

  const [edit, setEdit] = useState(false)
  const navigate = useNavigate()
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const message = useContext(MessageContext)
  const handleDelete = async (id) => {
    const response = await axios
      .delete(`/Customer/DeleteAddress?addressId=${id}`)
      .then((res) => {
        console.log('address Deleted successfully')
        message.success('Address Deleted Successfully')
        setOpen(0)
        setRender(!render)
      })
      .catch((res) => {
        console.log('Delete failed')
        console.log(res)
      })
  }
  if (appState.addressesFetching) return <LoadingIcon />
  return (
    <Page container={true} nav={true} title="Addresses">
      <Grid container direction={'column-reverse'} spacing={4}>
        <Grid item xs={12}>
          <List sx={{ width: '100%', marginTop: 10, marginLeft: 3 }}>
            {appState.addresses.length == 0 ? (
              <h1 className="text-center text-red-800">
                No Addresses Yet
                <Button
                  variant="contained"
                  className="bg-red-800 ml-5"
                  onClick={() => navigate('/add-address')}
                >
                  Add Address
                </Button>
              </h1>
            ) : (
              <>
                <Grid item xs={12} className="my-5">
                  <Button
                    variant="contained"
                    className="bg-red-800 ml-5"
                    onClick={() => navigate('/add-address')}
                  >
                    Add Address
                  </Button>
                </Grid>
                {appState.addresses.map((address, index) => {
                  console.log('addresses')
                  console.log(address.id)
                  console.log(appState.addresses)

                  return (
                    <Fragment key={index}>
                      <Divider variant="inset" component="li" />
                      <ListItem alignItems="flex-start" className="ml-12 my-10">
                        <Grid container spacing={4}>
                          <Grid item xs={12} md={8}>
                            <Typography variant="h3" className="mb-3">
                              {address.street}
                              <br />
                              <span className="text-lg">{address.details}</span>
                            </Typography>
                          </Grid>

                          <Grid item xs={12} md={4}>
                            <Grid container>
                              <Grid item xs={6}>
                                <Button
                                  variant="contained"
                                  className="py-3 px-7 bg-blue-800"
                                  onClick={() =>
                                    navigate(`/${address.id}/edit`)
                                  }
                                >
                                  <EditIcon
                                    fontSize="large"
                                    className="text-white mr-2"
                                  />{' '}
                                  Edit
                                </Button>
                              </Grid>
                              <Grid item xs={6}>
                                <div>
                                  <Button
                                    variant="contained"
                                    onClick={() => setOpen(address.id)}
                                    className="bg-red-800 text-white py-3 px-7"
                                  >
                                    <DeleteIcon
                                      fontSize="medium"
                                      className="text-white mr-2"
                                    />
                                    Delete
                                  </Button>
                                  <Dialog
                                    open={open == address.id}
                                    TransitionComponent={Transition}
                                    keepMounted
                                    onClose={() => setOpen(0)}
                                    aria-describedby="alert-dialog-slide-description"
                                  >
                                    <DialogTitle>
                                      Are you sure you want to delete this
                                      address?
                                    </DialogTitle>
                                    <DialogContent></DialogContent>
                                    <DialogActions>
                                      <Button onClick={() => setOpen(0)}>
                                        No
                                      </Button>
                                      <Button
                                        variant="contained"
                                        onClick={() => {
                                          console.log('address delete')
                                          console.log(address)
                                          handleDelete(address.id)
                                        }}
                                        className="bg-red-800 text-white py-3 px-7"
                                      >
                                        {' '}
                                        <DeleteIcon
                                          fontSize="medium"
                                          className="text-white mr-2"
                                        />
                                        Delete
                                      </Button>
                                    </DialogActions>
                                  </Dialog>
                                </div>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </Fragment>
                  )
                })}
              </>
            )}
          </List>
        </Grid>
      </Grid>
    </Page>
  )
}
export default Addresses
