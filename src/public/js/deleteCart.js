const handleSubmit = async (id) => {

    
    const deleteProduct = await fetch(`/api/carts/641b787a0ea53502047688d3/product/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
    } ); 

    location.reload()
}