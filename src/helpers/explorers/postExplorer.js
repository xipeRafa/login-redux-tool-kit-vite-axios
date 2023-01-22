



export const postExplorer=({ nombre, correo, password})=>{

    let usuario ={
        correo,
        nombre,
        password,
        'uid': 'forAWhyleId' + Date.now(),
        'estado': true,
        'google': false,
        'img': "",
        'rol': "USER_ROLE",
        'toggle': true
    }

    let string = JSON.stringify(usuario)
    let arr = JSON.parse(string)

    
    let newArr = [...JSON.parse(localStorage.UsersArray), arr]

    localStorage.UsersArray = JSON.stringify([...newArr])
    

    let newArray = JSON.parse(localStorage.UsersArray).slice(-1)

    let n = Number(localStorage.UsersTotal) + 1
    localStorage.UsersTotal = n

    return {newArray} 
    
}

