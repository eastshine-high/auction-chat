module.exports = function (io){
    io.on('connection', (socket) => {
        // Get query parameters and auth token
        const query = socket.handshake.query;
        const auth = socket.handshake.auth;
        
        console.log('A user connected : ' + socket.id);
        console.log('Query parameters:', query);
        console.log('Auth token:', auth.token);

        // Store user information in socket
        socket.userId = query.userId;
        socket.token = query.token;

        // 현재 연결된 모든 소켓 ID 목록을 로그로 출력
        const getConnectedSockets = () => {
            const sockets = io.sockets.sockets;
            const socketIds = Array.from(sockets.keys());
            console.log('Currently connected sockets:', socketIds);
            return socketIds;
        };

        // 새로운 연결 시 현재 연결된 소켓 목록 출력
        getConnectedSockets();

        // 메시지 수신 시 이벤트 처리
        socket.on('message', (msg) => {
            console.log('Message received from user ' + socket.userId + ': ', msg);
            // 메시지를 모든 클라이언트에게 전송
            io.emit('message', {
                userId: socket.userId,
                message: msg
            });
        });

        // 클라이언트 연결 해제 시 이벤트 처리
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.userId);
            // 연결 해제 후 현재 연결된 소켓 목록 출력
            getConnectedSockets();
        });

        socket.interval = setInterval(() => {
            socket.emit('message', 'Hello Socket.IO');
        }, 3000);
    });
};