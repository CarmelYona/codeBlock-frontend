import React from "react"
import { javascript } from '@codemirror/lang-javascript'
import { githubDark } from '@uiw/codemirror-theme-github'
import CodeMirror from '@uiw/react-codemirror'
// import Highlight from 'react-highlight'
// import 'highlight.js/styles/github-dark.css'

const CodeBlockInputCmp = (props) => {
    const { code, updateCode } = props
    return (
        <div className="codeBlock-wrapper flex">
            <CodeMirror
                value={code}
                readOnly={false}
                extensions={[javascript()]}
                theme={githubDark}
                onChange={updateCode}
            />
        </div>
    )
}
export const CodeBlockInput = React.memo(CodeBlockInputCmp, (prev, next) => {
    if (prev === undefined || next.length === 0) return false
    return true
})