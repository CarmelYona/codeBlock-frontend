import { useState } from "react"
import ReactCodeMirror from "@uiw/react-codemirror"
import { javascript } from '@codemirror/lang-javascript'
import { githubDark } from '@uiw/codemirror-theme-github'
import { Header } from "../cmps/header"
import { codeBlockService } from "../services/codeBlock.service"
import { useNavigate } from "react-router-dom"


export const AddCodeBlock = () => {
    const [codeBlock, setCodeBlock] = useState({ name: 'Choose New Name', code: 'const newCode = "hello world"', solution: 'const newCode = "hello world"' })
    const navigate = useNavigate()

    const addCodeBlock = async () => {
        const isAded = await codeBlockService.addCodeBlock(codeBlock)
        if (isAded) navigate('/lobby')
    }

    const handleChange = (innerText, field) => {
        setCodeBlock(prevState => ({ ...prevState, [field]: innerText }))
    }

    return (
        <section className="main-page add-codeblock-page flex column">
            <div className="page-body codeBlock-page flex column">
                <Header />
                <div className="codeBlock-page-wrapper flex column">
                    <div className="codeBlock-page-header flex column">
                        <h1 contentEditable suppressContentEditableWarning={true}
                            onBlur={(ev) => handleChange(ev.target.innerText, "name")} >{codeBlock.name}</h1>
                        <h3>Find The Problem In This JS Code:</h3>
                    </div>
                    <div className="codeBlock-wrapper flex column">
                        <h3>Problem:</h3>
                        <ReactCodeMirror
                            value={codeBlock.code}
                            readOnly={false}
                            extensions={[javascript()]}
                            theme={githubDark}
                            onChange={(ev) => handleChange(ev, "code")}
                        />
                        <h3>Solution:</h3>
                        <ReactCodeMirror
                            value={codeBlock.solution}
                            readOnly={false}
                            extensions={[javascript()]}
                            theme={githubDark}
                            onChange={(ev) => handleChange(ev, "solution")}
                        />
                    </div>
                    <button onClick={addCodeBlock} className="btn save-btn">+ Add</button>
                    <button onClick={() => navigate('/lobby')}>{'<- Back'}</button>
                </div>
            </div>
        </section>
    )
}