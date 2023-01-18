
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

    const fileUp = {
        border: "0 solid #fff",
        padding: "3px 6px",
        marginLeft:"5px",
        marginBottom:"10px",
        backgroundColor:"#f55d3e",
        color:'#fff',
        cursor:'pointer'
    }

    const { dataUsersGet, users, deleteUser, postUser , switchUser, errorMessage, setInfoToForm,
        editMode, newDataEdit, defaultModeEdith, uploadUserImg, defaultAlert } = useUsers()

          

     useEffect(() => {
        dataUsersGet()
    }, []) 

    useEffect(() => {
         if (errorMessage !== undefined) {
            Swal.fire(errorMessage[0], errorMessage[1], errorMessage[2]);
            defaultAlert()
        } 
        console.log('errorMessage', errorMessage)
    }, [errorMessage]) 


    const handleDelete=(uid:String)=>{
        deleteUser(uid)
    }

    const handleSwitch=(uid)=>{
        switchUser(uid)
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

        {users?.usuarios?.map((el, i)=>(
            <div key={i+'!@#'} style={characterCSS}>

                <h3>Nombre: {el.nombre}</h3>
                <p>Mail:   {el.correo}</p>

                <p>Role:   {el.rol}</p>
                <p>id:     {el.uid}</p>

                <p>State:  {el.estado ? ' true' : ' false'}</p>
                <p>Google: {el.google ? ' true' : ' false'}</p>

                <img src={el.img} width='100px' />
                <p>Toggle: {el.toggle ? ' true' : ' false'} </p>

                <button onClick={()=>handleDelete(el.uid)}>Eliminar</button>
                <button onClick={()=>handleSwitch(el.uid)}>Toggle</button>
                <button onClick={()=>handleEdith(el)}>Edit</button>

                <label htmlFor="file-upload" style={fileUp}>{el.img ? 'New Photo' : 'Add Photo'}</label>

                <input type="file" id="file-upload" style={{display:'none'}} onChange={ (e)=>uploadUserImg(el.uid, e.target.files[0]) }/>

            </div>
        ))}

    </div>
  )
}
