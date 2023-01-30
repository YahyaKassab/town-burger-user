import { Grid, Typography } from "@mui/material"
import React, { useState } from "react"
import MostFamousItem from "./MostFamousItem"
export default function MostFamous() {
  const [mostFamous, setMostFamous] = useState([
    {
      image: "SliderImages\\burger2.jpg",
      title: "title",
      description: "descrition",
      action: "/login",
    },
    {
      image: "SliderImages\\burger2.jpg",
      title: "title",
      description: "descrition",
      action: "/login",
    },
    {
      image: "SliderImages\\burger2.jpg",
      title: "title",
      description: "descrition",
      action: "/login",
    },
  ])
  return (
    <>
      <Typography variant="h4" className="my-12">
        Our 3 Most Popular Burgers
      </Typography>
      <Grid container spacing={4}>
        <Grid item className="block" md={4} sm={6} xs={12}>
          <MostFamousItem meal={mostFamous[0]} />
        </Grid>
        <Grid item className="hidden md:block" md={4} sm={6} xs={12}>
          <MostFamousItem meal={mostFamous[1]} />
        </Grid>
        <Grid item className="hidden sm:block" md={4} sm={6} xs={12}>
          <MostFamousItem meal={mostFamous[2]} />
        </Grid>
      </Grid>
    </>
  )
}
