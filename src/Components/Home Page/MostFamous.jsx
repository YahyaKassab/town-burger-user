import { Button, Grid, Typography } from '@mui/material'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import MostFamousItem from './MostFamousItem'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useNavigate } from 'react-router'
import LoadingIcon from '../LoadingIcon'
import axios from 'axios'
import MessageContext from '../../MessageContext'
export default function MostFamous() {
  const message = useContext(MessageContext)
  const navigate = useNavigate()
  const [isFetching, setIsFetching] = useState(true)
  const [mostFamous, setMostFamous] = useState([])

  useEffect(() => {
    const fetch = async () => {
      await axios
        .get('/Orders/GetMostOrdered')
        .then((res) => {
          console.log(res.data)
          setMostFamous(res.data.result)
        })
        .catch((res) => {
          message.error('failed')
        })
        .finally(() => {
          setIsFetching(false)
        })
    }
    fetch()
  }, [])

  if (isFetching) return <LoadingIcon />
  return (
    <>
      <Grid container spacing={9} className="mb-5">
        <Grid item md={6} xs={12}>
          <Typography variant="h4" className="my-12">
            Our 3 Most Popular Burgers
          </Typography>
        </Grid>
        <Grid item md={6} xs={12}>
          <div className="text-end mt-8">
            <Button
              onClick={() => navigate('/menu')}
              variant="text"
              className=""
            >
              <Typography variant="h6" className=" text-red-800">
                See full menu
              </Typography>
              <ArrowForwardIcon
                fontSize="large"
                className="text-red-800 mx-5"
              />
            </Button>
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={4} className="mb-20">
        {mostFamous != null
          ? mostFamous.map((item, index) => (
              <Fragment key={index}>
                <Grid
                  item
                  className={index == 0 ? 'block' : 'hidden md:block'}
                  md={4}
                  sm={6}
                  xs={12}
                >
                  <MostFamousItem meal={item} />
                </Grid>
              </Fragment>
            ))
          : ''}
      </Grid>
    </>
  )
}
