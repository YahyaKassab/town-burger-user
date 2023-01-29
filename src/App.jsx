import { useState } from "react"
import Nav from "./Components/Nav/Nav"
import Page from "./Components/Page"

function App() {
  const [count, setCount] = useState(0)

  return (
    <Page title="Best Burger Restaurant in Ismailia">
      <Nav />
    </Page>
  )
}

export default App
