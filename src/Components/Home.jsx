import React, { useState } from "react"
import Page from "./Page"
import "./home.css"
export default function Home() {
  const [left1, setLeft1] = useState(false)
  const [left2, setLeft2] = useState(false)
  const [right1, setRight1] = useState(false)
  const [right2, setRight2] = useState(false)
  const [click2Count, setClick2Count] = useState(0)
  const [click3Count, setClick3Count] = useState(0)

  const handleI1 = () => {
    setClick1Count(click1Count + 1)
    //always go and bring 2
    setLeft1(true)
  }
  const handleI2 = () => {
    setClick2Count(click2Count + 1)
    if (click2Count % 2 == 0) {
      //even = bring 1
      setRight1(true)
    } else {
      //odd = go bring 3
      setLeft2(true)
    }
  }
  const handleI3 = () => {
    setClick3Count(click3Count + 1)
    setRight2(true)
  }
  return (
    <>
      <Page container={false} nav={true} title="home">
        <div width="100%" className="flex relative">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKj3Rqg4DG4YbF6zLQtlvdfm3nedLzY_EpIvO9Tsf36g8FEy3atmRw5mrNxT6_R1evC08&usqp=CAU"
            onClick={() => handleI3()}
            width="100%"
            className={`img3`}
            alt=""
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ5GDYMXg1v7qytfrAFCJNMWP_uFwfmPz6GL2alu6g&s"
            width="100%"
            onClick={() => handleI2()}
            className={`img2 ${left2 ? "left" : ""}${right2 ? "right" : ""}`}
            alt=""
          />
          <img
            src="https://img.freepik.com/free-photo/front-view-burger-with-egg-copy-space_23-2148678844.jpg?w=826&t=st=1675038838~exp=1675039438~hmac=9af0bf3d5601b44ee4b58c01b974546ec8d76e4f680d54b9b0339556c0944892"
            onClick={() => handleI1()}
            className={`img1 ${left1 ? "left" : ""}${right1 ? "right" : ""}`}
            width="100%"
            alt=""
          />
        </div>
      </Page>
    </>
  )
}
