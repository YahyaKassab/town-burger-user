import React, { useState } from "react"
import Page from "./Page"
import "./home.css"
import ImageSlider from "./ImageSlider"
export default function Home() {
  const [slides, setSlides] = useState([
    {
      url: "SliderImages\\burger1.jpg",
      title: "title",
      body: "body",
      action: "/login",
      position: "top-right",
    },
    {
      url: "SliderImages\\burger2.jpg",
      title: "title",
      body: "body",
      action: "/login",
      position: "top-left",
    },
    {
      url: "SliderImages\\burger3.jpg",
      title: "title",
      body: "body",
      action: "/login",
      position: "top-left",
    },
  ])
  return (
    <>
      <Page container={true} nav={true} title="home">
        <div className="flex flex-col lg:flex-row justify-between">
          <ImageSlider slides={slides} />
          <div className="">nigger</div>
        </div>
      </Page>
    </>
  )
}
