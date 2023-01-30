import React, { useState } from "react"
import Page from "./Page"
import "./home.css"
import { Grid } from "@mui/material"
import ImageSlider from "./ImageSlider"
import OtherBurgers from "./OtherBurgers"
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
        {/* <div className="flex flex-col lg:flex-row justify-between">
          
        </div> */}
        <Grid container spacing={4}>
          <Grid item lg={8} xs={12}>
            <ImageSlider slides={slides} />
          </Grid>
          <Grid item lg={4} xs={12}>
            <OtherBurgers />
          </Grid>
        </Grid>
      </Page>
    </>
  )
}
