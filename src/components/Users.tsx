import React, {useEffect} from 'react'

import {useUsers} from '../hooks/useUsers'

export const Users = () => {
    const character = {
        display: "block",
        border: "2px solid salmon",
        padding: "10px",
        width: "350px",
        marginLeft:"50px",
        marginBottom:"10px",
        backgroundColor:"lightgray"
    }

    const { dataUsersGet, users, deleteUser, switchUser } = useUsers()

    useEffect(() => {
        dataUsersGet()
    }, [])


    const handleDelete=(uid:String)=>{
        deleteUser(uid)
    }

    const handleSwitch=(ID)=>{
        switchUser(ID)
    }


    
  return (
    <div>
        <h3 style={{marginLeft:"50px"}}>Usuarios</h3>
        {users.usuarios?.map((el, i)=>(
            <div key={i+'!@#'} style={character}>

                <p>Nombre: {el.nombre}</p>
                <p>Mail:   {el.correo}</p>

                <p>Role:   {el.rol}</p>
                <p>id:     {el.uid}</p>

                <p>State:  {el.estado ? ' true' : ' false'}</p>
                <p>Google: {el.google ? ' true' : ' false'}</p>

                <p>Imagen: {el.img    ? ' Con img' : 'Sin img'}</p>
                <p>Toggle: {el.toggle ? ' true' : ' false'} </p>

                <button onClick={()=>handleDelete(el.uid)}>Eliminar</button>
                <button onClick={()=>handleSwitch(el.uid)}>Toggle</button>
            </div>
        ))}
    </div>
  )
}
