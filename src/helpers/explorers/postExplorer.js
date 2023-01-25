



export const postExplorer = (saveInFall, {nombre, correo, password}) => {
console.log('saveInFall- postExplorer', saveInFall)
    console.log('postExplorer :>> ');

    let usuario = {
        correo,
        nombre,
        password,
        'uid': 'frontend-Id-' + correo + Date.now(),
        'estado': true,
        'google': false,
        'img': "",
        'rol': "USER_ROLE",
        'toggle': true
    }

    
    let newArr = [...JSON.parse(localStorage.UsersArray), usuario] // concatena
        
    if (saveInFall === false) {
        localStorage.UsersArray = JSON.stringify([...newArr]) // push UsersArray    
    }

    let newArray = JSON.parse(localStorage.UsersArray).slice(-1)  // real [{}]





    if (saveInFall === true) {
        console.log('fall--')
        let fall = JSON.parse(localStorage.fallUsersArr) 
    
        fall.push(usuario)
        
        localStorage.fallUsersArr = JSON.stringify(fall) 
    }




    
    //-=-=-=-=-=-=-=-=-=- update counter
    let n = Number(localStorage.UsersTotal) + 1
    localStorage.UsersTotal = n



    return { newArray } 
    
}

