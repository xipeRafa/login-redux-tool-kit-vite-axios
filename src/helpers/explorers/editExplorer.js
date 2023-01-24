
// the next arguments should be like objects {} to get the key 
// and always use the key name like parameter name

//   const { newArray } = editExplorer({uid}, users.usuarios, {nombre}, {correo})

export function editExplorer(objId, array){

     const arrString = JSON.stringify(array)
     const newArray =  JSON.parse(arrString)

     let keyId = Object.keys(objId)[0]
     let valueId = Object.values(objId)[0]



     let indexTarget = newArray.findIndex((el) => el[keyId] === valueId)



     for (let index = 2; index < arguments.length; index++) {
        let arg = arguments[index];

        let key = Object.keys(arg)[0]

        let value = Object.values(arg)[0]

        newArray.map(el => el[keyId] === valueId ? el[key] = value :el) 
     } 

      


     return { newArray, indexTarget }   
     
 }


