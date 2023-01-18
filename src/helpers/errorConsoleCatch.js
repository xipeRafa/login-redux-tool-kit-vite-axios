




export function errorConsoleCatch(error) {
    console.log('error                         :>> ', error);
    console.log('error.response.data?.msg      :>> ', error.response.data?.msg);
    console.log('error.response.data.errors    :>> ', error.response.data.errors);

    console.log('error.response.data.errors[0].msg :>> ', error.response.data.errors[0].msg);
    console.log('error.response.data.errors[0] :>> ', error.response.data.errors[0]);
    console.log('error.response.data.errors[1] :>> ', error.response.data.errors[1]);
    console.log('error.response.data.errors[2] :>> ', error.response.data.errors[2]);
    console.log('error.response.data.errors[3] :>> ', error.response.data.errors[3]);

}


// data es el primer objeto que viene en  res.json({msg:'})