
import { useDispatch, useSelector } from 'react-redux';
import { errorConsoleCatch, toggleExplorer } from "../helpers";
import { productosDataPush, clearErrorMessageProductos, productoDeleteView, switchProductoView } from '../store/slices/productosSlice';
import axiosApi from '../api/api';

export const useProductos = () => {

    const { productos, errorMessage } = useSelector(state => state.productosSlice);

    const dispatch = useDispatch(); 
 



    const dataProductosGet = async () => {
        try{
            const { data } = await axiosApi.get('/productos')
            dispatch( productosDataPush(data));
            console.log('data :>> ', data);
        } catch (error) {
            errorConsoleCatch(error)
        }
    }




    const deleteProducto = async (pid:String) => {
        try{
            await axiosApi.delete(`/productos/${pid}` ) 
            let productos2 = productos.productos.filter(el => el.pid !== pid)
            dispatch( productoDeleteView({total: productos2.length, productos:productos2}) )
        } catch (error) {
            errorConsoleCatch(error)
        }
    }




  const switchProducto = async (pid:String) => {
      try{
          await axiosApi.patch(`/productos/toggle/${pid}`) 
          
          const { newArray } = toggleExplorer({pid}, productos.productos, 'disponible')
          dispatch( switchProductoView({total: newArray.length, productos:newArray }) )
      } catch (error) {
          errorConsoleCatch(error)
      }
  }




  return {
    dataProductosGet,
    productos,
    deleteProducto,
    switchProducto
  }

}


