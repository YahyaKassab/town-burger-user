import { Button, Divider, Grid, Typography } from '@mui/material'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import StateContext from '../../StateContext'

const Footer = () => {
  const navigate = useNavigate()
  const appState = useContext(StateContext)
  return (
    <>
      <hr />
      <div
        className="flex justify-between my-20"
        style={{ float: 'left', clear: 'both' }}
        // ref={appState.footerRef}
        id="footer"
      >
        <Grid container spacing={4}>
          {/* Contact us */}
          <Grid item md={4} xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h4">Contact us</Typography>
              </Grid>
              <Grid item xs={4}>
                <a href="https://www.facebook.com/townburger.eg">
                  <img
                    src="src\Components\Home Page\Icons\facebook-icon.png"
                    style={{ width: 80, height: 80 }}
                    alt=""
                  />
                </a>
              </Grid>
              <Grid item xs={4}>
                <img
                  src="src\Components\Home Page\Icons\Instagram-icon.png"
                  style={{ width: 90, height: 90 }}
                  alt=""
                />
              </Grid>
              <Grid item xs={4}>
                <img
                  src="src\Components\Home Page\Icons\Twitter-icon.png"
                  style={{ width: 100, height: 100 }}
                  alt=""
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4">
                  {' '}
                  Call us:
                  <a
                    href="tel:PHONE_NUM"
                    className="no-underline font-bold ml-2"
                  >
                    +201014150373
                  </a>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* Policies  */}
          <Grid item md={4} xs={12} className="mt-8">
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Link
                  to={'/policies'}
                  className="text-black no-underline text-center"
                >
                  <Typography variant="h6">Ordering Policies</Typography>
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Link
                  to={'/about-us'}
                  className="text-black no-underline  text-center"
                >
                  <Typography variant="h6">About Us</Typography>
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={4} xs={12}>
            <Button
              variant="contained"
              onClick={() => navigate('/add-review')}
              className="bg-red-800 px-10 py-5 font-bold mt-24 ml-28"
            >
              Add Review
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  )
}
export default Footer
