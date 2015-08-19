var EmitIt = require('../../lib/EmitIt.js');

var emitter = new EmitIt();
emitter.subscribe('boom', function(){
    document.write("BOOM! It all blew up.")
});

document.getElementById('boomButton').addEventListener('click', function(){
   emitter.emit('boom');
});

window.emitter = emitter;