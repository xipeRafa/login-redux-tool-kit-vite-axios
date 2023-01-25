


export const nextExplorer =(boo, n=8)=>{
    let t = JSON.parse(localStorage.UsersArray).length

    let step = localStorage.step
    boo ? (t>step) ? step = Number(step)+n : n
        : (step>8) ? step = Number(step)-n : n

    localStorage.step = step
  
    let start = Number(step) - n;
    let limit = Number(step)

    let arr = JSON.parse(localStorage.UsersArray).slice(start, limit);

    return { arr }
}