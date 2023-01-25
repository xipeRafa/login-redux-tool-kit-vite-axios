
import { createSlice } from '@reduxjs/toolkit';



export const alertSlice = createSlice({
    name: 'alert',

    initialState: {
        sweetAlertMessage: undefined
    },

    reducers: {
        somethingWentRigth:(state, {payload})=>{
            state.sweetAlertMessage = payload
        },
        somethingWentWrong:(state, {payload})=>{
            state.sweetAlertMessage = payload
        },
        clearAlertMessage: (state) => {
            state.sweetAlertMessage = undefined;
        }
    }
    
});


// Action creators are generated for each case reducer function
export const { clearAlertMessage, somethingWentWrong, somethingWentRigth } = alertSlice.actions;















// esto se importa en todos los hooks de los componentes padre:

// import { somethingWentWrong, somethingWentRigth } from  '../store/slices/alertSlice'

  //"warning", "error", "success","info"
  /* function SweetAlertError(error){
    dispatch(somethingWentWrong(['Something Went Wrong', error?.response.data.errors[0].msg || 'working', 'error']))
  } */


/* } catch (error) {
    errorConsoleCatch(error)
    SweetAlertError(error)
} */