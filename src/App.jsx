import { createRef, useEffect, useRef, useState } from "react"
import { Route, Routes } from "react-router"
import Home from "./Components/Home Page/Home"
import Page from "./Components/Page"
import Login from "./Components/Login Page/Login"
import { useImmerReducer } from "use-immer"
import StateContext from "./StateContext"
import DispatchContext from "./DispatchContext"
import { toast, ToastContainer } from "react-toastify"
import CssBaseline from "@mui/material/CssBaseline"
import "react-toastify/dist/ReactToastify.css"
import MessageContext from "./MessageContext"
import Menu from "./Components/Menu page/Menu"
import Register from "./Components/Register Page/Register"
import Profile from "./Components/Profile Page/Profile"

function App() {
  // const footerRef = createRef()
  const error = (msg) => {
    toast.error(msg, {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    })
  }
  const warning = (msg) => {
    toast.warn(msg, {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    })
  }
  const success = (msg) => {
    toast.success(msg, {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    })
  }
  const info = (msg) => {
    toast.info(msg, {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    })
  }
  const message = { error, warning, success, info }

  useEffect(() => {}, [])
  const n = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  const edit = (array, index, value) => {
    const st = array.slice(0, index)
    const nd = array.slice(index + 1)
    console.log("nd:" + nd)
    st.push(value)
    const last = st.concat(nd)
    return last
  }

  const initial = {
    cart: [],
    // footerRef,
  }
  const appReducer = (draft, action) => {
    switch (action.type) {
      case "addToCart":
        if (
          draft.cart.findIndex(
            (meal) =>
              meal.meal.title.toLowerCase() ==
              action.value.meal.title.toLowerCase()
          ) != -1
        )
          draft.cart[
            draft.cart.findIndex(
              (meal) =>
                meal.meal.title.toLowerCase() ==
                action.value.meal.title.toLowerCase()
            )
          ].qty += action.value.qty
        else draft.cart.push(action.value)
        return
      case "removeFromCart":
        draft.cart.splice(action.value, 1)
        return
      case "editFromCart":
        edit(draft.cart, action.value.index, action.value.newValue)
        return
      case "increaseQty":
        draft.cart[action.value].qty++
        return
      case "decreaseQty":
        if (draft.cart[action.value].qty > 0) draft.cart[action.value].qty--
        return
    }
  }
  const [state, dispatch] = useImmerReducer(appReducer, initial)

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
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/profile/:number" element={<Profile />} />
              </Routes>
            </Page>
          </MessageContext.Provider>
        </DispatchContext.Provider>
      </StateContext.Provider>
    </>
  )
}

export default App
