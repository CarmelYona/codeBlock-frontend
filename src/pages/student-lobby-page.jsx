import Lottie from "lottie-web"
import { useRef, useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Header } from '../cmps/header'
import { socketService } from "../services/socket.service"
import { loadLink, onRemoveLink } from "../store/action/link.actions"

export const Student = () => {
    const dispatch = useDispatch()
    const { link } = useSelector((storeState) => storeState.linkModule)
    const [userId, setUserId] = useState(null)
    const container = useRef(null)

    useEffect(() => {
        socketService.off('update link', onLoadLink)
        socketService.on('update link', onLoadLink)

        Lottie.loadAnimation({
            container: container.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('../assets/animation/lottie-waiting.json'),
        })

        onLoadLink()
        return (() => {
            socketService.off('update link', onLoadLink)
        })

    }, [])

    useEffect(() => {
        cutUserId()
    }, [link])

    const onLoadLink = async () => {
        await dispatch(loadLink())
        chackLink()
    }

    //checking the link timeStemp to make sure its not old link.
    const chackLink = async () => {
        if ((link.timeStemp + 120000) < Date.now()) {
            await dispatch(onRemoveLink(link._id))
        }
    }

    // using the userId in the link for query params so we can use it in loginPage for auth. 
    const cutUserId = () => {
        const id = link?.url?.split('/')[1].slice(1, link.url.length)
        setUserId(id)
    }
    
    return <section className="main-page">
        <div className="page-body">
            <Header />
            <div className="student-lobby flex column">
                <h1>welcome !</h1>
                <h2>You are almost there,</h2>
                <h3>Your link will be revealed here:</h3>
                {(link && userId) &&
                    <div className="link flex column">
                        <a href={`/login/${userId}`}>Your Link</a>
                    </div>
                }
                <div className="container flex" ref={container}></div>
            </div>
        </div>
    </section>
}