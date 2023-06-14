let socket = io()
let user = ""
let chatBox = document.getElementById("chatbox")

Swal.fire({
    title: '🤫🤐😏 Chat secreto 😏🤐🤫',
    input: 'text',
    text: 'Ingresa tu nombre',
    inputValidator: value => {
        return !value.trim() && 'Ingresa un nombre'
    },
    allowOutsideClick: false
}).then( result => {
    user = result.value
    document.getElementById('username').innerHTML = user
    socket = io()
})

chatBox.addEventListener("keyup", event => {
    if(event.key == "Enter"){
        if(chatBox.value.trim().length > 0){
            socket.emit("message", {
                user,
                message: chatBox.value
            })
            chatBox.value = ""
        }
    }
})

//Recibir Mensajes
socket.on("logs", data => {
    const divLog = document.getElementById("messageLogs")
    let messages = ""

    data.reverse().forEach(message => {
        if(message.user == user){
            messages += `<p class="mensageMio"><i class="userName">${message.user}: </i> ${message.message}</p>`
        }else{
            messages += `<p class="mensageOtro"><i class="userName">${message.user}: </i> ${message.message}</p>`

        }
    });
    divLog.innerHTML = messages
})