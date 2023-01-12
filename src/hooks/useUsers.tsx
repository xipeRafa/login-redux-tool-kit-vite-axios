
import { useDispatch, useSelector } from 'react-redux';
import {errorConsoleCatch} from '../helpers'
import { usersDataPush, clearErrorMessageUsers, userDeleteView, switchUserView } from '../store/slices/usersSlice';
import axiosApi from '../api/api';



export const useUsers = () => {

  const { users, errorMessage } = useSelector(state => state.usersSlice);

  const dispatch = useDispatch();
 



  const dataUsersGet = async () => {
      try{
          const { data } = await axiosApi.get('/usuarios')
          console.log(data)
          dispatch( usersDataPush(data));
      } catch (error) {
          errorConsoleCatch(error)
       /*  setTimeout(() => {
            dispatch(clearErrorMessage());
        }, 1000); */
      }
  }




   const deleteUser = async (uid:String) => {
      try{
          await axiosApi.delete(`/usuarios/${uid}` ) 
          let usuarios = users.usuarios.filter(el => el.uid !== uid)
          dispatch( userDeleteView({total: usuarios.length, usuarios, alert:uid}) )
      } catch (error) {
          errorConsoleCatch(error)
       /*  setTimeout(() => {
            dispatch(clearErrorMessage());
        }, 1000); */
      }
   }

  const switchUser = async (ID:String) => {
      try{
          await axiosApi.patch(`/usuarios/toggle/${ID}`) 
          const { data } = await axiosApi.get('/usuarios')
          dispatch( switchUserView({total: 0, usuarios:data.usuarios }) )
      } catch (error) {
          errorConsoleCatch(error)
         /*  setTimeout(() => {
              dispatch(clearErrorMessage());
          }, 1000); */
      }
  }

  return {
    dataUsersGet,
    users,
    deleteUser,
    switchUser,
    errorMessage
  }
}
