import React, {useEffect} from 'react'

import {useProductos} from '../hooks/useProductos'

export const Productos = () => {

    const character = {
        display: "block",
        border: "2px solid salmon",
        padding: "10px",
        width: "350px",
        marginLeft:"50px",
        marginBottom:"10px",
        backgroundColor:"lightgray"
    }

    const { dataProductosGet, productos, deleteProducto, switchProducto } = useProductos()

    useEffect(() => {
        dataProductosGet()
    }, [])


    const handleDelete=(uid:String)=>{
        deleteProducto(uid)
    }

    const handleSwitch=(ID)=>{
        switchProducto(ID)
    }


    
  return (
    <div>
        <h3 style={{marginLeft:"50px"}}>productos</h3>

          {productos.productos?.map((el, i)=>(
            <div key={i+'!@#'} style={character}>

                <p>Nombre: {el.nombre}</p>
                <p>Usuario: {el.usuario.nombre}</p>
                <p>State: {el.estado ? 'true' : 'false'}</p>

                <p>Imagen: {el.img ? 'Con img' : 'Sin img'}</p>
                <p>Precio: {el.precio}</p>

                 {/* <p>categoria: {el.categoria.nombre}</p>  */}

               <p>id: {el._id}</p>
                 <p>Descripcion: {el.descripcion}</p>
                <p>Disponible:{el.disponible ? ' true' : ' false'}</p> 

                <button onClick={()=>handleDelete(el._id)}>Eliminar</button>
                <button onClick={()=>handleSwitch(el._id)}>toggle</button>
            </div>
        ))}  

    </div>
  )
}
