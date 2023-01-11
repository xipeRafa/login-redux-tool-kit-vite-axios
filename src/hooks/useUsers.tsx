import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { usersDataPush, clearErrorMessageUsers, userDeleteView, switchUserView } from '../store/usersSlice';
import axiosApi from '../api/api';

export const useUsers = () => {

 

  const { users, errorMessage } = useSelector(state => state.usersSlice);

/*    const [usersState, setUsersState]=useState([])  

  console.log('usersState:', usersState) */
    const dispatch = useDispatch();
 
    const dataUsersGet = async () => {
        const { data } = await axiosApi.get('/usuarios')
        console.log(data)
        dispatch( usersDataPush(data));
    }

   const deleteUser = async (uid:String) => {
        await axiosApi.delete(`/usuarios/${uid}` ) 
        let usuarios = users.usuarios.filter(el => el.uid !== uid)
        dispatch( userDeleteView({total: usuarios.length, usuarios}) )
   }

  const switchUser = async (ID:String) => {
    await axiosApi.patch(`/usuarios/toggle/${ID}`) 
    const { data } = await axiosApi.get('/usuarios')
    dispatch( switchUserView({total: 0, usuarios:data.usuarios }) )
  }

  return {
    dataUsersGet,
    users,
    deleteUser,
    switchUser
  }
}
