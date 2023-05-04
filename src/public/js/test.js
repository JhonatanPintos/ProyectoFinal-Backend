const handleSubmit = async (uid, token) => {
console.log("uid" + uid)
console.log("token" + token)
    
    const changePassword = await fetch(`/session/forgotPassword/${uid}/${token}`, {
        method:"PUT" ,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
    } ); 

    console.log("click")
}