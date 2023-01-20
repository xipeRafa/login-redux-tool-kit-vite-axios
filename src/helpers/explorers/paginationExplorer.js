


export const paginationExplorer = (v) => {
    localStorage.setItem('step', v)

    let step = localStorage.step

    let start = Number(step) - 8;
    let limit = Number(step) 

    let arr = JSON.parse(localStorage.UsersArray).slice(start, limit);

    return {arr}
}