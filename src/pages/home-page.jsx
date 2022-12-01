import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Header } from "../cmps/header"
import lottie from 'lottie-web'
import { userService } from "../services/user.service"

export const HomePage = () => {
    const navigate = useNavigate()
    const loggedInUser = userService.getLoggedinUser()
    const container = useRef(null)

    useEffect(() => {
        if (loggedInUser) onLogout()

        lottie.loadAnimation({
            container: container.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('../assets/animation/lottie-background.json'),
        })

    }, [])

    const onLogout = async () => {
        await userService.logout()
    }
    return <section className="main-page">
        <div className="home-page page-body flex column">
            <Header />
            <div className="home-page-body flex">
                <div className="student-section flex column">
                    <h2>“Tell me and I forget, teach me and I may remember, involve me and I learn.” <br /> – Benjamin Franklin</h2>
                    <button className="student-btn" onClick={() => navigate('/student')}>Students</button>
                </div>
                <div className="container flex" ref={container}></div>
            </div>
        </div>
    </section>
}