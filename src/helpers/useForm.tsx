import { useEffect, useMemo, useState } from 'react';
import { useDebounce } from "./useDebounce";


export const useForm = (initialForm = {}, formValidations = {}) => {

    const [formState, setFormState] = useState(initialForm);

    const [formValidation, setFormValidation] = useState({});


    useEffect(() => {
        createValidators();
    }, [formState])

    useEffect(() => {
        setFormState(initialForm);
    }, [initialForm])


    const isFormValid = useMemo(() => {

        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null) 
                return false;
        }

        return true;
    }, [formValidation])

 
    

   /*  function debounce(fun, time){
        let timeoutId;
        return function(){
            if(timeoutId){ 
                clearTimeout(timeoutId)
            }

            const context = this;
            const args = arguments;
            timeoutId = setTimeout(() => {
                return fun.apply(context, args)
            }, time)
        }
    }  */

    const lastValue = useDebounce(formState, 3000);

    const onInputChange = ({ target }) => {

        const { name, value } = target;
        setFormState({ ...formState, [name]: value })
    }

 /*     debounce(onInputChange, 3000) */
 /*   console.log('ddd', lastValue)
   console.log('formState', formState) */



    const onResetForm = () => {
        setFormState(initialForm);
    }


    const createValidators = () => {

        const formCheckedValues = {};


        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessage] = formValidations[formField];

            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
        }

        setFormValidation(formCheckedValues);
    }
    
    const isValidEmail = ( email: string ) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }



    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid,
        isValidEmail, // retorna true or false, resive el email text input 
    }
}
