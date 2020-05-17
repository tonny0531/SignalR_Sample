import { Component, OnInit } from '@angular/core';
import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  nick = 'Jeff';
  message = 'msg';
  private connection: HubConnection;

  ngOnInit() {
    this.connection = new HubConnectionBuilder().withUrl('http://localhost:5000/chathub').build();
  }


  Connect() {
    this.connection.on('ReceiveMessage', (name, message) => {
      console.log(name, message);
    });

    this.connection
      .start()
      .then(() => console.log('Connection started!'))
      .catch(err => console.log('Error while establishing connection :('));
  }

  SendMessage() {
    return this.connection.invoke('SendMessage', this.nick, this.message);
  }
}
