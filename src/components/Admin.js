import React, {useState, useEffect} from 'react'
import { getAllUsers } from '../services/user.service'

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