
import { useDispatch, useSelector } from 'react-redux';
import axiosApi from '../api/api';
import { errorConsoleCatch, toggleExplorer, editExplorer, finderExplorer, postExplorer,
          paginationExplorer, nextExplorer, deleteExplorer} from '../helpers'
import {defaultEditMode, usersDataPush, userDeleteView, switchUserView, editUserView} from  '../store/slices/usersSlice';
import { somethingWentWrong, somethingWentRigth } from  '../store/slices/alertSlice'





export const useUsers = () => {

  const { users, editMode } = useSelector(state => state.usersSlice);

  const dispatch = useDispatch();
  




  //"warning", "error", "success","info"
  function SweetAlertError(error){
    dispatch(somethingWentWrong(['Something Went Wrong', error?.response.data.errors[0].msg || 'working', 'error']))
  }


let usersLSArr = JSON.parse(localStorage.UsersArray)
let fallPostUsersArr = JSON.parse(localStorage.fallPostUsersArr)


// dispatch solo resibe objetos


  const dataUsersGet = async (from=0, limit=8) => {
    try { 
      const { data } = await axiosApi.get(`/usuarios/${from}/${limit}`)
      //console.log('dataUsers limit 8:', data)
      dispatch(usersDataPush(data));
      //console.log('typeof Data', data)

      const alls = await axiosApi.get(`/usuarios/0/${data.total}`)
      localStorage.UsersArray = JSON.stringify([...alls.data.usuarios, ...fallPostUsersArr])  
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


  const postUser = async ({ nombre, correo, password }) => {
    let saveInFall
    try {

        await axiosApi.post('/usuarios', { nombre, correo, password }); 

        const { newArray } = postExplorer({ nombre, correo, password }, saveInFall = false)
        dispatch(usersDataPush({usuarios: newArray}))
      
        if (fallPostUsersArr.length>=1){ // se ejecuta online
            reWriteId()
        }

    } catch (error) {  // aqui se ejecuta cuando esta offline
        console.log('postUser error :>> ');
        const { newArray } = postExplorer({ nombre, correo, password }, saveInFall = true)
        dispatch(usersDataPush({usuarios: newArray})) 
        SweetAlertError(error)
        errorConsoleCatch(error)
    }  

  }


  function reWriteId() {

      for (let index = 0; index < fallPostUsersArr.length; index++) {  

          const { uid } = fallPostUsersArr[index]

          let get = usersLSArr.filter(el => el.uid === uid) // one array with One obj
          
          const { nombre, correo, password, } = get[0] 

          reWriteId_2({ nombre, correo, password, uid })
          
      } 

      localStorage.fallPostUsersArr = '[]' 
  
  }


  async function reWriteId_2({ nombre, correo, password, uid }){
      try {

          if(uid.slice(0,8) === 'frontend'){
              const { data } = await axiosApi.post('/usuarios', { nombre, correo, password }); 
              console.log('objs with new Mongo Id', data)
          }else{
            const { data } = await axiosApi.put(`/usuarios/${uid}`, { nombre, correo })
            console.log('objs with new Edit save', data)
          } 
    
  
      } catch (error) {  // aqui se ejecuta cuando esta offline
          console.log('reWriteId_2 error :>> ');
          SweetAlertError(error)
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
      const { newArray, indexTarget } = editExplorer({uid}, usersLSArr, {nombre}, {correo})
      let objTarget = newArray.slice(indexTarget, indexTarget +1)[0]

      dispatch( usersDataPush({usuarios:[objTarget]}))
      localStorage.UsersArray = JSON.stringify(newArray) 

      await axiosApi.put(`/usuarios/${uid}`, { nombre, correo })

      if (fallPostUsersArr.length>=1){ // se ejecuta online
        reWriteId()
      }

    } catch (error) {

        let some = fallPostUsersArr.some(el => el.uid === uid)

        if(!some){ // no existe
            fallPostUsersArr.push({correo, nombre, uid, 'toggle':true})  
            localStorage.fallPostUsersArr = JSON.stringify(fallPostUsersArr)  
        }else{
            let ind = fallPostUsersArr.findIndex(el => el.uid === uid) // true
            fallPostUsersArr.splice(ind, 1, {correo, nombre, uid, 'toggle':true}) // replace
            localStorage.fallPostUsersArr = JSON.stringify(fallPostUsersArr) 
        }
        dispatch(defaultEditMode()) 
        SweetAlertError(error)
        errorConsoleCatch(error)
    }
    dispatch(defaultEditMode()) 
}



  const defaultModeEdith = () => {
    dispatch(defaultEditMode())
  }




  const deleteUser = async (usuario: Object) => {
    try {
      const { usuarios } = deleteExplorer(usuario.uid, usersLSArr, fallPostUsersArr)
      dispatch(userDeleteView({usuarios:usuarios.slice(0,8)})) 

      dispatch(somethingWentRigth(['Usuario fue Borrado', usuario.correo + ' ya no existe ', 'success']))
      await axiosApi.delete(`/usuarios/${usuario.uid}`) 

      if (fallPostUsersArr.length>=1){ // se ejecuta online
        reWriteId()
      }
    } catch (error) {
      SweetAlertError(error)
      errorConsoleCatch(error)
    } 
  }




  const switchUser = async (uid: String) => {

    try {
       const { newArray } = toggleExplorer({uid}, usersLSArr, 'toggle')
       let indexTargetInd = newArray.findIndex((el) => el.uid === uid)
       let objTarget = newArray.slice(indexTargetInd, indexTargetInd +1)[0]

       dispatch(switchUserView({usuarios:[objTarget]}))  
       await axiosApi.patch(`/usuarios/toggle/${uid}`) 
       if (fallPostUsersArr.length>=1){ // se ejecuta online
        reWriteId()
      }
    } catch (error) {
      let some = fallPostUsersArr.some(el => el.uid === uid)

      let objTargetfiltered = usersLSArr.filter(el => el.uid === uid)[0]

      if(!some){ 
        console.log('no existe :>> ')
          objTargetfiltered.toggle = !objTargetfiltered.toggle 
          fallPostUsersArr.push(objTargetfiltered)
          localStorage.fallPostUsersArr = JSON.stringify(fallPostUsersArr) 
      } else{
        console.log('si existe')
          let ind = fallPostUsersArr.findIndex(el => el.uid === uid) // true
          objTargetfiltered.toggle = !objTargetfiltered.toggle 
          fallPostUsersArr.splice(ind, 1, objTargetfiltered) // replace
          localStorage.fallPostUsersArr = JSON.stringify(fallPostUsersArr) 
      }
        SweetAlertError(error)
        errorConsoleCatch(error)
    } 
  }
  



  const uploadUserImg = async(uid, file) => {
    try {
        const {data} = await axiosApi.put(`/uploads/usuarios/${uid}`, {file},{
        headers: {
          "Content-Type": "multipart/form-data",
        }})

        dispatch(somethingWentRigth(['Foto fue Actualizada', 'Con Exito!!', 'success']))  

        let img = data.img
        const { newArray } = editExplorer({uid}, users.usuarios, {img})
        dispatch(usersDataPush({ usuarios:newArray }))
           
    } catch (error) {
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
