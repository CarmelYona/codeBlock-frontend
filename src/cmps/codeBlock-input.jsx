import React from "react"
import Highlight from 'react-highlight'
import 'highlight.js/styles/github-dark.css'

const CodeBlockInputCmp = (props) => {
    const { code, updateCode } = props
    return (
        <div className="codeBlock-wrapper flex"
            onInput={updateCode}
            contentEditable={true}
            suppressContentEditableWarning={true}>
            <Highlight className="javascript">
                {code}
            </Highlight>
        </div>
    )
}
export const CodeBlockInput = React.memo(CodeBlockInputCmp, (prev, next) => {
    if (prev === undefined || next.length === 0) return false
    return true
})