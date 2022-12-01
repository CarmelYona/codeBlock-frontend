import { useEffect } from "react"

export const UserMsg = (props) => {
    let { msg } = props

    useEffect(() => {
        setTimeout(() => (msg = ''), 2000)
    }, [msg])

    if (!msg) return
    return <div className={'user-msg ' + msg.type}>
        <p>{msg.txt}</p>
    </div>
}