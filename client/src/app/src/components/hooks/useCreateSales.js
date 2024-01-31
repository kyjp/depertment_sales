import axios from 'axios'

export const useCreateSales = () => {
  const endpoint = 'http://localhost:9004/api/sales'
  const onClickCreateSales = async(data) => {
    for (let index = 0; index < data[0].length; index++) {
      const response = await axios.get('http://localhost:9004/api/csrftoken')
      axios.defaults.headers.common['X-CSRF-Token'] = response.data.csrf_token
      const queries = {
        department: data[0][index],
        year: Number(data[1][index]),
        sales: Number(data[2][index])
      }
      const res = await axios.get('http://localhost:9004/api/csrftoken', {
        withCredentials: true,
      })
      axios.defaults.headers.common['X-CSRF-Token'] = res.data.csrf_token
      axios.post(endpoint, queries, { withCredentials: true }).then(res => {
      }).catch(e => {
        console.log(e)
      })
    }
  }
  return {onClickCreateSales}
}
