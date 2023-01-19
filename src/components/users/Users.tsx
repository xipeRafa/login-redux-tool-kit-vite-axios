
import { useEffect } from 'react'
import { PostForm } from './PostForm';
import { useUsers } from '../../hooks'



export const Users = () => {



    const characterCSS = {
        display: "block",
        border: "2px solid salmon",
        padding: "10px",
        width: "350px",
        marginLeft: "50px",
        marginBottom: "10px",
        backgroundColor: "lightgray"
    }

    const fileUp = {
        border: "0 solid #fff",
        padding: "3px 6px",
        marginLeft: "5px",
        marginBottom: "10px",
        backgroundColor: "#f55d3e",
        color: '#fff',
        cursor: 'pointer'
    }

    const { dataUsersGet, users, deleteUser, postUser, switchUser, setInfoToForm,
        editMode, newDataEdit, defaultModeEdith, uploadUserImg, usersFinder, 
        PaginationRow, paginationSelect } = useUsers()



    useEffect(() => {
        dataUsersGet()
    }, [])


    const handleDelete = (uid: String) => {
        deleteUser(uid)
    }

    const handleSwitch = (uid: String) => {
        switchUser(uid)
    }

    const handleEdith = (el: String) => {
        setInfoToForm(el)
    }


    const handlePaginationSelect=(ps)=>{
        let step = Number(ps)
        paginationSelect(step)
    }





    return (
        <div>
            <h3 className='mx-5'>Usuarios</h3>
            <div className='mx-5 my-2'>
                <div>
                    {`Usuarios del: ${localStorage.step -8 +1} asta el: ${Number(localStorage.step)}`}
                </div>
                <input type="button" value='<' onClick={()=>PaginationRow(false)} className='btn btn-secondary'/>

                <input type="button" value='1' onClick={()=>handlePaginationSelect(8)} className='btn btn-secondary'/>
                <input type="button" value='2' onClick={()=>handlePaginationSelect(16)} className='btn btn-secondary'/>
                <input type="button" value='3' onClick={()=>handlePaginationSelect(24)} className='btn btn-secondary'/>
                <input type="button" value='4' onClick={()=>handlePaginationSelect(32)} className='btn btn-secondary'/>

                <input type="button" value='>' onClick={()=>PaginationRow(true)} className='btn btn-secondary'/>

                <select className='form-control col-12 my-2' style={{width:'200px'}} onChange={(e)=>handlePaginationSelect(e.target.value)}>
                    <option value="8"> usuarios </option>
                    <option value=" 8">1 a  8</option>
                    <option value="16">9 a 16</option>
                    <option value="24">17 a 24</option>
                    <option value="32">25 a 32</option>
                </select>

                
            </div>

            <PostForm
                postUser={postUser}
                editMode={editMode}
                newDataEdit={newDataEdit}
                defaultModeEdith={defaultModeEdith}
            />



            <input type="search" className='mx-5 my-2' placeholder='Buscar Usuarios' onChange={(e)=> usersFinder(e.target.value)} />

             {users.usuarios?.length < 2 &&  
                <div className='mx-5'>
                    <button onClick={()=>handlePaginationSelect(8)()} className='btn btn-info'>
                        Click para Ver todos los Usuarios
                    </button>
                </div>}
 
            {users?.usuarios?.map((el, i) => (
                <div key={i + '!@#'} style={characterCSS}>

                    <h3>Nombre: {el.nombre}</h3>
                    <p>Mail:   {el.correo}</p>

                    <p>Role:   {el.rol}</p>
                    <p>id:     {el.uid}</p>

                    <p>State:  {el.estado ? ' true' : ' false'}</p>
                    <p>Google: {el.google ? ' true' : ' false'}</p>

                    <img src={el.img} width='100px' />
                    <p>Toggle: {el.toggle ? ' true' : ' false'} </p>

                    <button onClick={() => handleDelete(el.uid)}>Eliminar</button>
                    <button onClick={() => handleSwitch(el.uid)}>Toggle</button>
                    <button onClick={() => handleEdith(el)}>Edit</button>
                    <input type="file" id="file-upload" onChange={(e) => uploadUserImg(el.uid, e.target.files[0])} />

                </div>
            ))}

        </div>
    )
}
