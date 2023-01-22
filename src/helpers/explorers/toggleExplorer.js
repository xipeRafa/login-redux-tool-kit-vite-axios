

// const copyOfDynosAndFriends = JSON.parse(JSON.stringify(dynosAndFriends)) */

//     const { newArray } = toggleExplorer({uid}, users.usuarios, 'toggle')

export const toggleExplorer =(objId, array, ketToSwitch)=>{

    const arrString = JSON.stringify(array)
    const newArray =  JSON.parse(arrString)

    let keyId = Object.keys(objId)[0]
    let valueId = Object.values(objId)[0]
    

    newArray.map(el => el[keyId] === valueId ? el[ketToSwitch] = !el[ketToSwitch] :el) 

     localStorage.UsersArray = JSON.stringify(newArray) 

    return { newArray }  

}

