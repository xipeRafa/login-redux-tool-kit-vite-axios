
import { useDispatch, useSelector } from 'react-redux';
import { categoriasDataPush, categoriaDeleteView, switchCategoriaView } from '../store/slices/categoriasSlice';
import { errorConsoleCatch, toggleExplorer } from "../helpers";
import axiosApi from '../api/api';
import { somethingWentWrong, somethingWentRigth } from  '../store/slices/alertSlice'


export const useCategorias = () => {

  const { categorias } = useSelector(state => state.categoriasSlice);

    const dispatch = useDispatch();
 
      //"warning", "error", "success","info"
    function SweetAlertError(error){
      dispatch(somethingWentWrong(['Something Went Wrong', error?.response.data.errors[0].msg || 'working', 'error']))
    }



    const dataCategoriasGet = async () => {
      try{
        const { data } = await axiosApi.get('/categorias')
        console.log('data Categorias', data)
        dispatch( categoriasDataPush(data));
      } catch (error) {
        errorConsoleCatch(error)
        SweetAlertError(error)
      }
    }







   const deleteCategoria = async (cid:String) => {
      try{
        await axiosApi.delete(`/categorias/${cid}` ) 
        let categorias2 = categorias.categorias.filter(el => el.cid !== cid)
        dispatch( categoriaDeleteView({total: categorias2.length, categorias:categorias2}) )
      } catch (error) {
        errorConsoleCatch(error)
        SweetAlertError(error)
      }  
   }






  const switchCategoria = async (cid:String) => {
    try{
      await axiosApi.patch(`/categorias/toggle/${cid}`) 
      const { newArray } = toggleExplorer({cid}, categorias.categorias, 'toggle')
      dispatch( switchCategoriaView({total: newArray.categorias, categorias:newArray }) )
      dispatch( somethingWentRigth(['Switch Value', 'Con Exito!!', 'success']) )
    } catch (error) {
      errorConsoleCatch(error)
      SweetAlertError(error)
    }
  }


  const categoriasFinder = async (e:String) => {
    console.log(e.length)
      try {
        if(e.length > 3){
          const {data} = await axiosApi.get(`/buscar/categorias/${e}`)
          dispatch(categoriasDataPush({categorias:data.results}))
        }else{
          dataCategoriasGet()
        }
      } catch (error) {
        errorConsoleCatch(error)
        SweetAlertError(error)
      }
   }




  return {
    dataCategoriasGet,
    categorias,
    deleteCategoria,
    switchCategoria,
    categoriasFinder,
  }

}
