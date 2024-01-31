import React, {useState} from 'react'

const Form = () => {
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: ''
  })
  const handleInputChange = (event) => {
    setForm({...form, [event.target.name]: event.target.value})
  }
  return (
    <>
      <form>
        <label htmlFor="name">
          名前
          <input
            id="name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleInputChange}
          />
        </label>
        <br/>
        <label htmlFor="age">
          年齢
          <select
            name="age"
            id="age"
            onChange={handleInputChange}
            value={form.age}
          >
            <option value={10}>10代</option>
            <option value={20}>20代</option>
            <option value={30}>30代</option>
          </select>
        </label>
        <br/>
        <label htmlFor="gender">
          性別
          <input
            type="radio"
            name="gender"
            id="male"
            onChange={handleInputChange}
          />男性
          <input
            type="radio"
            name="gender"
            id="female"
            onChange={handleInputChange}
          />女性
          <input
            type="radio"
            name="gender"
            id="other"
            onChange={handleInputChange}
          />その他
        </label>
      </form>
    </>
  )
}

export default Form
