import { CodeBlockPreview } from "./codeBlock-preview"

export const CodeBlockList = (props) => {
    const { codeBlocks, setCodeBlockId } = props

    return (
        <section className="code-block-list flex ">
            {codeBlocks.map(codeBlock => <CodeBlockPreview codeBlock={codeBlock} key={codeBlock._id} setCodeBlockId={setCodeBlockId} />)}
        </section>
    )
}