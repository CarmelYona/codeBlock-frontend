import { useEffect, useRef } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CodeBlockList } from "../cmps/codeBlock-list"
import { Header } from "../cmps/header"
import { UserModal } from "../cmps/user-modal"
import { userService } from "../services/user.service"
import { onAddLink, onRemoveLink } from "../store/action/link.actions"
import { socketService } from "../services/socket.service"
import { onLoadCodes, onRemoveCodeBlock } from "../store/action/codeBlock.action"
import { useOutsideClick } from '../hooks/useClickOutsideParent'
import { useNavigate } from "react-router-dom"

export function Lobby() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { codeBlocks } = useSelector((storeState) => storeState.codeBlockModule)
    const [users, setUsers] = useState(null)
    const [codeBlockId, setCodeBlockId] = useState(null)
    const { link } = useSelector((storeState) => storeState.linkModule)
    const parentRef = useRef(null)
    const wrapperRef = useRef(null)
    useOutsideClick(wrapperRef, setCodeBlockId, null, parentRef)

    useEffect(() => {

        socketService.off('create link', createLink)
        socketService.on('create link', createLink)
        loadCodeBlocks()
        loadUsers()

        return (() => {
            socketService.off('create link', createLink)
        })

    }, [])

    const loadUsers = async () => {
        const users = await userService.getUsers()
        setUsers(users)
    }

    const loadCodeBlocks = async () => {
        await dispatch(onLoadCodes())
    }

    const createLink = async (userId) => {
        await dispatch(onAddLink(`/:${userId}/:${codeBlockId}`))
    }

    const removeLink = async (linkId) => {
        if (linkId) await dispatch(onRemoveLink(linkId))
    }

    const addCodeBlock = () => {
        navigate('/addCodeBlock')
    }

    const removeCodeBlock = async (ev, codeBlockId) => {
        ev.stopPropagation()
        await dispatch(onRemoveCodeBlock(codeBlockId))
    }

    if (!codeBlocks && !users) return <div>Loading..</div>
    return <div className="main-page">
        <div ref={parentRef} className="page-body flex column">
            <Header />
            <section className="lobby-page flex column">
                <h1>Choose Code Block</h1>
                <CodeBlockList codeBlocks={codeBlocks} setCodeBlockId={setCodeBlockId} removeCodeBlock={removeCodeBlock} />
                {codeBlockId && <UserModal wrapperRef={wrapperRef} parentRef={parentRef} users={users} createLink={createLink} link={link} removeLink={removeLink} />}
                <div className="floating-add-btn">
                    <button onClick={() => addCodeBlock()} className="btn btn-add">+Add New</button>
                </div>
            </section>
        </div>
    </div >
}