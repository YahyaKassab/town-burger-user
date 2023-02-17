import { Grid, Typography } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import LoadingIcon from './LoadingIcon'
import Page from './Page'

const OrderingPolicies = () => {
  const [isFetching, setIsFetching] = useState(true)
  const [policies, setPolicies] = useState('')

  useEffect(() => {
    const fetch = async () => {
      await axios
        .get('/Customer/GetPolicies')
        .then((res) => {
          console.log(res.data.message)
          console.log(res.data)
          setPolicies(res.data.result)
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
    <Page nav={true} container={true} title={'Ordering Policies'}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h4">{policies}</Typography>
        </Grid>
      </Grid>
    </Page>
  )
}
export default OrderingPolicies
