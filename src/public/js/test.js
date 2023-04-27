const handleSubmit = async (uid, token) => {

    
    const changePassword = await fetch(`/session/forgotPassword/${uid}/${token}`, {
        method:"PUT" ,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
    } ); 

    console.log("click")
}