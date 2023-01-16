import React, {useEffect} from 'react'

import {useCategorias} from '../hooks'

export const Categorias = () => {

    const character = {
        display: "block",
        border: "2px solid salmon",
        padding: "10px",
        width: "350px",
        marginLeft:"50px",
        marginBottom:"10px",
        backgroundColor:"lightgray"
    }

    const { dataCategoriasGet, categorias, deleteCategoria, switchCategoria } = useCategorias()


    useEffect(() => {
        dataCategoriasGet()
    }, [])


    const handleDelete=(cid:String)=>{
        deleteCategoria(cid)
    }

    const handleSwitch=(cid)=>{
        switchCategoria(cid)
    }


    
  return (
    <div>

        <h3 style={{marginLeft:"50px"}}>Categorias</h3>

        {categorias.categorias?.map((el, i)=>(
            <div key={i+'!@#'} style={character}>

                <p>Nombre: {el.nombre}</p>
                <p>cid: {el.cid}</p>
                <p>State:  {el.estado ? ' true' : ' false'}</p>
                <p>toggle: {el.toggle ? ' true' : ' false'}</p>

                <p>Usuario: {el.usuario.nombre}</p>
                <p>Usuario Id: {el.usuario._id}</p>

                <button onClick={()=>handleDelete(el.cid)}>Eliminar</button>
                <button onClick={()=>handleSwitch(el.cid)}>Toggle</button> 

            </div>
        ))} 

    </div>
  )
}
