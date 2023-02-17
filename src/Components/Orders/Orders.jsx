import {
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  Typography,
} from '@mui/material'
import { Fragment, useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DispatchContext from '../../DispatchContext'
import StateContext from '../../StateContext'
import LoadingIcon from '../LoadingIcon'
import Page from '../Page'

const Orders = () => {
  const navigate = useNavigate()
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  const getDate = (date) => {
    const myDate = new Date(date)

    return `${myDate.getDate()}/${
      myDate.getMonth() + 1
    }/${myDate.getFullYear()}`
  }
  const getTime = (date) => {
    const myDate = new Date(date)
    return `${myDate.getHours()}:${myDate.getMinutes()}`
  }

  useEffect(() => {
    appDispatch({ type: 'fetchOrders' })
    console.log(appState.orders)
  }, [])

  useEffect(() => {
    if (!appState.ordersFetching) {
      console.log('orders from orders')
      console.log(appState.orders)
    }
  }, [appState.ordersFetching])

  if (appState.ordersFetching) return <LoadingIcon />
  return (
    <Page container={true} nav={true} title="My Orders">
      <Grid container direction={'column-reverse'} spacing={4}>
        <Grid item xs={12}>
          <List sx={{ width: '100%', marginTop: 10, marginLeft: 3 }}>
            {appState.orders.length == 0 ? (
              <h1 className="text-center text-red-800">
                No Orders Yet
                <Button
                  variant="contained"
                  className="bg-red-800 ml-5"
                  onClick={() => navigate('/menu')}
                >
                  Order Now
                </Button>
              </h1>
            ) : (
              appState.orders.map((order, index) => {
                console.log(order)
                const datePlaced = getDate(order.placedIn)
                const timePlaced = getTime(order.placedIn)
                const timeDelivered =
                  order.deliveredIn == null ? '' : getTime(order.deliveredIn)
                return (
                  <Fragment key={index}>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start" className="ml-12 my-10">
                      <Grid container spacing={4}>
                        <Grid item xs={1}>
                          {order.id}
                        </Grid>
                        <Grid item xs={3}>
                          <Typography variant="h3" className="mb-3">
                            Ordered on {datePlaced}
                            <span className="text-lg">
                              {' '}
                              {} <br /> at {timePlaced} <br />
                              to {appState.user.fullName} <br /> in{' '}
                              {order.address.street} street exactly{' '}
                              {order.address.details} <br />{' '}
                              {/* index {appState.orders.length}, {order.index} */}
                            </span>
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          md={6}
                          lg={6}
                          className="text-center"
                        >
                          <Grid container>
                            <Grid item xs={4}>
                              <Grid container>
                                <Grid item xs={12}>
                                  <Typography variant="h5">Meal</Typography>
                                  {order.cartItems.map((meal, index) => (
                                    <Typography
                                      key={index}
                                      variant="h5"
                                      className="my-3"
                                    >
                                      {meal.item.title}
                                    </Typography>
                                  ))}
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={2}>
                              <Grid container>
                                <Grid item xs={12}>
                                  <Typography variant="h5">Quantity</Typography>
                                  {order.cartItems.map((meal, index) => (
                                    <Typography
                                      key={index}
                                      variant="h5"
                                      className="my-3"
                                    >
                                      {meal.quantity}
                                    </Typography>
                                  ))}
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={6}>
                              <Grid container>
                                <Grid item xs={12}>
                                  <Typography variant="h5">
                                    Description
                                  </Typography>
                                  {order.cartItems.map((meal, index) => (
                                    <Typography
                                      key={index}
                                      variant="h5"
                                      className="my-3"
                                    >
                                      {meal.description}
                                    </Typography>
                                  ))}
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="h5" className="mt-3">
                              Total Price: {order.totalPrice} $
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid item lg={2} xs={8}>
                          <Typography variant="h5" className="text-center">
                            {order.state == 2 ? (
                              `Delivered on ${timeDelivered} `
                            ) : (
                              <Button
                                variant="contained"
                                className="bg-red-800 py-6 px-14 font-bold"
                                onClick={() => navigate(`/${index}/track`)}
                              >
                                Track Order
                              </Button>
                            )}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </Fragment>
                )
              })
            )}
          </List>
        </Grid>
      </Grid>
    </Page>
  )
}
export default Orders
