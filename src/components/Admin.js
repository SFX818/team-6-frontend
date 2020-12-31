import React, {useState, useEffect} from 'react'
import { getAllUsers } from '../services/user.service'
import { getCurrentUser } from '../services/auth.service'

// const Admin = () => {
//     const [currentUser, setCurrentUser] = useState(undefined)
//     const [content, setContent] = useState(undefined)

//     useEffect(()=> {
//         const user = getCurrentUser()
//         if(user) {
//           setCurrentUser(user)
//           getAllUsers().then(users => setContent(users))
//         }
//       }, [])

//     return (
//         <div>
//             Admin page
//             {currentUser ? (
//             <div>{currentUser.accessToken}</div>
//             ) : (
//                 <div>No Current User</div>
//             )}
//             {content ? (
//                 <div>
//                     <h2>All Users</h2>
//                     {console.log(content)}
//                 </div>
//             ) : (
//                 <div>No content to display</div>
//             )}
//         </div>
//     )
// }

const Admin = () => {
    const [content, setContent] = useState('')
    useEffect(() => {
        getAllUsers().then(response => {
            setContent(response.data)
            },
            (error) => {
                const _content =
                    (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
                setContent(_content);
              }
        )
    },[])
    return(
        <div>
            <h1>This better work</h1>
            {console.log(content)}
        </div>
    )
}

export default Admin