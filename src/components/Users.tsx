import React, {useEffect} from 'react'

import {useUsers} from '../hooks/useUsers'

export const Users = () => {

    const { dataUsersGet, users, deleteUser } = useUsers()

    useEffect(() => {
        dataUsersGet()
    }, [])


const handleDelete=(uid:String)=>{
    deleteUser(uid)
}
    
  return (
    <div>
        <h3>usuarios:</h3>
        {users.usuarios?.map((el, i)=>(
            <p key={i+'!@#'}>{el.nombre}<button onClick={()=>handleDelete(el.uid)}>Eliminar</button></p>
        ))}
    </div>
  )
}
