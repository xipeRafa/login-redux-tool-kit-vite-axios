



export const postExplorer=(usuario)=>{

    let string = JSON.stringify(usuario)
    let arr = JSON.parse(string)

    
    let newArr = [...JSON.parse(localStorage.UsersArray), arr]
    localStorage.UsersArray = JSON.stringify([...newArr])
    
    let newArray = JSON.parse(localStorage.UsersArray).slice(-1)

    return {newArray} 
}