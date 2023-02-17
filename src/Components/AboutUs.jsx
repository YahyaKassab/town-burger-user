import { Grid, Typography } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import LoadingIcon from './LoadingIcon'
import Page from './Page'

const AboutUs = () => {
  const [isFetching, setIsFetching] = useState(true)
  const [aboutUs, setAboutUs] = useState('')

  useEffect(() => {
    const fetch = async () => {
      await axios
        .get('/Customer/GetAboutUs')
        .then((res) => {
          console.log(res.data.message)
          console.log(res.data)
          setAboutUs(res.data.result)
        })
        .catch((res) => {
          console.log('fetch failed')
          console.log(res)
        })
        .finally(() => {
          setIsFetching(false)
        })
    }
    fetch()
  }, [])

  if (isFetching) return <LoadingIcon />
  return (
    <Page nav={true} container={true} title={'Add Your Complaint'}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h4">{aboutUs}</Typography>
        </Grid>
      </Grid>
    </Page>
  )
}
export default AboutUs
