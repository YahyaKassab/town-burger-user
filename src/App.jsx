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
import axios from 'axios'

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
      phoneNumber: localStorage.getItem('userNumber'),
      email: localStorage.getItem('userEmail'),
    },
    cartId: 0,
    cart: { id: 0, items: [] },
    menu: [],
    totalCartPrice: 0,
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
        if (draft.cart.items.length < 1) {
          draft.cart.items.push(action.value)
          console.log('length 0')
          return
        } else {
          console.log('length >')
          const cartItemIndex = draft.cart.items.findIndex(
            (cartItem) => cartItem.item.id == action.value.item.id
          )
          if (cartItemIndex != -1) {
            draft.cart.items[cartItemIndex].quantity += action.value.quantity
          } else {
            draft.cart.items.push(action.value)
          }
          return
        }
      case 'addAddress':
        draft.addresses.push(action.value)
        return
      case 'setAddresses':
        draft.addresses = action.value
        return
      case 'setCart':
        draft.cart = action.value
        draft.cartId = action.value.id
        return
      case 'setMenu':
        draft.menu = action.value
        return
      case 'removeFromCart':
        draft.cart.items.splice(action.value, 1)
        return
      case 'editFromCart':
        edit(draft.cart, action.value.index, action.value.newValue)
        return
      case 'increaseQuantity':
        draft.cart.items[action.value].quantity++
        return
      case 'decreaseQuantity':
        if (draft.cart.items[action.value].quantity > 0)
          draft.cart.items[action.value].quantity--
        return
      case 'descriptionChange':
        draft.cart.items[action.value.index].description =
          action.value.description
        return
      case 'ensurePrice':
        draft.totalCartPrice = 0
        draft.cart.items.map((cartItem) => {
          draft.totalCartPrice += cartItem.quantity * cartItem.item.price
        })
        return
    }
  }
  const [state, dispatch] = useImmerReducer(appReducer, initial)
  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem('userToken', state.user.token)
      localStorage.setItem('userId', state.user.id)
      localStorage.setItem('userFullName', state.user.fullName)
      localStorage.setItem('userNumber', state.user.phoneNumber)
      localStorage.setItem('userEmail', state.user.email)
      console.log(state.user)
      console.log(state.cart)
    } else {
      localStorage.removeItem('userToken')
      localStorage.removeItem('userId')
      localStorage.removeItem('userFullName')
      localStorage.removeItem('userNumber')
      localStorage.removeItem('userEmail')
    }
  }, [state.loggedIn])

  useEffect(() => {
    if (!state.loggedIn) {
      return
    }
    //Check the token
    const checkToken = async () => {
      const response = await axios
        .get(`/User/CheckToken?token=${state.user.token}`)
        .then((res) => {
          console.log(res.data)
          //if expired
          if (!res.data) {
            dispatch({ type: 'logout' })
            message.warning('Your Session has expired')
          }
        })
        .catch((res) => {
          console.log('Error checking the token')
          console.log(res)
        })
    }
    checkToken()
  }, [])

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
                <Route path="/profile" element={<Profile />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/addresses" element={<Addresses />} />
                <Route path="/add-address" element={<AddAddress />} />
                <Route path="/:addressid/edit" element={<EditAddress />} />
                <Route path="/:orderid/track" element={<TrackOrder />} />
                <Route path="/place-order" element={<PlaceOrder />} />
              </Routes>
            </Page>
          </MessageContext.Provider>
        </DispatchContext.Provider>
      </StateContext.Provider>
    </>
  )
}

export default App
