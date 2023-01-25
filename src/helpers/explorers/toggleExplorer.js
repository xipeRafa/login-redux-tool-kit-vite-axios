

// const copyOfDynosAndFriends = JSON.parse(JSON.stringify(dynosAndFriends)) */

//     const { newArray } = toggleExplorer({uid}, users.usuarios, 'toggle')





export const toggleExplorer =(saveInFall=false, objId, usuario, keyToSwitch, usersLSArr, fallUsersArr)=>{

    let objString = JSON.stringify(usuario)
    let objTarget =  JSON.parse(objString)

    objTarget.toggle = !usuario.toggle


    if (saveInFall) {
        
        let some = fallUsersArr.some(el => el.uid === objTarget.uid)
        
        if(!some){ 
            fallUsersArr.push(objTarget)
            localStorage.fallUsersArr = JSON.stringify(fallUsersArr) 
        } else{
            let ind = fallUsersArr.findIndex(el => el.uid === objTarget.uid) // true 
            fallUsersArr.splice(ind, 1, objTarget) // replace
            localStorage.fallUsersArr = JSON.stringify(fallUsersArr) 
        }
        
    }
    
    let ind = usersLSArr.findIndex(el => el.uid = objTarget.uid)
    let newArr = usersLSArr

    newArr.splice(ind, 1 , objTarget)
    localStorage.UsersArray = JSON.stringify(newArr) 
    
    
    return { objTarget }  
    
}


/*     let keyId = Object.keys(objId)[0]
let valueId = Object.values(objId)[0]



newArray.map(el => el[keyId] === valueId ? el[keyToSwitch] = !el[keyToSwitch] :el)   */


//
  
  //let objTarget = newArray.filter(el => el.uid === valueId)[0]






