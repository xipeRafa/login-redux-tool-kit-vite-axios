
import { useDispatch, useSelector } from 'react-redux'
import axiosApi from '../api/api'
import { errorConsoleCatch, toggleExplorer, editExplorer, finderExplorer, postExplorer,
          paginationExplorer, nextExplorer, deleteExplorer} from '../helpers'
import {defaultEditMode, usersDataPush, userDeleteView, switchUserView, editUserView} from  '../store/slices/usersSlice'
import { somethingWentWrong, somethingWentRigth } from  '../store/slices/alertSlice'



export const useUsers = () => {

  const { users, editMode } = useSelector(state => state.usersSlice)

  const dispatch = useDispatch()
  

  //"warning", "error", "success","info"
  function SweetAlertError(error){
      dispatch(somethingWentWrong(['Something Went Wrong', error?.response?.data?.errors[0]?.msg || 'working', 'error']))
  }

  let usersLSArr =     JSON.parse(localStorage.UsersArray ) 
  let fallUsersArr =   JSON.parse(localStorage.fallUsersArr )
  let UserDeletedArr = JSON.parse(localStorage.UserDeletedArr) 
 
  function UpDateDB(){
      fallUsersArr.length>=1 && reWrite()
      UserDeletedArr.length>=1 && reDelete()
  } 




  const dataUsersGet = async (from=0, limit=8) => {
      try { 
          const { data } = await axiosApi.get(`/usuarios/${from}/${limit}`)
          //console.log('dataUsers limit 8:', data)
          dispatch(usersDataPush(data))
          //console.log('typeof Data', data)

          const alls = await axiosApi.get(`/usuarios/0/${data.total}`)

          localStorage.UsersArray = JSON.stringify([...alls.data.usuarios, ...fallUsersArr])  
          localStorage.UsersTotal = data.total  
        
          paginationSelect(8)
      
      } catch (error) {
          dispatch(usersDataPush({usuarios: usersLSArr})) 
          paginationSelect(8)
          localStorage.UsersTotal = usersLSArr.length

          SweetAlertError(error)
          errorConsoleCatch('dataUsersGet:',error)
      }
  }



  



/* -=-=-=-=-=-=-=-=-=--=- POST =-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- post =-=-=-=-=-=-=-=-=-=-=- */
/* -=-=-=-=-=-=-=-=-=--=- POST =-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- post =-=-=-=-=-=-=-=-=-=-=- */
/* -=-=-=-=-=-=-=-=-=--=- POST =-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- post =-=-=-=-=-=-=-=-=-=-=- */

// online solo arriba
// offline abajo + arriba 

  const postUser = async ({ nombre, correo, password }) => {
      try {
          const { newArray } = postExplorer(false, { nombre, correo, password })
          dispatch(usersDataPush({usuarios:newArray})) 

          const { data } = await axiosApi.post('/usuarios', { nombre, correo, password })
          dispatch(usersDataPush({usuarios:[data.usuario]})) 
          console.log('data', data)
          UpDateDB()
      } catch (error) {  // aqui se ejecuta cuando esta offline
          const { newArray } = postExplorer(true, { nombre, correo, password })
          dispatch(usersDataPush({usuarios: newArray})) 

          //SweetAlertError(error)
          /* errorConsoleCatch(error) */
      }  
  }




  function reWrite() {
      for (let index = 0; index < fallUsersArr.length; index++) {  
          const { nombre, correo, password, uid } = fallUsersArr[index]
          reWriteId({ nombre, correo, password, uid })
      } 

      localStorage.fallUsersArr = '[]'  
  }



  function reDelete() {  
      for (let index = 0; index < UserDeletedArr.length; index++) {  
          const { uid } = UserDeletedArr[index]
          reDeleteById({ uid })
      } 

      localStorage.UserDeletedArr = '[]'
  }




  async function reWriteId({ nombre, correo, password, uid }){
      try {

          if(uid.slice(0,8) === 'frontend'){
              const { data } = await axiosApi.post('/usuarios', { nombre, correo, password }) 
              console.log('objs with new Mongo Id', data)
          }else{
            const { data } = await axiosApi.put(`/usuarios/${uid}`, { nombre, correo })
            console.log('objs with new Edit save', data)
          } 
    
      } catch (error) {  // aqui se ejecuta cuando esta offline
          console.log('reWriteId error :>>', error)
          //SweetAlertError(error)
          errorConsoleCatch(error)
      } 
  }




  async function reDeleteById({ uid }){
      try {
          if(uid.slice(0,8) === 'frontend'){
              console.log('no Delete in DB cose there is not there')
          }else{
              await axiosApi.delete(`/usuarios/${uid}`) 
              console.log('objs Deleted of DB')
          } 
      } catch (error) {  // aqui se ejecuta cuando esta offline
          console.log('reDeleteById error :>>', error)
          //SweetAlertError(error)
          errorConsoleCatch(error)
      } 
  }


/* -=-=-=-=-=-=-=-=-=--=- POST END =-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- post end =-=-=-=-=-=-=-=-=-=-=- */
/* -=-=-=-=-=-=-=-=-=--=- POST END =-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- post end =-=-=-=-=-=-=-=-=-=-=- */
/* -=-=-=-=-=-=-=-=-=--=- POST END =-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- post end =-=-=-=-=-=-=-=-=-=-=- */














  const setInfoToForm = (el:Object) => {
      dispatch(editUserView(el))
  }





  const newDataEdit = async (nombre, correo, uid) => { 
      try {
          const { objTarget } = editExplorer(false, {uid}, fallUsersArr, usersLSArr, {nombre}, {correo})
          dispatch( usersDataPush({usuarios:[objTarget]}))
        
          await axiosApi.put(`/usuarios/${uid}`, { nombre, correo })
          UpDateDB()
      } catch (error) {
          console.log('newDataEdit error :>>', error)
          const { objTarget } = editExplorer(true, {uid}, fallUsersArr, usersLSArr, {nombre}, {correo})
          dispatch( usersDataPush({usuarios:[objTarget]}))

          dispatch(defaultEditMode()) 
          //SweetAlertError(error)
          errorConsoleCatch(error)
      }
      dispatch(defaultEditMode()) 
  }



  const defaultModeEdith = () => {
      dispatch(defaultEditMode())
  }




  const deleteUser = async (usuario: Object) => {
      try {
          const { usuarios } = deleteExplorer(usuario.uid, usersLSArr, fallUsersArr)
          dispatch(userDeleteView({usuarios:usuarios})) 

          await axiosApi.delete(`/usuarios/${usuario.uid}`) 
          dispatch(somethingWentRigth(['Usuario fue Borrado', usuario.correo + ' ya no existe ', 'success']))
          UpDateDB()
      } catch (error) {
          console.log('deleteUser error :>>', error)
          //SweetAlertError(error)
          errorConsoleCatch(error)
      } 
  }




  const switchUser = async (usuario) => {
      let uid = usuario.uid
      try {
          const { objTarget } = toggleExplorer(false, {uid}, usuario, 'toggle', usersLSArr, fallUsersArr) 
          dispatch(switchUserView({usuarios:[objTarget]})) 
          
          await axiosApi.patch(`/usuarios/toggle/${usuario.uid}`)
          dispatch(somethingWentRigth(['Usuario switched', usuario.toggle + ' to ' + objTarget.toggle , 'success']))

          UpDateDB()
      } catch (error) {
          console.log('switchUser error :>>', error)
          const { objTarget } = toggleExplorer(true, {uid}, usuario, 'toggle', usersLSArr, fallUsersArr)
          dispatch(switchUserView({usuarios:[objTarget]}))  
          //SweetAlertError(error) 
          errorConsoleCatch(error) 
      } 
  }
  



  const uploadUserImg = async(uid, file) => {
      try {
          const { data } = await axiosApi.put(`/uploads/usuarios/${uid}`, {file},{
          headers: {
            "Content-Type": "multipart/form-data",
          }})

          dispatch(somethingWentRigth(['Foto fue Actualizada', 'Con Exito!!', 'success']))  

          let img = data.img
          const { objTarget } = editExplorer(false, {uid}, [], users.usuarios, {img})
          dispatch(usersDataPush({ usuarios:[objTarget] })) 
          UpDateDB()  
      } catch (error) {
          console.log('switchUser error :>>', error)
          SweetAlertError(error)
          errorConsoleCatch(error)
      }
  }






  const usersFinder = async (v:String) => {
      try {
          if(v.length > 3){
              const { upFirstLe, upperCase, lowerCase, emailFind } = finderExplorer(v)

              upFirstLe.length>=1 ? dispatch(usersDataPush({usuarios:upFirstLe})): null
              upperCase.length>=1 ? dispatch(usersDataPush({usuarios:upperCase})): null
              lowerCase.length>=1 ? dispatch(usersDataPush({usuarios:lowerCase})): null
              emailFind.length>=1 ? dispatch(usersDataPush({usuarios:emailFind})): null
              
              console.log({ upFirstLe,upperCase,lowerCase,emailFind })
              
              /*const {data} = await axiosApi.get(`/buscar/usuarios/${v}`) 
              dispatch(usersDataPush({usuarios:data.results}))  */ 
          } 
      } catch (error) {
          console.log('usersFinder error :>>', error)
          SweetAlertError(error)
          errorConsoleCatch(error)
      }
  }


  const paginationSelect=(v:Number)=>{
      const { arr } = paginationExplorer(v)
      dispatch(usersDataPush({usuarios: arr }) ) 
      /*  dataUsersGet(v -8, v) */ 
  }


  const paginationNext =(boo:Boolean, n=8)=>{
      const { arr } = nextExplorer(boo, n)
      dispatch(usersDataPush({usuarios: arr }) )
      // let step = localStorage.step
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
