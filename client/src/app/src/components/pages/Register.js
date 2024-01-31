import { useState } from 'react'
import { Container, Box, Typography, TextField, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useRegister } from '../hooks/useRegister'

const Register = () => {
  const { register } = useRegister()
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const handleChange = e => {
    const { name, value } = e.target
    setUser({...user, [name]: value})
  }
  const onClickRegister = () => {
    register(user)
  }
  return (
    <>
      <Container maxWidth='xs'>
        <Box sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <Typography variant='h5'>ユーザー登録画面</Typography>
          <TextField
            margin='normal'
            required
            fullWidth
            name='email'
            label='メールアドレス'
            id='email'
            onChange={handleChange}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='パスワード'
            id='password'
            autoComplete='current-password'
            onChange={handleChange}
          />
          <Button
            fullWidth
            color='error'
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            onClick={onClickRegister}
          >
            登録
          </Button>
          <Link to='/login'>登録済み</Link>
        </Box>
      </Container>
    </>
  )
}

export default Register
