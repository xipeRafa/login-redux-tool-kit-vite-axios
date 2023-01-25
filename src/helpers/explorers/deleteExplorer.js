




export const deleteExplorer =(uid, array, fallArray)=>{

    let usuarios = array.filter(el => el.uid !== uid)

    localStorage.UsersArray = JSON.stringify(usuarios)


//-=-=-=-=-=-=--= fall
    let usuariosFall = fallArray.filter(el => el.uid !== uid) 

    localStorage.fallUsersArr = JSON.stringify(usuariosFall) 


 //-=-=-=-=-=-=--= Delete   
    let usuario = array.filter(el => el.uid === uid) 
    console.log('usuario', usuario)

    localStorage.UserDeletedArr = JSON.stringify(usuario)




    let n = Number(localStorage.UsersTotal) -1
    localStorage.UsersTotal = n

    usuarios.slice(0,8) 



    return { usuarios }

}