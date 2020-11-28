let socket = io()
$('#loginPage').show()
$('#chatBox').hide()
$('#btnId').click(() => {
    socket.emit('login' , {
        userName: $('#nameId').val(),
        email: $('#emailId').val(),
        password: $('#passId').val(),
        msg: $('#textId').val()
    })
})
socket.on('logged_in' , ()=>{
    console.log('you are logged in')
    $('#loginPage').hide()
    $('#chatBox').show()
})
$('#sendId').click(() => {
    socket.emit('send_msg',{
        to: $('#toId').val(),
        msg: $('#msgId').val()
    })
})
socket.on('msg_rcvd' , (data) => {
    // window.alert(`SEND DATA TO ${data.to} DATA IS ${data.msg}`)
    $('#ulId').append($('<li class="list-group-item">').text(data.msg))
})