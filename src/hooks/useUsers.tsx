
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


  const dataUsersGet = async (from=0, limit=8) => {
    try { 
      const { data } = await axiosApi.get(`/usuarios/${from}/${limit}`)
      console.log('dataUsers limit 8:', data)
      dispatch(usersDataPush(data))

      const alls = await axiosApi.get(`/usuarios/0/${data.total}`)
      localStorage.UsersArray = JSON.stringify([...alls.data.usuarios])

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
      const { data } = await axiosApi.get('/usuarios/from=0/limit=8')
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

 /* const PaginationRow=(boo:Boolean, n=8)=>{

    let contador = localStorage.step || n

    boo ? (users.total>contador) ? contador++ :n
        : (contador>=n+1) ? contador-- :n

    let a = localStorage.step = contador;

    dataUsersGet(a -n, a)  
 } */


 const paginationSelect=(v:Number)=>{
    localStorage.setItem('step', v)
     
    let step = localStorage.step

    let fn = Number(step) - 8;
    let ln = Number(step) 

    let b = JSON.parse(localStorage.UsersArray).slice(fn, ln);
    dispatch(usersDataPush({usuarios: b }) ) 

   /*  dataUsersGet(v -8, v) */ 
 }


 const paginationNext =(boo:Boolean, n=8)=>{
  
  let t = JSON.parse(localStorage.UsersArray).length

  let step = localStorage.step
  boo ? (t>step) ? step = Number(step)+n   :n
      : (step>8) ? step = Number(step)-n  :n

  localStorage.step = step
  
  let fn = Number(step) - n;
  let ln = Number(step)

  let b = JSON.parse(localStorage.UsersArray).slice(fn, ln);
  dispatch(usersDataPush({usuarios: b }) )

   /*  dataUsersGet(step -n, step) */
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
    paginationSelect,
    paginationNext,



    editMode,
    users,
  }
}
