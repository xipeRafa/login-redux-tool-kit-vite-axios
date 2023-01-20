



export const postExplorer=(usuario)=>{

    let sa = JSON.stringify(usuario)
    let ss = JSON.parse(sa)

    
    let newArr = [...JSON.parse(localStorage.UsersArray), ss]
    localStorage.UsersArray = JSON.stringify([...newArr])
    
    let newArray = JSON.parse(localStorage.UsersArray).slice(-1)

    return {newArray} 
}