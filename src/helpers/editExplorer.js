
// the next arguments should be like objects {} to get the key 
// and always use the key name like parameter name


export function editExplorer(ID, array){

     const arrString = JSON.stringify(array)
     const newArray =  JSON.parse(arrString)

     for (let index = 2; index < arguments.length; index++) {
        let arg = arguments[index];

        let key = Object.keys(arg)[0]

        let value = Object.values(arg)[0]

        newArray.map(el => el.uid === ID ? el[key] = value 
                          :el._id === ID ? el[key] = value
                          :el) 
     }

     return { newArray }   
 }


