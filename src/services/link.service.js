import { httpService } from './http.service'
import { socketService } from './socket.service'


export const linkService = {
    addLink,
    getLink,
    removeLink
}

window.us = linkService

async function getLink() {
    let link = await httpService.get('link')
    return link
}

async function addLink(url) {
    const newLink = { 
        url:url, 
        timeStemp: Date.now() 
    }
    const link = await httpService.post('link/add',newLink)
    socketService.emit('update link', link)
    return link
}

async function removeLink(linkId) {
    await httpService.delete(`link/${linkId}`)
}