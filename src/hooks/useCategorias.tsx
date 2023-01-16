
import { useDispatch, useSelector } from 'react-redux';
import { categoriasDataPush, clearErrorMessageCategorias, categoriaDeleteView, switchCategoriaView } from '../store/slices/categoriasSlice';
import { errorConsoleCatch, toggleExplorer } from "../helpers";
import axiosApi from '../api/api';

export const useCategorias = () => {

  const { categorias, errorMessage } = useSelector(state => state.categoriasSlice);

    const dispatch = useDispatch();
 




    const dataCategoriasGet = async () => {
      try{
        const { data } = await axiosApi.get('/categorias')
        console.log('data Categorias', data)
        dispatch( categoriasDataPush(data));
      } catch (error) {
        errorConsoleCatch(error)
      }
    }







   const deleteCategoria = async (cid:String) => {
      try{
        await axiosApi.delete(`/categorias/${cid}` ) 
        let categorias2 = categorias.categorias.filter(el => el.cid !== cid)
        dispatch( categoriaDeleteView({total: categorias2.length, categorias:categorias2}) )
      } catch (error) {
        errorConsoleCatch(error)
      }  
   }






  const switchCategoria = async (cid:String) => {
    try{
      await axiosApi.patch(`/categorias/toggle/${cid}`) 
      const { newArray } = toggleExplorer({cid}, categorias.categorias, 'toggle')
      dispatch( switchCategoriaView({total: newArray.categorias, categorias:newArray }) )
    } catch (error) {
      errorConsoleCatch(error)
    }
  }




  return {
    dataCategoriasGet,
    categorias,
    deleteCategoria,
    switchCategoria
  }
}
