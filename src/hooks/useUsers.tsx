
import { useDispatch, useSelector } from 'react-redux';
import { errorConsoleCatch, toggleExplorer, editExplorer} from '../helpers'
import {defaultEditMode, usersDataPush, clearErrorMessageUsers,
  userDeleteView, switchUserView, editUserView, somethingWentWrong
} from  '../store/slices/usersSlice';
import axiosApi from '../api/api';




export const useUsers = () => {

  const { users, errorMessage, editMode } = useSelector(state => state.usersSlice);

  const dispatch = useDispatch();
  
  //"warning", "error", "success","info"
  function SweetAlertError(){
    dispatch(somethingWentWrong(['Something Went Wrong', 'Working !!', 'error']))
  }

  const defaultAlert =()=>{
    setTimeout(() => {
      dispatch(clearErrorMessageUsers())
    }, 500);
  }


  const dataUsersGet = async () => {
    try { 
      const { data } = await axiosApi.get('/usuarios')
      console.log('dataUsers:', data)
      dispatch(usersDataPush(data))  
    } catch (error) {
      errorConsoleCatch(error)
      SweetAlertError()
    }
  }



  const postUser = async ({ nombre, correo, password }) => {
    try {
      await axiosApi.post('/usuarios', { nombre, correo, password }); //post 
      const { data } = await axiosApi.get('/usuarios')
      dispatch(usersDataPush(data));
    } catch (error) {
      errorConsoleCatch(error)
      SweetAlertError()
    }  
  }



  const setInfoToForm = (el) => {
    dispatch(editUserView(el))
  }



  const newDataEdit = async (nombre, correo, uid) => {
    try {
        await axiosApi.put(`/usuarios/${uid}`, { nombre, correo }); 

        const { newArray } = editExplorer({uid}, users.usuarios, {nombre}, {correo})
        dispatch( usersDataPush({total: newArray.length, usuarios:newArray}) )
    } catch (error) {
        errorConsoleCatch(error)
        SweetAlertError()
    }
    dispatch(defaultEditMode()) 
  }




  const defaultModeEdith = () => {
    dispatch(defaultEditMode())
  }





  const deleteUser = async (uid: String) => {
    try {
       await axiosApi.delete(`/usuarios/${uid}`)
      let usuarios = users.usuarios.filter(el => el.uid !== uid) 
      dispatch(userDeleteView({ total: usuarios.length, usuarios, alert: ['Usuario fue Borrado', 'con Exito!!', 'success'] }))
    } catch (error) {
      errorConsoleCatch(error)
      SweetAlertError()
    } 
  }




  const switchUser = async (uid: String) => {
    try {
      await axiosApi.patch(`/usuarios/toggle/${uid}`)
      const { newArray } = toggleExplorer({uid}, users.usuarios, 'toggle')
      dispatch(switchUserView({ total: newArray.length, usuarios:newArray }))   
    } catch (error) {
      errorConsoleCatch(error)
      SweetAlertError()
    } 
  }
  



  const uploadUserImg = async(uid, file) => {
    try {
        const a = await axiosApi.put(`/uploads/usuarios/${uid}`, {file},{
        headers: {
          "Content-Type": "multipart/form-data",
        }})

        console.log('Img was upload:>> ', a);
    } catch (error) {
      errorConsoleCatch(error)
      SweetAlertError()
    }
  }



  





  return {
    dataUsersGet,
    deleteUser,
    switchUser,
    postUser,
    setInfoToForm,
    newDataEdit,
    defaultModeEdith,
    uploadUserImg,
    defaultAlert,

    editMode,
    errorMessage,
    users,
  }
}
