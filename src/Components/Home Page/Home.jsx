import React, { useState } from "react"
import Page from "../Page"
import "./home.css"
import { Grid, Typography } from "@mui/material"
import ImageSlider from "./ImageSlider"
import OtherBurgers from "./OtherBurgers"
import Divider from "@mui/material/Divider"
import MostFamous from "./MostFamous"
import Footer from "./Footer"
import SpecialOffers from "./SpecialOffers"
export default function Home() {
  const [slides, setSlides] = useState([
    {
      url: "SliderImages\\burger1.jpg",
      title: "title1",
      body: "body1",
      action: "/login",
      position: "top-right",
    },
    {
      url: "SliderImages\\burger2.jpg",
      title: "title2",
      body: "body2",
      action: "/login",
      position: "top-left",
    },
    {
      url: "SliderImages\\burger3.jpg",
      title: "title3",
      body: "body3",
      action: "/login",
      position: "bottom-left",
    },
    {
      url: "SliderImages\\burger3.jpg",
      title: "title4",
      body: "body4",
      action: "/login",
      position: "bottom-right",
    },
  ])
  return (
    <>
      <Page container={true} nav={true} title="home">
        {/* <div className="flex flex-col lg:flex-row justify-between">
          
        </div> */}
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <SpecialOffers />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" className="my-5 ml-10">
              Our Most Popular Beef burger dishes
            </Typography>
          </Grid>
          <Grid item lg={8} xs={12}>
            <ImageSlider slides={slides} />
          </Grid>
          <Grid item lg={4} xs={12}>
            <OtherBurgers />
          </Grid>
          <Divider />
          <Grid item xs={12}>
            <MostFamous />
          </Grid>
        </Grid>
        <Footer />
      </Page>
    </>
  )
}
