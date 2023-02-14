import { Button, Grid, TextField } from '@mui/material'
import axios from 'axios'
import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import MessageContext from '../../MessageContext'
import Page from '../Page'

const ResetPassword = () => {
  const message = useContext(MessageContext)
  const navigate = useNavigate()
  const { email } = useParams()
  const { token } = useParams()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showp, setShowp] = useState(false)
  const [showc, setShowc] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password == confirmPassword) {
      const result = await axios
        .post('/user/resetpassword', {
          email,
          password,
          token,
        })
        .catch((res) => {
          message.error(res.response.data.message)
        })

      if (result.data) {
        console.log(result.data)
        message.success(result.data.message)
        navigate('/')
      }
    } else {
      message.error('Passords not matching')
    }
  }
  return (
    <Page nav={true} container={true} title="Reset Password">
      <Grid container spacing={4} className="text-center justify-center mt-16">
        <Grid item xs={12}>
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            type={showp ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={() => setShowp(!showp)} variant="text">
            {showp ? 'Hide' : 'Show'}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="confirmPassword"
            label="Confirm Password"
            variant="outlined"
            type={showc ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button onClick={() => setShowc(!showc)} variant="text">
            {showc ? 'Hide' : 'Show'}
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} className="text-center">
        <Button
          variant="contained"
          className="bg-black mt-5 text-white px-3 py-5"
          onClick={handleSubmit}
        >
          Reset Password
        </Button>
      </Grid>
    </Page>
  )
}
export default ResetPassword
