const handleSubmit = async (id) => {

    console.log("click")
    const deleteProduct = await fetch(`/api/carts/64751a750b7b87c31446d51b/product/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
    } ); 

    location.reload()
}