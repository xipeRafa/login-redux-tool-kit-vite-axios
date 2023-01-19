
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
      const {data} = await axiosApi.post('/usuarios', { nombre, correo, password }); //post 
      
      let s = JSON.stringify(data.usuario)
      let ss = JSON.parse(s)
      
      let newArr = [...JSON.parse(localStorage.UsersArray), ss]
      localStorage.UsersArray = JSON.stringify([...newArr])
      
      let ls = JSON.parse(localStorage.UsersArray)
      dispatch(usersDataPush({usuarios: ls.slice(-1) }) )
      
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






const usersFinder = async (v:String) => {
    try {
      if(v.length > 3){

        v=v.trim()

        function capitalizeFirstLetter(v) {
          return v.charAt(0).toUpperCase() + v.slice(1);
        }
        let finding = capitalizeFirstLetter(v.toLowerCase());


        function lowerFirstLetter(v) {
          return v.charAt(0).toLowerCase() + v.slice(1);
        }
        let finding2 = lowerFirstLetter(v.toLowerCase());

        console.log('finding', finding2)
      
        let a = JSON.parse(localStorage.UsersArray).filter((el) => el.nombre.indexOf(v) > -1)
        let b = JSON.parse(localStorage.UsersArray).filter((el) => el.nombre.indexOf(finding) > -1)
        let c = JSON.parse(localStorage.UsersArray).filter((el) => el.nombre.indexOf(finding2) > -1)

        let d = JSON.parse(localStorage.UsersArray).filter((el) => el.correo.indexOf(v) > -1)
        let e = JSON.parse(localStorage.UsersArray).filter((el) => el.correo.indexOf(finding) > -1)
        let f = JSON.parse(localStorage.UsersArray).filter((el) => el.correo.indexOf(finding2) > -1)

        /* console.log('a :>> ', a, 'b', b, 'c', c); */

        if(a.length>=1){dispatch(usersDataPush({usuarios:a}))}

        if(b.length>=1){dispatch(usersDataPush({usuarios:b}))}

        if(c.length>=1){dispatch(usersDataPush({usuarios:c}))}

        if(d.length>=1){dispatch(usersDataPush({usuarios:d}))}

        if(e.length>=1){dispatch(usersDataPush({usuarios:e}))}

        if(f.length>=1){dispatch(usersDataPush({usuarios:f}))}
 
    /*     const {data} = await axiosApi.get(`/buscar/usuarios/${v}`) 
        dispatch(usersDataPush({usuarios:data.results}))  */ 

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
