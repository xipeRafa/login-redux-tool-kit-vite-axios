import React, {useEffect} from 'react'

import {useCategorias} from '../hooks/useCategorias'

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

    console.log('categorias ===>>>', categorias)

    useEffect(() => {
        dataCategoriasGet()
    }, [])


    const handleDelete=(_id:String)=>{
        deleteCategoria(_id)
    }

    const handleSwitch=(ID)=>{
        switchCategoria(ID)
    }


    
  return (
    <div>
        <h3 style={{marginLeft:"50px"}}>Categorias</h3>
        {categorias.categorias?.map((el, i)=>(
            <div key={i+'!@#'} style={character}>

                <p>Nombre: {el.nombre}</p>
                <p>State: {el.estado ? 'true' : 'false'}</p>
                <p>toggle: {el.toggle ? 'true' : 'false'}</p>

                <button onClick={()=>handleDelete(el._id)}>Eliminar</button>
                <button onClick={()=>handleSwitch(el._id)}>toggle</button> 
            </div>
        ))} 
    </div>
  )
}
