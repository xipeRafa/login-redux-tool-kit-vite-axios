



export const deleteExplorer =(uid, array)=>{

console.log('array explorer :>> ', array);

    let usuarios = array.filter(el => el.uid !== uid) 

    localStorage.UsersArray = JSON.stringify(usuarios)

    let n = Number(localStorage.UsersTotal) -1
    localStorage.UsersTotal = n

    return {usuarios}

}