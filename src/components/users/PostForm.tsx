import {useEffect, useState} from 'react'
import './postForm.css';
import { useForm } from '../../helpers';





export const PostForm = ({postUser, editMode, newDataEdit, defaultModeEdith }) => {

    const[name2, setName2]=useState({
        nameUser: '',
        email: '',
        password:''
    })

    const { nameUser, email, password, onInputChange: onPostInputChange, onResetForm } = useForm(name2);

  
     useEffect(() => { 
        if(editMode !== undefined) {
            const { nombre, correo, } = editMode
            setName2({nameUser:nombre, email:correo})}
    }, [editMode]) 

    

    const onSubmitUsers = (event: any) => {
        event.preventDefault();

        if(editMode){
            newDataEdit(nameUser, email, editMode.uid)
            setName2({nameUser: '',email: '',password:''})
        }else{
            postUser({nombre:nameUser, correo:email, password:password})
        }

         onResetForm()
    }

    const handleCancelEdit =()=>{
        defaultModeEdith()
        setName2({nameUser: '', email: '', password:''})
    }

  



  return (
    <div className="container login-container fix">
    <div className="row">
        <div className="col-md-6 login-form-1 fixed">
            <h3>{editMode ? 'Edit User' : 'Post User'}</h3>

            <form onSubmit={onSubmitUsers}>

                <div className="form-group mb-2">
                    <input
                        className="form-control"
                        placeholder="name"
                        name="nameUser"
                        value={nameUser}
                        onChange={onPostInputChange}
                    />
                </div>

                <div className="form-group mb-2">
                    <input
                        className="form-control"
                        placeholder="eMail"
                        name="email"
                        value={email}
                        onChange={onPostInputChange}
                    />
                </div>
                
                {!editMode &&
                <div className="form-group mb-2">
                    <input
                        className="form-control"
                        placeholder="password"
                        name="password"
                        value={password}
                        onChange={onPostInputChange}
                    />
                </div>
                }

                <div className="d-grid gap-2">
                    <input type="submit" className="btnSubmitPost" 
                        value={ editMode ? 'Edit User':"New user"} />

                    {editMode && 
                        <input type="button" onClick={handleCancelEdit} className="editButton mt-5" value={ editMode ? 'Cancel Edition':'oko'} />
                    }
                </div>


            </form>
        </div>
    </div>
</div>
  )
}
