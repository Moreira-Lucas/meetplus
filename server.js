const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  options:{
    cors:'*'
}}
);

app.use(express.static(`${__dirname}/dist/front`));
app.get('/*', (req,res)=>{
res.sendFile(`${__dirname}/dist/front/index/html`);
});



//Definindo uma porta 
const port = process.env.PORT || 3000;


//Inicializando o servidor para monitorar as entradas de usuário.
io.on('connection',socket=>{
  socket.on('join',(data)=>{
    const roomName = data.roomName;
    socket.join(roomName);
    socket.to(roomName).broadcast.emit('new-user',data);
    
    socket.on('disconnect', ()=>{
      socket.to(roomName).broadcast.emit('bye-user',data);
    })
    console.log(`Usuário conectado`, data);
  })
})





server.listen(port, () =>{
  console.log(`Server running port ${port}`);
})