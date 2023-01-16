

// const copyOfDynosAndFriends = JSON.parse(JSON.stringify(dynosAndFriends)) */


export const toggleExplorer =(ID, array, key)=>{

    const arrString = JSON.stringify(array)
    const newArray =  JSON.parse(arrString)

    newArray.map(el => el.uid === ID ? el[key] = !el[key] 
                      :el._id === ID ? el[key] = !el[key]
                      :el) 

    return { newArray }

}

