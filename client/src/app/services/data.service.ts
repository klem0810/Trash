import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { map } from 'rxjs/operators';
import { WSRequest } from '../models/ws-request';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  /**
   * @description Websocket client
   */
  socket = webSocket<WSRequest>('ws://localhost:6969');
  /**
   * @description Received messages
   */
  message$ = this.socket.pipe(map((x) => x.message));

  /**
   * Send messages
   */
  sendMessage(req: WSRequest) {
    this.socket.next(req);
  }
}
