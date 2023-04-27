const handleSubmit = async (id) => {

    
    const deleteProduct = await fetch(`/api/carts/6445cd26d02ca7c0e184eb8f/product/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
    } ); 

    location.reload()
}