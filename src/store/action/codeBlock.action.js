import { codeBlockService } from "../../services/codeBlock.service"

export function onLoadCode(codeBlockId) {
    return async dispatch => {
        try {
            const codeBlock = await codeBlockService.getById(codeBlockId)
            dispatch({ type: 'SET_CODE', codeBlock })
            return codeBlock
        } catch (err) {
            console.log('LinkActions: err in load code', err)
        }
    }
}

export function onLoadCodes() {
    return async dispatch => {
        try {
            const codeBlocks = await codeBlockService.getCodeBlocks()
            dispatch({ type: 'SET_CODES', codeBlocks })
            return codeBlocks
        } catch (err) {
            console.log('LinkActions: err in loading codes', err)
        }
    }
}

export function onRemoveCodeBlock(codeBlockId) {
    return async dispatch => {
        try {
            await dispatch({ type: 'REMOVE_CODEBLOCK', codeBlockId })
            await codeBlockService.removeCodeBlock(codeBlockId)
        } catch (err) {
            console.log('Cannot add code block', err)
        }
    }
}

export function onUpdateCode(code) {
    return async dispatch => {
        try {
            const codeBlock = await codeBlockService.updateCodeBlock(code)
            dispatch({ type: 'SET_CODE', codeBlock })
            return codeBlock
        } catch (err) {
            console.log('Cannot update code block', err)
        }
    }
}

