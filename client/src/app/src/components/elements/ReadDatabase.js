import React, { useEffect } from 'react'
import { useReadSales } from '../hooks/useReadSales'

const ReadDatabase = props => {
  const { year, handleDataChange } = props
  const { onClickReadSales } = useReadSales()

  useEffect(() => {
    if (year === '') return
    const promise = onClickReadSales(year)
    let array = []
    let arrayDepartment = []
    let arrayYear = []
    let arraySales = []

    promise.then(data => {
      if (data.length > 0) {
        arrayDepartment.push('department')
        arrayYear.push('year')
        arraySales.push('sales')
        for (let index = 0; index < data.length; index++) {
          arrayDepartment.push(data[index].department)
          arrayYear.push(data[index].year)
          arraySales.push(data[index].sales)
        }
        array.push(arrayDepartment)
        array.push(arrayYear)
        array.push(arraySales)
        handleDataChange(array)
      }
    })
  }, [year])

  return (
    <div></div>
  )
}

export default ReadDatabase
