
// the next arguments should be like objects {} to get the key 
// and always use the key name like parameter name

//   const { newArray } = editExplorer(saveInFall, {uid}, array, {nombre}, {correo})




export function editExplorer(saveInFall=false, objId, fallUsersArr, array){


     const arrString = JSON.stringify(array)
     const newArray =  JSON.parse(arrString)

     let keyId = Object.keys(objId)[0]
     let valueId = Object.values(objId)[0]



     let indexTarget = newArray.findIndex((el) => el[keyId] === valueId)

     let objTarget = newArray.slice(indexTarget, indexTarget +1)[0]



     for (let index = 4; index < arguments.length; index++) {
        let arg = arguments[index];

        let key = Object.keys(arg)[0]

        let value = Object.values(arg)[0]

        newArray.map(el => el[keyId] === valueId ? el[key] = value :el) 
     } 


      localStorage.UsersArray = JSON.stringify(newArray) //try


     
     
      if (saveInFall) {

         let some = fallUsersArr.some(el => el.uid === objTarget.uid) //catch

         if(!some){ // no existe
            fallUsersArr.push(objTarget)  
            localStorage.fallUsersArr = JSON.stringify(fallUsersArr)  
         }else{
            let ind = fallUsersArr.findIndex(el => el.uid === objTarget.uid) // true
            fallUsersArr.splice(ind, 1, objTarget) // replace
            localStorage.fallUsersArr = JSON.stringify(fallUsersArr)
         }

      }




     
     return { objTarget }   
     
 }
