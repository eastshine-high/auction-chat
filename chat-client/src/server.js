import {io} from "socket.io-client";

const socket = io("http://localhost:5001", {
  query: {
    token: "kkkkkasdf",
    userId: "user123"
  },
  auth: {
    token: "kkkkkasdf"
  }
});

socket.on('connect', () => {
    console.log('Connected to server');
});

export default socket;
