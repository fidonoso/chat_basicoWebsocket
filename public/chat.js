const socket=io();

let message= document.getElementById('message');
let username= document.getElementById('username');
let btn= document.getElementById('send');
let output= document.getElementById('output');
let actions= document.getElementById('actions');

btn.addEventListener('click', ()=>{
    let obj={
        username: username.value,
        message: message.value
    }
    socket.emit('chat:message', obj)
});

message.addEventListener('keypress',()=>{
    socket.emit('chat:typing', username.value)
})

socket.on('chat:message', (data)=>{
    actions.innerHTML=''
    output.innerHTML+=`<p><strong>${data.username}:</strong> ${data.message}</p>`
})

socket.on('chat:typing', (data)=>{
    actions.innerHTML=''
    actions.innerHTML+=`<p><em>${data} está escribiendo </em></p>`
})
