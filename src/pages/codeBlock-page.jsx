import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { onLoadCode, onUpdateCode } from "../store/action/codeBlock.action"
import Highlight from 'react-highlight'
import { loadLink } from "../store/action/link.actions"
import 'highlight.js/styles/github-dark.css'
import { userService } from "../services/user.service"
import { socketService } from "../services/socket.service"
import { useState } from "react"
import React from "react"
import { UserMsg } from "../cmps/user-msg"
import { CodeBlockInput } from "../cmps/codeBlock-input"
import { Header } from "../cmps/header"


export const CodeBlock = () => {
    const dispatch = useDispatch()
    const loggedInUser = userService.getLoggedinUser()
    let { codeBlock } = useSelector((storeState) => storeState.codeBlockModule)
    const [userMsg, setUserMsg] = useState(null)

    useEffect(() => {

        socketService.off('update code', loadCodeBlock)
        socketService.on('update code', loadCodeBlock)
        loadCodeBlock()
        return (() => {
            socketService.off('update code', loadCodeBlock)
        })

    }, [])

    // usin the link to load the correct codeBlock
    const loadCodeBlock = async () => {
        const link = await dispatch(loadLink())
        const id = link.url?.split('/')[2].slice(1, link.url.length)
        await dispatch(onLoadCode(id))
    }

    //making deep copy of the state and updating it
    const updateCode = async (ev) => {
        const val = ev.target.textContent
        const copyCode = JSON.parse(JSON.stringify(codeBlock))
        if (!copyCode.code.length) return
        copyCode.code = val
        await dispatch(onUpdateCode(copyCode))
        checkSolution(copyCode)
    }

    const checkSolution = (codeToCheck) => {
        if (codeToCheck.code === codeToCheck.solution) {
            setUserMsg({ txt: 'You did it!, well done :)', type: 'success' })
            setTimeout(() => (setUserMsg(null)), 3000)
        }
    }

    if (!codeBlock) return <div>Loading code...</div>
    return (
        <section className="main-page">
            <div className="page-body codeBlock-page flex column">

                <Header />
                <div className="codeBlock-page-wrapper flex column">
                    <div className="codeBlock-page-header flex column">
                        <h1>{codeBlock.name}</h1>
                        <h3>Find The Problem In This JS Code:</h3>
                    </div>
                    {loggedInUser.isMentor ?
                        <div className="codeBlock-wrapper flex">
                            <Highlight className="javascript">
                                {codeBlock.code}
                            </Highlight>
                        </div>
                        :
                        <>
                            {codeBlock.code !== undefined ? <CodeBlockInput code={codeBlock.code} updateCode={updateCode} /> : <div> No Code Available Yet</div>}
                        </>
                    }
                </div>
            </div>
            <UserMsg msg={userMsg} />
        </section>
    )
}