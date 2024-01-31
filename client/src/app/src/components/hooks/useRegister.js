import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const useRegister = () => {
  const navigate = useNavigate()
  const register = (user) => {
    const endpoint = 'http://localhost:9004/api/register'
    const queries = { email: user.email, password: user.password }
    axios.post(endpoint, queries, {
      withCredentials: true,
    }).then(res => {
      navigate('/registersucceeded', { state: user })
    }).catch((e) => {
      console.log(e)
      navigate('/registerfailed', { state: user })
    })
  }
  return { register }
}
