



export const deleteExplorer =(uid, array, fallArray)=>{

    let usuarios = array.filter(el => el.uid !== uid) 

    localStorage.UsersArray = JSON.stringify(usuarios)

//-=-=-=-=-=-=--= fall
    let usuariosFall = fallArray.filter(el => el.uid !== uid) 

    localStorage.fallPostUsersArr = JSON.stringify(usuariosFall)



    let n = Number(localStorage.UsersTotal) -1
    localStorage.UsersTotal = n

    return { usuarios }

}