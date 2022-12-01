import { TiDelete } from 'react-icons/ti'

export const UserModal = (props) => {
    const { users, createLink, link, removeLink, wrapperRef, parentRef } = props
    return <div ref={wrapperRef} className="user-modal flex column">
        {link?.url && <div className="link flex"><a href={`codeBlock${link.url}`}>Link To codeBlock </a><div className="btn remove-btn flex" onClick={() => removeLink(link._id)}><TiDelete /></div></div>}

        {users.map(user => {
            if (user.isMentor) return
            return (<div ref={parentRef} className="btn user-card flex" onClick={() => createLink(user._id)} key={user._id}>
                <div className="btn user-btn">
                    {user.name}
                </div>
            </div>)

        })}</div>
}