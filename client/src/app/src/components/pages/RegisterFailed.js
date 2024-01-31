import { Box, Container, Typography } from "@mui/material"
import {useLocation, Link} from 'react-router-dom'

const RegisterFailed = () => {
  const { state } = useLocation()
  return (
    <div>
      <Container maxWidth='xs'>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            fireDirection: 'column',
            alignItems: 'center'
          }}
        />
        <Typography variant="h5">
          登録に失敗しました
        </Typography>
        <Typography variant="h5">
          管理者へご連絡ください
        </Typography>
        <Typography variant="h5">
          メールアドレス：{state.email}
        </Typography>
        <Typography variant="h5">
          パスワード：{state.password}
        </Typography>
        <Link to='/login'>ログイン画面へ</Link>
      </Container>
    </div>
  )
}

export default RegisterFailed
