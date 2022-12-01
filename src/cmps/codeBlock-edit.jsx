import Highlight from "react-highlight"

export const CodeBlockEdit = (props) => {
    const { codeBlock, updateCode } = props
    const codeCopy = JSON.parse(JSON.stringify(codeBlock))

    return (
        <div
            type="text"
            className="codeBlock-wrapper flex"
            suppressContentEditableWarning={true}
            contentEditable={true}
            onInput={updateCode}>
            <Highlight className="javascript">
                {codeCopy.code}
            </Highlight>
        </div>
    )
}