export const CodeBlockPreview = (props) => {
    const { codeBlock, setCodeBlockId } = props
    return (
        <div className="code-block-preview flex" onClick={()=>setCodeBlockId(codeBlock._id)}>
            <h4>{codeBlock.name}</h4>
        </div>
    )
}