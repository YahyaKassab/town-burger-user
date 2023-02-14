import { createRef, useEffect, useRef, useState } from 'react'
import { Route, Routes } from 'react-router'
import Home from './Components/Home Page/Home'
import Page from './Components/Page'
import Login from './Components/Login Page/Login'
import { useImmerReducer } from 'use-immer'
import StateContext from './StateContext'
import DispatchContext from './DispatchContext'
import { toast, ToastContainer } from 'react-toastify'
import CssBaseline from '@mui/material/CssBaseline'
import 'react-toastify/dist/ReactToastify.css'
import MessageContext from './MessageContext'
import Menu from './Components/Menu page/Menu'
import Register from './Components/Register Page/Register'
import Profile from './Components/Profile Page/Profile'
import Orders from './Components/Orders/Orders'
import PlaceOrder from './Components/Orders/PlaceOrder'
import ForgotPassword from './Components/Login Page/ForgotPassword'
import AboutUs from './Components/AboutUs'
import OrderingPolicies from './Components/OrderingPolicies'
import AddComplaint from './Components/Complaint/AddComplaint'
import TrackOrder from './Components/Orders/TrackOrder'
import AddAddress from './Components/Addresses Page/AddAddress'
import Addresses from './Components/Addresses Page/Addresses'
import EditAddress from './Components/Addresses Page/EditAddress'
import EmailConfirmed from './Components/Register Page/EmailConfirmed'
import ResetPassword from './Components/Register Page/ResetPassword'

function App() {
  // const footerRef = createRef()
  const error = (msg) => {
    toast.error(msg, {
      position: 'top-left',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })
  }
  const warning = (msg) => {
    toast.warn(msg, {
      position: 'top-left',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })
  }
  const success = (msg) => {
    toast.success(msg, {
      position: 'top-left',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })
  }
  const info = (msg) => {
    toast.info(msg, {
      position: 'top-left',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })
  }
  var today = new Date()
  const message = { error, warning, success, info }

  const n = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  const edit = (array, index, value) => {
    const st = array.slice(0, index)
    const nd = array.slice(index + 1)
    st.push(value)
    const last = st.concat(nd)
    return last
  }

  const initial = {
    loggedIn: localStorage.getItem('userToken'),
    user: {
      id: localStorage.getItem('userId'),
      token: localStorage.getItem('userToken'),
      firstName: localStorage.getItem('userFullName'),
      expire: localStorage.getItem('userExpire'),
      phoneNumber: localStorage.getItem('userNumber'),
      email: localStorage.getItem('userEmail'),
    },
    cart: { id: 0, items: [{}] },
    orders: [],
    addresses: [],
  }
  const appReducer = (draft, action) => {
    switch (action.type) {
      case 'login':
        draft.user = action.value
        draft.loggedIn = true
        return
      case 'logout':
        draft.loggedIn = false
        return
      case 'addToCart':
        if (
          draft.cart.items.findIndex(
            (meal) =>
              meal.meal.title.toLowerCase() ==
              action.value.meal.title.toLowerCase()
          ) != -1
        ) {
          draft.cart.items[
            draft.cart.items.findIndex(
              (meal) =>
                meal.meal.title.toLowerCase() ==
                action.value.meal.title.toLowerCase()
            )
          ].qty += action.value.qty

          draft.cart.items[
            draft.cart.items.findIndex(
              (meal) =>
                meal.meal.title.toLowerCase() ==
                action.value.meal.title.toLowerCase()
            )
          ].price =
            draft.cart.items[
              draft.cart.items.findIndex(
                (meal) =>
                  meal.meal.title.toLowerCase() ==
                  action.value.meal.title.toLowerCase()
              )
            ].qty *
            draft.cart.items[
              draft.cart.items.findIndex(
                (meal) =>
                  meal.meal.title.toLowerCase() ==
                  action.value.meal.title.toLowerCase()
              )
            ].meal.price
        } else draft.cart.items.push(action.value)
        return
      case 'setCart':
        draft.cart = action.value
        return
      case 'removeFromCart':
        draft.cart.items.splice(action.value, 1)
        return
      case 'editFromCart':
        edit(draft.cart.items, action.value.index, action.value.newValue)
        return
      case 'increaseQty':
        draft.cart.items[action.value].qty++
        return
      case 'decreaseQty':
        if (draft.cart.items[action.value].qty > 0)
          draft.cart.items[action.value].qty--
        return
      case 'addOrder':
        draft.orders.push(action.value)
        draft.cart.items = []
        return
      case 'descriptionChange':
        draft.cart.items[action.value.index].description =
          action.value.description
        return
      case 'orderStep':
        draft.orders[action.value.index].state = action.value.step
        if (draft.orders[action.value.index].state == 3) {
          draft.orders[action.value.index].dateDelivered = {
            hour:
              today.getHours() < 13
                ? today.getHours() == 0
                  ? 12
                  : today.getHours()
                : today.getHours() - 12,
            minute:
              today.getMinutes().toString().length == 1
                ? '0' + today.getMinutes()
                : today.getMinutes(),
            day: today.getHours() < 13,
          }
        }
        return
      case 'addAddress':
        draft.addresses.push(action.value)
        return
      case 'editAddress':
        draft.addresses[action.value.index] = action.value.data
        return
      case 'deleteAddress':
        draft.addresses.splice(action.value, 1)
        return
      case 'ensurePrice':
        draft.cart.items[action.value].price =
          draft.cart.items[action.value].qty *
          draft.cart.items[action.value].meal.price
        return
    }
  }
  const [state, dispatch] = useImmerReducer(appReducer, initial)
  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem('userToken', state.user.token)
      localStorage.setItem('userId', state.user.id)
      localStorage.setItem('userExpire', state.user.expireDate)
      localStorage.setItem('userFullName', state.user.fullName)
      localStorage.setItem('userNumber', state.user.phoneNumber)
      localStorage.setItem('userEmail', state.user.email)
      console.log(state.user)
    } else {
      localStorage.removeItem('userToken')
      localStorage.removeItem('userExpire')
      localStorage.removeItem('userId')
      localStorage.removeItem('userFullName')
      localStorage.removeItem('userNumber')
      localStorage.removeItem('userEmail')
    }
  }, [state.loggedIn])

  return (
    <>
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          <MessageContext.Provider value={message}>
            <CssBaseline />
            <Page
              container={false}
              nav={false}
              title="Best Burger Restaurant in Ismailia"
            >
              <ToastContainer
                position="top-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
              />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<>Not Found</>} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/email-confirmed" element={<EmailConfirmed />} />
                <Route
                  path="/reset-password/:email/:token"
                  element={<ResetPassword />}
                />
                <Route path="/add-complaint" element={<AddComplaint />} />
                <Route path="/policies" element={<OrderingPolicies />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot" element={<ForgotPassword />} />
                <Route path="/register" element={<Register />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/profile/:number" element={<Profile />} />
                <Route path="/:number/orders" element={<Orders />} />
                <Route path="/:number/addresses" element={<Addresses />} />
                <Route path="/:number/add-address" element={<AddAddress />} />
                <Route path="/:number/:index/edit" element={<EditAddress />} />
                <Route path="/:index/track" element={<TrackOrder />} />
                <Route path="/:number/place-order" element={<PlaceOrder />} />
              </Routes>
            </Page>
          </MessageContext.Provider>
        </DispatchContext.Provider>
      </StateContext.Provider>
    </>
  )
}

export default App
