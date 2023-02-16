import React, { Fragment, useContext, useEffect, useState } from 'react'
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
import { Button, Grid, IconButton } from '@mui/material'
import DispatchContext from '../../DispatchContext'
import StateContext from '../../StateContext'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router'
import LoadingIcon from '../LoadingIcon'
import axios from 'axios'
import MessageContext from '../../MessageContext'

export default function Cart() {
  const appDispatch = useContext(DispatchContext)
  const message = useContext(MessageContext)
  const appState = useContext(StateContext)
  const [isFetching, setIsFetching] = useState(true)
  const navigate = useNavigate()
  const deleteFromCart = (index) => {
    appDispatch({ type: 'removeFromCart', value: index })
  }
  const [edit, setEdit] = useState(true)
  const totalPrice = (cart) => {
    let total = 0
    cart.map((item) => {
      total += item.price
    })
    return total
  }

  useEffect(() => {
    appDispatch({ type: 'fetchCart' })
    setIsFetching(false)
  }, [])

  const updateCart = async () => {
    console.log('cart')
    console.log(appState.cart)
    const response = await axios
      .put(`/Orders/UpdateCart`, appState.cart)
      .then((res) => {
        console.log(res.data)
        navigate('/place-order')
      })
      .catch((res) => {
        console.log(res)
        console.log('failed')
        updateCart()
      })
  }

  if (isFetching) return <LoadingIcon />

  return (
    <div className="justify-center ml-12">
      <Typography variant="h3" className="my-3 text-red-800 ">
        Cart
      </Typography>
      <List sx={{ width: '100%' }}>
        <Grid container direction={'column'}>
          {appState.cart.items.length > 0 ? (
            appState.cart.items.map((item, index) => {
              console.log('item:')
              console.log(item)
              return (
                <Fragment key={index}>
                  <ListItem alignItems="flex-start">
                    <Grid container spacing={1}>
                      <Grid item>
                        <ListItemAvatar>
                          <Avatar
                            alt="Remy Sharp"
                            src={`SliderImages\\${item.item.id}.jpg`}
                            sx={{ width: 120, height: 120 }}
                          />
                        </ListItemAvatar>
                      </Grid>
                      <Grid item>
                        <ListItemText
                          primary={
                            <Typography variant="h4" className="ml-3">
                              {item.item.title}
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
                                    deleteFromCart(index)
                                    appDispatch({ type: 'ensurePrice' })
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
                                          appDispatch({ type: 'ensurePrice' })
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
                                          appDispatch({ type: 'ensurePrice' })
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
                                          value: index,
                                        })
                                        setEdit(true)
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
                    </Grid>
                  </ListItem>

                  <Divider variant="inset" component="li" />
                </Fragment>
              )
            })
          ) : (
            <></>
          )}
          <Grid xs={12} item>
            <Typography variant="h5" className="my-5">
              Total Price:{' '}
              {appState.cart.items.length > 0 ? appState.totalCartPrice : 0} $
            </Typography>
          </Grid>
          <Grid xs={12} item>
            <div
              className={`text-end ${
                appState.cart.items.length == 0 ? 'hidden' : 'block'
              }`}
            >
              <Button
                onClick={updateCart}
                variant="text"
                className="text-red-800 px-10 py-5 my-20"
              >
                <Typography variant="h4" className="">
                  Continue
                </Typography>
                <ArrowForwardIcon
                  fontSize="large"
                  className="text-red-800 mx-5"
                />
              </Button>
            </div>
          </Grid>
        </Grid>
      </List>
    </div>
  )
}
