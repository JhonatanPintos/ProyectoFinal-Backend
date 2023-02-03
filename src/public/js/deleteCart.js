const handleSubmit = async (id) => {

    
    const deleteProduct = await fetch(`/api/carts/63dc3a34053dd3ab71540deb/product/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
    } ); 

    location.reload()
}