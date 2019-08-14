const { io } = require('../server');
const { TicketControl } = require('../classes/ticket.control')

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a esta aplicación'
    });

    client.on('siguienteTicket', (data, callback) => {
        console.log('Cual es el siguiente ticket');
        var siguiente = ticketControl.siguiente();
        console.log(siguiente);

        client.broadcast.emit('enviarMensaje', siguiente);
        callback(siguiente);
    })



    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'Escritorio Obligatorio'
            });
        }
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);
        client.broadcast.emit('ultimos4', ticketControl.getUltimos4());

    })



});