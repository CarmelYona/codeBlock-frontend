import { IoTrashBin } from "react-icons/io5";


export const CodeBlockPreview = (props) => {
    const { codeBlock, setCodeBlockId, removeCodeBlock } = props
    return (
        <div className="code-block-preview flex column" onClick={() => setCodeBlockId(codeBlock._id)}>
            <h4>{codeBlock.name}</h4>
            <button className="btn remove-btn" onClick={(ev) => removeCodeBlock(ev, codeBlock._id)}><IoTrashBin />
            </button>
        </div>
    )
}