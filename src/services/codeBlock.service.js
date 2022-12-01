import { httpService } from './http.service'
import { socketService } from './socket.service'


export const codeBlockService = {
    getCodeBlocks,
    getById,
    updateCodeBlock
}

window.us = codeBlockService

async function getCodeBlocks() {
    let codeBlocks = await httpService.get('codeBlock')
    return codeBlocks
}

async function getById(id) {
    let codeBlock = await httpService.get(`codeBlock/${id}`)
    return codeBlock
}

async function updateCodeBlock(code){
    const codeBlock = await httpService.put(`codeBlock/${code._id}`,code)
    socketService.emit('update code', codeBlock)
    return code 
}