import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: "*"
    }
})
export class SocketService implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    handleConnection(client: Socket) {
        console.log(`Client connected: ${client}`);
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client}`);
    }

    sendToRoom(room: string, event: string, data: string) {
        console.log(`Ne event: ${event} in room: ${room}. Comment body: ${data}`)
        this.server.to(room).emit(event, data);
    }

    @SubscribeMessage('joinRoom')
    handleJoinRoom(client: Socket, room: string) {
        console.log(`Client ${client} joining room ${room}`);
        client.join(room);
    }
}