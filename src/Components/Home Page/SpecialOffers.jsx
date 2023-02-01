import { Typography } from "@mui/material"
import React, { useState } from "react"
import { Link } from "react-router-dom"

const SpecialOffers = () => {
  return (
    <>
      <Link to={"/menu"}>
        <div
          style={{
            width: "100%",
            position: "relative",
          }}
        >
          <Typography
            className="absolute text-orange-400 top-4 left-5"
            variant="h1"
          >
            Special offer
          </Typography>
          <img
            src="SliderImages\burger1.jpg"
            width={"100%"}
            style={{ borderRadius: 10 }}
            alt=""
          />
        </div>
      </Link>
    </>
  )
}
export default SpecialOffers
