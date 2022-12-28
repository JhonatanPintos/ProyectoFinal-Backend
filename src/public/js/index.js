let socket = io()
let products = document.getElementById("products")
document.getElementById("btn").onclick = () => {
    socket.emit("message", {
        products: products.value
    })
}
socket.on("msg", data => {
    const listaProd = document.getElementById("listaProd")
    let lista = ""
    data.forEach(prod => {
        lista += `<p>${prod.products}</p>`
    });
    listaProd.innerHTML = lista
})
