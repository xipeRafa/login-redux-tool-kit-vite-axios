
import { useDispatch, useSelector } from 'react-redux';
import { productosDataPush, clearErrorMessageProductos, productoDeleteView, switchProductoView } from '../store/productosSlice';
import axiosApi from '../api/api';

export const useProductos = () => {

  const { productos, errorMessage } = useSelector(state => state.productosSlice);

    const dispatch = useDispatch(); 
 
    const dataProductosGet = async () => {
        const { data } = await axiosApi.get('/productos')
        console.log(data)
        dispatch( productosDataPush(data));
    }

   const deleteProducto = async (_id:String) => {
        await axiosApi.delete(`/productos/${_id}` ) 
        let productos2 = productos.productos.filter(el => el._id !== _id)
        dispatch( productoDeleteView({total: productos2.length, productos:productos2}) )
   }

  const switchProducto = async (ID:String) => {
    await axiosApi.patch(`/productos/toggle/${ID}`) 
    const { data } = await axiosApi.get('/productos')
    dispatch( switchProductoView({total: data.productos.length, productos:data.productos }) )
  }

  return {
    dataProductosGet,
    productos,
    deleteProducto,
    switchProducto
  }
}
