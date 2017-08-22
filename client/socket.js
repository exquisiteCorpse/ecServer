import io from 'socket.io-client';

const socket = io(window.location.origin);

socket.on('connect', function () {
  console.log('Connected!');

  socket.on('new-corpse', newCorpse => {
    socket.broadcast.emit('new-corpse', newCorpse)
  })

});

export default socket
