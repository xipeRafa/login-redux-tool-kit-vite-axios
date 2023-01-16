
import React, {useEffect} from 'react'
import Swal from 'sweetalert2';
import {PostForm} from './PostForm';
import {useUsers} from '../../hooks'



export const Users = () => {

    const characterCSS = {
        display: "block",
        border: "2px solid salmon",
        padding: "10px",
        width: "350px",
        marginLeft:"50px",
        marginBottom:"10px",
        backgroundColor:"lightgray"
    }

    const { dataUsersGet, users, deleteUser, postUser , switchUser, 
        errorMessage, setInfoToForm, editMode, newDataEdit, defaultModeEdith } = useUsers()

 
    useEffect(() => {
        dataUsersGet()
    }, [])

    useEffect(() => {
        if (errorMessage !== undefined) {
            Swal.fire(errorMessage,'Con Exito!!', 'success' );
        }
    }, [errorMessage]) 


    const handleDelete=(uid:String)=>{
        deleteUser(uid)
    }

    const handleSwitch=(ID)=>{
        switchUser(ID)
    }

    const handleEdith =(el)=>{
        setInfoToForm(el)
    }


    
  return (
    <div>
        <PostForm 
            postUser={postUser} 
            editMode={editMode} 
            newDataEdit={newDataEdit} 
            defaultModeEdith={defaultModeEdith}
        />

        <h3 style={{marginLeft:"50px"}}>Usuarios</h3>

        {users.usuarios?.map((el, i)=>(
            <div key={i+'!@#'} style={characterCSS}>

                <h3>Nombre: {el.nombre}</h3>
                <p>Mail:   {el.correo}</p>

                <p>Role:   {el.rol}</p>
                <p>id:     {el.uid}</p>

                <p>State:  {el.estado ? ' true' : ' false'}</p>
                <p>Google: {el.google ? ' true' : ' false'}</p>

                <p>Img:    {el.img  ? 'Con img' : 'Sin img'}</p>
                <p>Toggle: {el.toggle ? ' true' : ' false'} </p>

                <button onClick={()=>handleDelete(el.uid)}>Eliminar</button>
                <button onClick={()=>handleSwitch(el.uid)}>Toggle</button>
                <button onClick={()=>handleEdith(el)}>Edit</button>

            </div>
        ))}

    </div>
  )
}
