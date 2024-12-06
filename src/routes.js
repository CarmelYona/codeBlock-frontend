import { AddCodeBlock } from './pages/add-codeBlock-page'
import { CodeBlock } from './pages/codeBlock-page'
import { HomePage } from './pages/home-page'
import { Login } from './pages/login-page'
import { Lobby } from "./pages/mentor-lobby-page"
import { Student } from './pages/student-lobby-page'

export default [
    {
        path: '/codeblock/:userId/:codeBlockId',
        element: <CodeBlock />
    },
    {
        path: '/student',
        element: <Student />
    },
    {
        path: '/login/:userId',
        element: <Login />
    },
    {
        path: '/lobby',
        element: <Lobby />
    },
    {
        path: '/addCodeBlock',
        element: <AddCodeBlock />
    },
    {
        path: '/',
        element: <HomePage />
    }
]