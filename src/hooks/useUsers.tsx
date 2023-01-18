
import { useDispatch, useSelector } from 'react-redux';
import { errorConsoleCatch, toggleExplorer, editExplorer} from '../helpers'
import {defaultEditMode, usersDataPush, userDeleteView, switchUserView, editUserView} from  '../store/slices/usersSlice';
import { somethingWentWrong, somethingWentRigth, clearAlertMessage } from  '../store/slices/alertSlice'
import axiosApi from '../api/api';




export const useUsers = () => {

  const { users, editMode } = useSelector(state => state.usersSlice);

  const dispatch = useDispatch();
  
  //"warning", "error", "success","info"
  function SweetAlertError(error){
    dispatch(somethingWentWrong(['Something Went Wrong', error?.response.data.errors[0].msg || 'working', 'error']))
  }


  const dataUsersGet = async () => {
    try { 
      const { data } = await axiosApi.get('/usuarios')
      console.log('dataUsers:', data)
      dispatch(usersDataPush(data))  
    } catch (error) {
      errorConsoleCatch(error)
      SweetAlertError(error)
    }
  }

  function dataUsersReload(){
    dispatch(usersDataPush({ total: users.usuarios.length, usuarios:users.usuarios }))
  }



  const postUser = async ({ nombre, correo, password }) => {
    try {
      await axiosApi.post('/usuarios', { nombre, correo, password }); //post 
      const { data } = await axiosApi.get('/usuarios')
      dispatch(usersDataPush(data));
    } catch (error) {
      errorConsoleCatch(error)
      SweetAlertError(error)
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
        SweetAlertError(error)
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
      dispatch(userDeleteView({ total: usuarios.length, usuarios }))
      dispatch(somethingWentRigth(['Usuario fue Borrado', 'Con Exito!!', 'success']))
    } catch (error) {
      errorConsoleCatch(error)
      SweetAlertError(error)
    } 
  }




  const switchUser = async (uid: String) => {
    try {
      await axiosApi.patch(`/usuarios/toggle/${uid}`)
      const { newArray } = toggleExplorer({uid}, users.usuarios, 'toggle')
      dispatch(switchUserView({ total: newArray.length, usuarios:newArray }))  
    } catch (error) {
      console.log('switch :>> ');
      errorConsoleCatch(error)
      SweetAlertError(error)
    } 
  }
  



  const uploadUserImg = async(uid, file) => {
    try {
        await axiosApi.put(`/uploads/usuarios/${uid}`, {file},{
        headers: {
          "Content-Type": "multipart/form-data",
        }})

        dataUsersGet()
    } catch (error) {
        errorConsoleCatch(error)
        SweetAlertError(error)
    }
  }






 const usersFinder = async (e:String) => {
  console.log('e :>> ', e);
    try {
      if(e.length > 3){
        const {data} = await axiosApi.get(`/buscar/usuarios/${e}`)
        dispatch(usersDataPush({usuarios:data.results}))
      }else{
        dataUsersReload()
      }
    } catch (error) {
      errorConsoleCatch(error)
      SweetAlertError(error)
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
    usersFinder,

    editMode,
    users,
  }
}
