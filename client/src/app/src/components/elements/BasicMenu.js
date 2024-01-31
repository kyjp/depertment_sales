import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const BasicMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleClickHome = () => {
    navigate('/')
  }
  const handleClickLogin = async () => {
    const response = await axios.get('http://localhost:9004/api/csrftoken')
    axios.defaults.headers.common['X-CSRF-Token'] = response.data.csrf_token
    const endpoint = 'http://localhost:9004/api/logout'
    const res = await axios.post(endpoint, {
      withCredentials: true,
    })
    document.location.reload()
    // navigate('/login')
  }
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color="inherit"
        edge="start"
      >
        MENU
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby':
          'basic-button'
        }}
      >
        <MenuItem onClick={handleClickHome}>ホーム</MenuItem>
        <MenuItem onClick={handleClickLogin}>ログアウト</MenuItem>
      </Menu>
    </div>
  )
}

export default BasicMenu
