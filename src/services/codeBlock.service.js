import { httpService } from './http.service'
import { socketService } from './socket.service'


export const codeBlockService = {
    getCodeBlocks,
    getById,
    updateCodeBlock,
    addCodeBlock,
    removeCodeBlock
}

window.us = codeBlockService

async function removeCodeBlock(id) {
    await httpService.delete(`codeBlock/${id}`)
}

async function getCodeBlocks() {
    let codeBlocks = await httpService.get('codeBlock')
    return codeBlocks
}

async function getById(id) {
    let codeBlock = await httpService.get(`codeBlock/${id}`)
    return codeBlock
}

async function updateCodeBlock(code) {
    const codeBlock = await httpService.put(`codeBlock/${code._id}`, code)
    socketService.emit('update code', codeBlock)
    return code
}

async function addCodeBlock(codeblock) {
    return await httpService.post(`codeBlock/add`, codeblock)
}