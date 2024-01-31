import axios from 'axios'

export const useReadSales = () => {
  const baseEndpoint = 'http://localhost:9004/api/sales/'

  const onClickReadSales = async (year) => {
    const response = await axios.get('http://localhost:9004/api/csrftoken')
    axios.defaults.headers.common['X-CSRF-Token'] = response.data.csrf_token
    const endpoint = `${baseEndpoint}${year}`
    const res = await axios.get(endpoint, {
      withCredentials: true,
    })
    console.log(res.data)
    return res.data
  }
  return {onClickReadSales}
}
