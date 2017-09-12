import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QueueingSubject } from 'queueing-subject';
import websocketConnect from 'rxjs-websockets';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/share';

@Injectable()
export class DiscordService {

  private inputStream: QueueingSubject<string>;
  public messages: Observable<string>;

  public connect() {
    if (this.messages) {
      return;
    }

    // Using share() causes a single websocket to be created when the first
    // observer subscribes. This socket is shared with subsequent observers
    // and closed when the observer count falls to zero.
    const connection = websocketConnect(
      'wss://gateway.discord.gg?v=6&encoding=json',
      this.inputStream = new QueueingSubject<string>()
    );
    this.messages = connection.messages.share();
  }

  public send(message: string): void {
    // If the websocket is not connected then the QueueingSubject will ensure
    // that messages are queued and delivered when the websocket reconnects.
    // A regular Subject can be used to discard messages sent when the websocket
    // is disconnected.
    this.inputStream.next(message);
  }

}
