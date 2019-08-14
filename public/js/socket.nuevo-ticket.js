//comando para establecer la conexion
var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Conectado server');

})

socket.on('disconnect', function() {
    console.log('Des-Conectado server');

})

socket.on('estadoActual', function(resp) {
    label.text(resp.actual);
})

$('button').on('click', function() {
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });
})