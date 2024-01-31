import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { LoginUserContext } from '../providers/LoginUserProvider'

export const useLogin = () => {
  const { setLoginUser, setIsLogined } = useContext(LoginUserContext)
  const navigate = useNavigate()
  const login = async (user) => {
    const res = await axios.get('http://localhost:9004/api/csrftoken')
    axios.defaults.headers.common['X-CSRF-Token'] = res.data.csrf_token
    const endpoint = 'http://localhost:9004/api/login'
    const queries = { email: user.email, password: user.password }
    axios.post(endpoint, queries, {
      withCredentials: true,
    }).then(res => {
      if (Object.keys(res.data).length > 0) {
        setLoginUser(user.email)
        setIsLogined(true)
        navigate('/', { state: { email: user.email } })
      } else {
        navigate('/loginfailed')
      }
    }).catch(e => {
      setLoginUser({ username: '', password: '' })
      navigate('/loginfailed')
    })
  }
  return { login }
}
