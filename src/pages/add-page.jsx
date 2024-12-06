import { javascript } from '@codemirror/lang-javascript'
import { githubDark } from '@uiw/codemirror-theme-github'
import CodeMirror from '@uiw/react-codemirror'
import React, { useEffect, useState } from "react"
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Header } from "../cmps/header"
import { codeBlockService } from "../services/codeBlock.service"
import { onAddCode } from '../store/action/codeBlock.action'


export const AddPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [codeBlock, setCodeBlock] = useState(null)

    useEffect(() => {
        setCodeBlock(codeBlockService.createEmptyCodeBlock())
    }, []);

    const handleChange = (ev, field) => {
        setCodeBlock((prevstate) => { return { ...prevstate, [field]: ev } })
    }

    const save = async () => {
        await dispatch(onAddCode(codeBlock))
        // navigate("/lobby")
    }

    if (!codeBlock) return <div>loading..</div>
    return <section className="main-page">
        <div className="page-body codeBlock-page flex column">

            <Header />
            <div className="codeBlock-page-wrapper flex column">
                <div className="codeBlock-page-header flex column">
                    <input
                        type="text"
                        value={codeBlock.name}
                        onChange={(ev) => handleChange(ev.target.value, "name")}
                    />
                    <h3>Find The Problem In This JS Code:</h3>
                </div>

                <div className="codeBlock-wrapper flex column">
                    <h5>Problem:</h5>
                    <CodeMirror
                        value={codeBlock.code}
                        readOnly={false}
                        extensions={[javascript()]}
                        theme={githubDark}
                        onChange={(ev) => handleChange(ev, 'code')}
                    />
                </div>
                <div className="codeBlock-wrapper flex column">
                    <h5>Solution:</h5>
                    <CodeMirror
                        value={codeBlock.solution}
                        readOnly={false}
                        extensions={[javascript()]}
                        theme={githubDark}
                        onChange={(ev) => handleChange(ev, 'solution')}
                    />
                </div>
                <button onClick={save}>Save</button>
                <button><Link to="/lobby">Back</Link></button>
            </div>
        </div>
    </section>
}