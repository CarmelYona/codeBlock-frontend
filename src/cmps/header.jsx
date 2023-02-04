import { useNavigate } from "react-router-dom"
import { TbBrandJavascript } from 'react-icons/tb'
import { userService } from "../services/user.service"

export const Header = () => {
    const navigate = useNavigate()
    const loggedInUser = userService.getLoggedinUser()

    const onLogout = async () => {
        await userService.logout()
        navigate('/')
    }

    return <header>
        <div className="header-wrapper flex">
            <h1 onClick={onLogout}>codeBlock <span><TbBrandJavascript /></span></h1>
            {loggedInUser ?
                <button className="loguot-btn" onClick={onLogout}>Logut</button>
                :
                <button className="mentor-btn" onClick={() => navigate('/login/mentor')} >Mentors</button>
            }

        </div>
    </header>
}