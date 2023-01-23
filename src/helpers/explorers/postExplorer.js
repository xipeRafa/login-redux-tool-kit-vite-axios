



export const postExplorer=({ nombre, correo, password})=>{

    let usuario = {
        correo,
        nombre,
        password,
        'uid': 'fall-Id-' + correo + Date.now(),
        'estado': true,
        'google': false,
        'img': "",
        'rol': "USER_ROLE",
        'toggle': true
    }

    
    let newArr = [...JSON.parse(localStorage.UsersArray), usuario]

    localStorage.UsersArray = JSON.stringify([...newArr]) //=================
    

    let newArray = JSON.parse(localStorage.UsersArray).slice(-1)



//-=-=-=-=-=--= fall

    let fall = JSON.parse(localStorage.fallPostUsersArr) 
    fall.push(usuario)

    localStorage.fallPostUsersArr = JSON.stringify(fall) 


    
//-=-=-=-=-=-=-=-=-=- update counter
    let n = Number(localStorage.UsersTotal) + 1
    localStorage.UsersTotal = n



    return { newArray } 
    
}

