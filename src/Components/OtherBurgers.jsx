import React, { useState } from "react"
import { Grid, Typography } from "@mui/material"

const OtherBurgers = () => {
  return (
    <>
      <Grid
        container
        spacing={3}
        // direction={"column"}
        flexWrap
        className="mt-1"
      >
        <Grid item lg={12} md={6} xs={12}>
          <div className="relative">
            <Typography
              variant="overline"
              className=" absolute font-bold text-white top-3 left-3"
            >
              Classic Chicken Burger
            </Typography>
            <img
              src="SliderImages\burger2.jpg"
              className=""
              width={"100%"}
              alt=""
            />
          </div>
        </Grid>
        <Grid item lg={12} md={6} xs={12}>
          <div className="relative">
            <Typography
              variant="overline"
              className="hidden sm:block absolute font-bold text-white top-3 left-3"
            >
              Delicious Black Burger
            </Typography>
            <img
              src="SliderImages\burger3.jpg"
              className="hidden sm:block"
              width={"100%"}
              alt=""
            />
          </div>
        </Grid>
      </Grid>
      {/* <div className="flex flex-col justify-center space-y-3">
        <div className="bg-red-900 w-10 h-12"></div>
        <div
          className="bg-black"
        ></div>
      </div> */}
    </>
  )
}
export default OtherBurgers
