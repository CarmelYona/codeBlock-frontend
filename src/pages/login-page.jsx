import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import { Link, useParams } from "react-router-dom"
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import { userService } from '../services/user.service'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { loadLink } from '../store/action/link.actions'
import { UserMsg } from '../cmps/user-msg'

const theme = createTheme()

export function _Login() {
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()
    const { userId } = params
    const { link } = useSelector((storeState) => storeState.linkModule)
    const [userMsg, setUserMsg] = useState(null)

    useEffect(() => {
        onLoadLink()
    }, [])

    const onLoadLink = async () => {
        await dispatch(loadLink())
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const credentials = {
            username: data.get('email'),
            password: data.get('password'),
        }
        const user = await userService.login(credentials)
        maintainEntrance(user)
    }

    // maintaining entrance by validating the user
    const maintainEntrance = (user) => {

        console.log(userId)
        if (userId === 'mentor') {
            // by mentor entrance, checking if does a mentor 
            if (user.isMentor) {
                navigate('/lobby')
            } else {
                setUserMsg({ txt: 'Failed To Login, not a mentor', type: 'fail' })
                setTimeout(() => (setUserMsg(null)), 3000)
                return
            }
        } else {
            // by studetnt entrance, checking if the correct user 
            if (user._id !== userId) {
                setUserMsg({ txt: 'Failed To Login, Wrong User', type: 'fail' })
                setTimeout(() => (setUserMsg(null)), 3000)
            }
            else {
                navigate(`/codeBlock${link.url}`)
            }
        }
    }


    return (
        <div className="main-page">
            <div className="page-body">

                <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                                <Grid container>

                                    <Grid item>
                                        <Link to="/" >
                                            Back To Home Page
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            </div>
            <UserMsg msg={userMsg} />
        </div>
    )
}

function mapStateToProps(storeState) {
    return {
    }
}
const mapDispatchToProps = {
    // onLogin,
}

export const Login = _Login
