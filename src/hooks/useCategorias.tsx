
import { useDispatch, useSelector } from 'react-redux';
import { categoriasDataPush, clearErrorMessageCategorias, categoriaDeleteView, switchCategoriaView } from '../store/slices/categoriasSlice';
import axiosApi from '../api/api';

export const useCategorias = () => {

  const { categorias, errorMessage } = useSelector(state => state.categoriasSlice);

    const dispatch = useDispatch();
 
    const dataCategoriasGet = async () => {
        const { data } = await axiosApi.get('/categorias')
        dispatch( categoriasDataPush(data));
    }

   const deleteCategoria = async (_id:String) => {
        await axiosApi.delete(`/categorias/${_id}` ) 
        let categorias2 = categorias.categorias.filter(el => el._id !== _id)
        dispatch( categoriaDeleteView({total: categorias2.length, categorias:categorias2}) )
   }

  const switchCategoria = async (ID:String) => {
    await axiosApi.patch(`/categorias/toggle/${ID}`) 
    const { data } = await axiosApi.get('/categorias')
    dispatch( switchCategoriaView({total: data.categorias, categorias:data.categorias }) )
  }

  return {
    dataCategoriasGet,
    categorias,
    deleteCategoria,
    switchCategoria
  }
}
