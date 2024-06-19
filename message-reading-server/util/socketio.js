module.exports = function (io){
    io.on('connection', (socket) => {
        console.log('A user connected');

        // 메시지 수신 시 이벤트 처리
        socket.on('message', (msg) => {
            console.log('Message received: ' + msg);
            // 메시지를 모든 클라이언트에게 전송
            io.emit('message', msg);
        });

        // 클라이언트 연결 해제 시 이벤트 처리
        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });

        socket.interval = setInterval(() => {
            socket.emit('message', 'Hello Socket.IO');
        }, 3000);
    });
};