
import { useDispatch, useSelector } from 'react-redux';
import { usersDataPush, clearErrorMessageUsers, userDeleteView } from '../store/usersSlice';
import axiosApi from '../api/api';

export const useUsers = () => {
    const { users, errorMessage } = useSelector(state => state.usersSlice);
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

  return {
    dataUsersGet,
    users,
    deleteUser
  }
}
