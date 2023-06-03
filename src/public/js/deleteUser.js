const handleSubmit = async (id) => {

    const deleteProduct = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
    } ); 

    location.reload()
}