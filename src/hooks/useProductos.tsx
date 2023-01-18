
import { useDispatch, useSelector } from 'react-redux';
import { errorConsoleCatch, toggleExplorer } from "../helpers";
import { productosDataPush, productoDeleteView, switchProductoView } from '../store/slices/productosSlice';
import { somethingWentWrong, somethingWentRigth } from  '../store/slices/alertSlice'

import axiosApi from '../api/api';

export const useProductos = () => {

    const { productos } = useSelector(state => state.productosSlice);


    const dispatch = useDispatch(); 
 

      //"warning", "error", "success","info"
    function SweetAlertError(error){
        dispatch(somethingWentWrong(['Something Went Wrong', error?.response.data.errors[0].msg || 'working', 'error']))
    }



    const dataProductosGet = async () => {
        try{
            const { data } = await axiosApi.get('/productos')
            dispatch( productosDataPush(data));
            console.log('data :>> ', data);
        } catch (error) {
            errorConsoleCatch(error)
            SweetAlertError(error)
        }
    }




    const deleteProducto = async (pid:String) => {
        try{
            await axiosApi.delete(`/productos/${pid}` ) 
            let productos2 = productos.productos.filter(el => el.pid !== pid)
            dispatch( productoDeleteView({total: productos2.length, productos:productos2}) )
            dispatch( somethingWentRigth(['Producto Borrado', 'Con Exito!!', 'success']) )
        } catch (error) {
            errorConsoleCatch(error)
            SweetAlertError(error)
        }
    }




    const switchProducto = async (pid:String) => {
        try{
            await axiosApi.patch(`/productos/toggle/${pid}`) 
          
            const { newArray } = toggleExplorer({pid}, productos.productos, 'disponible')
            dispatch( switchProductoView({total: newArray.length, productos:newArray }) )
        } catch (error) {
            errorConsoleCatch(error)
            SweetAlertError(error)
        }
    }




    const productosFinder = async (e:String) => {
        console.log(e.length)
          try {
            if(e.length > 3){
              const {data} = await axiosApi.get(`/buscar/productos/${e}`)
              dispatch(productosDataPush({productos:data.results}))
            }else{
              dataProductosGet()
            }
          } catch (error) {
            errorConsoleCatch(error)
            SweetAlertError(error)
          }
       }



  return {
    dataProductosGet,
    productos,
    deleteProducto,
    switchProducto,
    productosFinder,
  }

}


