import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Edition } from '../../models/edition.model';
import { DiscordService } from '../../services/discord.service';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  edition: Edition;
  private socketSubscription: Subscription;
  private refreshInterval = 0;

  constructor(
    private db: AngularFireDatabase,
    private socket: DiscordService
  ) { }

  ngOnInit() {
    this.db.list('editions', { query: { orderByChild: 'eventDate', limitToLast: 1 } })
      .subscribe(a => {
        this.edition = a[0];
        this.getGame(a[0].game.toString()).subscribe(b => this.edition.game = b);
      });

    this.socket.connect();
    this.socketSubscription = this.socket.messages.subscribe((message) => {
      console.log('received message from server: ', message);
      const msg = JSON.parse(message);
      if (msg.op === 10) {
        this.refreshInterval = msg.d.heartbeat_interval;

        this.socket.send(JSON.stringify({
          op: 2,
          d: {
            token: 'MzU3MTYyMjc3NzkyOTA3MjY0.DJl4zg.IsfZup7YEoktHLoAhtw50sbVSfc',
            properties: {
              $os: 'linux',
              $browser: 'disco',
              $device: 'disco'
            },
            large_threshold: 50,
            compress: true,
            shard: [1, 1],
            presence: {
              game: null,
              status: 'online',
              since: new Date().getSeconds() / 1000,
              afk: false
            }
          },
          t: null,
          s: null
        }));

      }
    });
  }


  getGame(key: string) {
    return this.db.object(`games/${key}`);
  }
}
