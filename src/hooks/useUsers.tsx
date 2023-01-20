
import { useDispatch, useSelector } from 'react-redux';
import axiosApi from '../api/api';
import { errorConsoleCatch, toggleExplorer, editExplorer, finderExplorer, postExplorer,
          paginationExplorer, nextExplorer} from '../helpers'
import {defaultEditMode, usersDataPush, userDeleteView, switchUserView, editUserView} from  '../store/slices/usersSlice';
import { somethingWentWrong, somethingWentRigth } from  '../store/slices/alertSlice'




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
      localStorage.UsersTotal = data.total  
    } catch (error) {
      errorConsoleCatch(error)
      SweetAlertError(error)
    }
  }







  const postUser = async ({ nombre, correo, password }) => {
    try {
      const { data } = await axiosApi.post('/usuarios', { nombre, correo, password }); //post

      const { newArray } = postExplorer(data.usuario)
      dispatch(usersDataPush({usuarios: newArray}) ) 
    /*const { data } = await axiosApi.get('/usuarios/from=0/limit=8')
      dispatch(usersDataPush(data)); */
    } catch (error) {
      errorConsoleCatch(error)
      SweetAlertError(error)
    }  
  }




  const setInfoToForm = (el:Object) => {
    dispatch(editUserView(el))
  }




  const newDataEdit = async (nombre, correo, uid) => {
    try {
      const { newArray } = editExplorer({uid}, users.usuarios, {nombre}, {correo})
      dispatch( usersDataPush({usuarios:newArray}) )

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
      dispatch(userDeleteView({usuarios}))
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
      dispatch(switchUserView({usuarios:newArray}))  
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
        
        console.log({ upFirstLe,upperCase,lowerCase,emailFind })
        
        /*const {data} = await axiosApi.get(`/buscar/usuarios/${v}`) 
        dispatch(usersDataPush({usuarios:data.results}))  */ 
      } 
    } catch (error) {
      errorConsoleCatch(error)
      SweetAlertError(error)
    }
}


const paginationSelect=(v:Number)=>{
  const { arr } = paginationExplorer(v)
  dispatch(usersDataPush({usuarios: arr }) ) 
  /*  dataUsersGet(v -8, v) */ 
}


const paginationNext =(boo:Boolean, n=8)=>{
  const {arr} = nextExplorer(boo, n)
  dispatch(usersDataPush({usuarios: arr }) )
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
