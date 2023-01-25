



export const finderExplorer=(v)=>{

    function capitalizeFirstLetter(v) {
        return v.charAt(0).toUpperCase() + v.slice(1)
    }
    let UpFirstLetter = capitalizeFirstLetter(v.toLowerCase())



    
    let upFirstLe = JSON.parse(localStorage.UsersArray).filter((el) => el.nombre.indexOf(  UpFirstLetter) > -1)
    let upperCase = JSON.parse(localStorage.UsersArray).filter((el) => el.nombre.indexOf(v.toUpperCase()) > -1)
    let lowerCase = JSON.parse(localStorage.UsersArray).filter((el) => el.nombre.indexOf(v.toLowerCase()) > -1)
    let emailFind = JSON.parse(localStorage.UsersArray).filter((el) => el.correo.indexOf(v.toLowerCase()) > -1)
 

    
    return{ 
        upFirstLe, 
        upperCase,    
        lowerCase,     
        emailFind   
    }
}

