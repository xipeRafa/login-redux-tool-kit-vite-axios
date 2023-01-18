import {useEffect} from 'react'

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

    const { dataCategoriasGet, categorias, deleteCategoria, switchCategoria, categoriasFinder } = useCategorias()


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
        <input type="search" className='mx-5 my-2' placeholder='Buscar Categorias' onChange={(e)=> categoriasFinder(e.target.value)}/>
        {categorias.categorias?.length < 2 ? <button name=' ' onClick={(e)=> categoriasFinder(e)}>Ver todas las Categorias</button> : ''} 

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
