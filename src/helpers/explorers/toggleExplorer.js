

// const copyOfDynosAndFriends = JSON.parse(JSON.stringify(dynosAndFriends)) */


export const toggleExplorer =(objId, array, ketToSwitch)=>{

    const arrString = JSON.stringify(array)
    const newArray =  JSON.parse(arrString)

    let keyId = Object.keys(objId)[0]
    let valueId = Object.values(objId)[0]
    

     newArray.map(el => el[keyId] === valueId ? el[ketToSwitch] = !el[ketToSwitch] :el) 

    return { newArray }  

}

