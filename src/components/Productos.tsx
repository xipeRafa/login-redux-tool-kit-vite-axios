import React, {useEffect} from 'react'

import {useProductos} from '../hooks'

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

    const { dataProductosGet, productos, deleteProducto, switchProducto, productosFinder } = useProductos()

    useEffect(() => {
        dataProductosGet()
    }, [])


    const handleDelete=(pid)=>{
        deleteProducto(pid)
    }

    const handleSwitch=(pid)=>{
        switchProducto(pid)
    }


    
  return (
    <div>
        <h3 style={{marginLeft:"50px"}}>Productos</h3>
        <input type="search" className='mx-5 my-2' placeholder='Buscar Productos' onChange={(e)=> productosFinder(e.target.value)}/>
        {productos.productos?.length < 2 ? <button name=' ' onClick={(e)=> productosFinder(e)}>Ver todos los Productos</button> : ''} 


          {productos.productos?.map((el, i)=>(
            <div key={i+'!@#'} style={character}>

                <h3>Categoria: {el.categoria.nombre}</h3>

                <p>Nombre: {el.nombre}</p>
                <p>Usuario: {el.usuario.nombre}</p>
                <p>Usuario Id: {el.usuario._id}</p>
                <p>State: {el.estado ? 'true' : 'false'}</p>

                <img src={el.img} width='50px' />

                <p>Precio: {el.precio}</p>  

                <p>id: {el.pid}</p>
                <p>Descripcion: {el.descripcion}</p>
                <p>Disponible:{el.disponible ? ' true' : ' false'}</p> 

                <button onClick={()=>handleDelete(el.pid)}>Eliminar</button>
                <button onClick={()=>handleSwitch(el.pid)}>Toggle</button>
            </div>
        ))}  

    </div>
  )
}
