
import { useDispatch, useSelector } from 'react-redux';
import { errorConsoleCatch, toggleExplorer, editExplorer, finderExplorer, postExplorer} from '../helpers'
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
    dispatch(usersDataPush({ total: JSON.parse(localStorage.UsersArray).length, usuarios:users.usuarios }))
  }



  const postUser = async ({ nombre, correo, password }) => {
    try {
      const {data} = await axiosApi.post('/usuarios', { nombre, correo, password }); //post

      const { newArray } = postExplorer(data.usuario)
      dispatch(usersDataPush({usuarios: newArray}) ) 
    /*const { data } = await axiosApi.get('/usuarios/from=0/limit=8')
      dispatch(usersDataPush(data)); */
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
      const { newArray } = editExplorer({uid}, users.usuarios, {nombre}, {correo})
      dispatch( usersDataPush({total: newArray.length, usuarios:newArray}) )

      await axiosApi.put(`/usuarios/${uid}`, { nombre, correo }); 
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
      let usuarios = users.usuarios.filter(el => el.uid !== uid) 
      dispatch(userDeleteView({ total: usuarios.length, usuarios }))
      dispatch(somethingWentRigth(['Usuario fue Borrado', 'Con Exito!!', 'success']))
      await axiosApi.delete(`/usuarios/${uid}`)
    } catch (error) {
      errorConsoleCatch(error)
      SweetAlertError(error)
    } 
  }




  const switchUser = async (uid: String) => {
    try {
      const { newArray } = toggleExplorer({uid}, users.usuarios, 'toggle')
      dispatch(switchUserView({ total: newArray.length, usuarios:newArray }))  
      await axiosApi.patch(`/usuarios/toggle/${uid}`)
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






const usersFinder = async (v:String) => {
    try {
      if(v.length > 3){

        const { upFirstLe,upperCase,lowerCase,emailFind } =finderExplorer(v)

        upFirstLe.length>=1 ? dispatch(usersDataPush({usuarios:upFirstLe})): null
        upperCase.length>=1 ? dispatch(usersDataPush({usuarios:upperCase})): null
        lowerCase.length>=1 ? dispatch(usersDataPush({usuarios:lowerCase})): null
        emailFind.length>=1 ? dispatch(usersDataPush({usuarios:emailFind})): null
        
        /*const {data} = await axiosApi.get(`/buscar/usuarios/${v}`) 
        dispatch(usersDataPush({usuarios:data.results}))  */ 
        console.log({ upFirstLe,upperCase,lowerCase,emailFind });
      }else{
        dataUsersReload()
      }   
    } catch (error) {
      errorConsoleCatch(error)
      SweetAlertError(error)
    }
}


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
  boo ? /* (t>step) */true ? step = Number(step)+n   :n
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

    //edit
    setInfoToForm,
    newDataEdit,
    defaultModeEdith,
    uploadUserImg,
    //finder
    usersFinder,
    paginationSelect,
    paginationNext,


    //states
    editMode,
    users,
  }
}
