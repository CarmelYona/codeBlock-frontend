import { linkService } from "../../services/link.service"

export function loadLink() {
    return async dispatch => {
        try {
            const link = await linkService.getLink()
            dispatch({ type: 'SET_LINK', link })
            return link
        } catch (err) {
            console.log('LinkActions: err in loadLink', err)
        } finally {
            dispatch({ type: 'LOADING_DONE' })
        }
    }
}

export function onAddLink(newLink) {
    return async (dispatch) => {
        try {
            const link = await linkService.addLink(newLink)
            dispatch({type: 'SET_LINK', link })
            return link
        } catch (err) {
            console.log('Cannot add link', err)
        }
    }
}

export function onRemoveLink(linkId) {
    return async (dispatch) => {
        try {
             await linkService.removeLink(linkId)
             dispatch({type: 'SET_LINK',action: {} })
        } catch (err) {
            console.log('Cannot add link', err)
        }
    }
}
