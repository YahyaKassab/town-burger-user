import { useState } from "react"
import { Route, Routes } from "react-router"
import Home from "./Components/Home"
import Nav from "./Components/Nav/Nav"
import Page from "./Components/Page"
import Login from "./Components/Login"

function App() {
  const [count, setCount] = useState(0)

  return (
    <Page
      container={false}
      nav={false}
      title="Best Burger Restaurant in Ismailia"
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/t" element={<>rarrar</>} />
      </Routes>
    </Page>
  )
}

export default App
