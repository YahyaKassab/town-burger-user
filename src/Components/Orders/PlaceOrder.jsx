import React, { useContext, useEffect, useState } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import EditIcon from '@mui/icons-material/Edit'
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from '@mui/material'
import DispatchContext from '../../DispatchContext'
import StateContext from '../../StateContext'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router'
import Page from '../Page'
import './Orders.css'
import MessageContext from '../../MessageContext'
import axios from 'axios'

const PlaceOrder = () => {
  const message = useContext(MessageContext)
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)
  const [addressId, setAddressId] = useState(0)
  const navigate = useNavigate()
  const handleChange = (event) => {
    setAddressId(event.target.value)
  }
  const deleteFromCart = (index) => {
    appDispatch({ type: 'removeFromCart', value: index })
  }
  const totalPrice = (cart) => {
    let total = 0
    cart.map((meal) => {
      total += meal.price
    })
    return total
  }
  const [edit, setEdit] = useState(true)
  var today = new Date()
  const handlePlaceOrder = async () => {
    appDispatch({ type: 'ensurePrice' })
    console.log('addressId: ' + addressId)
    await axios
      .post(`/Orders/PlaceOrder?addressId=${addressId}`)
      .then((res) => {
        navigate('/orders')
        console.log(addressId)
        message.success('Order Placed Successfully')
      })
      .catch((res) => {
        console.log('error')
        console.log(res)
      })
  }

  const updateCart = async () => {
    console.log('cart to update from place order')
    console.log(appState.cart)
    const response = await axios
      .put(`/Orders/UpdateCart`, appState.cart)
      .then((res) => {
        console.log('updating from place order')
        console.log(res.data)
        navigate('/menu')
      })
      .catch((res) => {
        console.log(res)
        console.log('failed')
      })
  }

  useEffect(() => {
    if (!appState.loggedIn) {
      navigate('/login')
      message.info('Login first')
    }
    //fetch addresses
    appDispatch({ type: 'fetchAddresses' })
    appDispatch({ type: 'fetchCart' })
    console.log(appState.cart)
  }, [])
  return (
    <Page container={true} nav={true} title="Place Your Order">
      <div className="justify-center ml-12">
        <Typography variant="h3" className="my-3 text-red-800 ">
          Cart
        </Typography>
        <List sx={{ width: '100%' }}>
          <Grid container direction={'column'}>
            {appState.cart.items.map((item, index) => {
              return (
                <div key={index}>
                  <ListItem alignItems="flex-start">
                    <Grid container spacing={10}>
                      <Grid item xs={12} md={6} lg={4}>
                        <ListItemText
                          primary={
                            <Typography variant="h4" className="ml-3">
                              {appState.cart.items[index].item.title}
                            </Typography>
                          }
                          secondary={
                            <div className="flex flex-col">
                              <Typography
                                sx={{ display: 'inline' }}
                                className="ml-9"
                                component="span"
                                variant="h3"
                                color="text.primary"
                              >
                                {appState.cart.items[index].quantity}
                              </Typography>
                              <div className="flex flex-row justify-center space-x-5 mt-2">
                                <Button
                                  variant="contained"
                                  onClick={() => {
                                    appDispatch({
                                      type: 'ensurePrice',
                                    })
                                    deleteFromCart(index)
                                  }}
                                  className={`bg-red-900  h-12 self-center`}
                                  style={{ borderRadius: 10 }}
                                >
                                  <DeleteIcon
                                    fontSize="medium"
                                    className="text-white mr-2"
                                  />{' '}
                                  Delete
                                </Button>

                                {edit ? (
                                  <Button
                                    variant="contained"
                                    className=" bg-blue-800"
                                    onClick={() => setEdit(false)}
                                    style={{ borderRadius: 10 }}
                                  >
                                    <EditIcon
                                      fontSize="medium"
                                      className="text-white mr-2"
                                    />{' '}
                                    Edit
                                  </Button>
                                ) : (
                                  <div className="flex">
                                    <div className="flex flex-col justify-center space-y-1 mx-5">
                                      <IconButton
                                        onClick={() => {
                                          appDispatch({
                                            type: 'increaseQuantity',
                                            value: index,
                                          })
                                          appDispatch({
                                            type: 'ensurePrice',
                                          })
                                        }}
                                      >
                                        <AddIcon fontSize="large" />
                                      </IconButton>
                                      <IconButton
                                        onClick={() => {
                                          appDispatch({
                                            type: 'decreaseQuantity',
                                            value: index,
                                          })
                                          appDispatch({
                                            type: 'ensurePrice',
                                          })
                                        }}
                                      >
                                        <RemoveIcon fontSize="large" />
                                      </IconButton>
                                    </div>
                                    <Button
                                      variant={
                                        appState.cart.items[index].quantity == 0
                                          ? 'outlined'
                                          : 'contained'
                                      }
                                      className={` bg-blue-800 h-12 self-center ${
                                        appState.cart.items[index].quantity == 0
                                          ? 'bg-white text-black border-black'
                                          : ''
                                      }`}
                                      onClick={() => {
                                        appDispatch({
                                          type: 'ensurePrice',
                                        })
                                        setEdit(true)
                                        console.log(appState.cart)
                                      }}
                                      style={{ borderRadius: 10 }}
                                      disabled={
                                        appState.cart.items[index].quantity == 0
                                      }
                                    >
                                      Confirm
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Typography variant="h4">Description</Typography>
                        <TextField
                          onChange={(e) =>
                            appDispatch({
                              type: 'descriptionChange',
                              value: { index, description: e.target.value },
                            })
                          }
                          id="standard-textarea"
                          label="Description"
                          placeholder="No lettuce"
                          multiline
                          variant="standard"
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </ListItem>

                  <Divider variant="inset" component="li" />
                </div>
              )
            })}
            <Grid item xs={12} lg={6} className={`mx-auto my-12`}>
              {' '}
              <Typography
                variant="h5"
                className="my-6 text-black justify-center text-center"
              >
                {' '}
                Choose Your Address
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Address</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={addressId}
                  label="Age"
                  onChange={handleChange}
                >
                  {appState.addresses == null ? (
                    <MenuItem>
                      <Button
                        variant="contained"
                        className="bg-red-800"
                        onClick={() => navigate('/add-address')}
                      >
                        Add Address
                      </Button>
                    </MenuItem>
                  ) : (
                    appState.addresses.map((address, index) => (
                      <MenuItem key={index} value={address.id}>
                        {address.street}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h4">
                Total Price:{appState.totalCartPrice} $
              </Typography>
            </Grid>
            <Grid item>
              <Grid container>
                <Grid item xs={6}>
                  <div className={`text-start`}>
                    <Button
                      onClick={() => {
                        updateCart()
                      }}
                      variant="text"
                      className="text-red-800 px-10 py-5 my-20"
                    >
                      <ArrowBackIcon
                        fontSize="large"
                        className="text-red-800 mx-5"
                      />
                      <Typography variant="h4" className="">
                        Go Back
                      </Typography>
                    </Button>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className={`text-end`}>
                    <Button
                      onClick={handlePlaceOrder}
                      variant="text"
                      disabled={addressId == 0 || appState.cart.length < 1}
                      className={`${
                        addressId == 0 ? 'text-gray-600' : 'text-red-800'
                      } px-10 py-5 my-20`}
                    >
                      <Typography variant="h4" className="">
                        Place Order
                      </Typography>
                      <ArrowForwardIcon fontSize="large" className="mx-5" />
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </List>
      </div>
    </Page>
  )
}
export default PlaceOrder
