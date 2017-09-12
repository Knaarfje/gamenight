import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DiscordService } from './services/discord.service';

const firebaseConfig = {
  apiKey: 'AIzaSyB9mgqm5TLz1aA7E8-dxUw9VGjCiaIXkQU',
  authDomain: 'gamenight-db5de.firebaseapp.com',
  databaseURL: 'https://gamenight-db5de.firebaseio.com',
  projectId: 'gamenight-db5de',
  storageBucket: 'gamenight-db5de.appspot.com',
  messagingSenderId: '702799739538'
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  providers: [DiscordService],
  bootstrap: [AppComponent]
})
export class AppModule { }
