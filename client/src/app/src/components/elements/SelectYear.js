import React, { useEffect, useState } from 'react'
import { Box, InputLabel, MenuItem, Select } from '@mui/material'
import axios from 'axios'

const SelectYear = (props) => {
  const [years, setYears] = useState([])
  useEffect(() => {
    const fecth = async () => {
      const response = await axios.get('http://localhost:9004/api/csrftoken')
      axios.defaults.headers.common['X-CSRF-Token'] = response.data.csrf_token
      const baseEndpoint = 'http://localhost:9004/api/sales/'
      const endpoint = `${baseEndpoint}`
      const res = await axios.get(endpoint, {
        withCredentials: true,
      })
      console.log(res)
      let temp = []
      for (let index = 0; index < res.data.length; index++) {
        const flg = temp.includes(res.data[index]['year'])
        if (!flg) {
          temp.push(res.data[index]['year'])
        }
      }
      setYears(temp)
    }
    fecth()
  }, [])

  const { handleYearChange } = props
  const handleChange = e => {
    handleYearChange(e.target.value)
  }
  return (
    <>
      <Box
        sx={{mt: 2, width: '100%'}}
      >
        <InputLabel
          id="sales-year"
        >
          年度
        </InputLabel>
        <Select
          labelId="sales-year"
          onChange={handleChange}
          fullWidth
          name="year"
          defaultValue={""}
        >
          {years.map(year =>
            <MenuItem value={year} key={year}>{year}</MenuItem>
          )}
        </Select>
      </Box>
    </>
  )
}

export default SelectYear
