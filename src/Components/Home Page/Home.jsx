import React, { useEffect, useState } from 'react'
import Page from '../Page'
import './home.css'
import { Grid, Typography } from '@mui/material'
import ImageSlider from './ImageSlider'
import OtherBurgers from './OtherBurgers'
import Divider from '@mui/material/Divider'
import MostFamous from './MostFamous'
import Footer from './Footer'
import SpecialOffers from './SpecialOffers'
import axios from 'axios'
export default function Home() {
  const [isFetching, setIsFetching] = useState(true)
  const [slides, setSlides] = useState([
    {
      item1: {
        id: 2,
        title: '',
        description: '',
        type: '',
        price: 30,
      },
    },
    {
      item1: {
        id: 2,
        title: '',
        description: '',
        type: '',
        price: 30,
      },
    },
  ])
  useEffect(() => {
    const fetch = async () => {
      await axios
        .get(
          `/orders/GetMostOrderedByType?type=${'beef burger'.replace(
            ' ',
            '%20'
          )}`
        )
        .then((res) => {
          console.log('fetch most ordered beef success')
          setSlides(res.data.result)
          setIsFetching(false)
        })
        .catch((res) => {
          console.log('fetch most ordered beef failed')
          console.log(res)
        })
        .finally(() => {})
    }
    fetch()
  }, [])

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
            <ImageSlider slides={slides} isFetching={isFetching} />
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
