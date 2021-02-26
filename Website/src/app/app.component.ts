import { Component, OnInit } from '@angular/core';
import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  ip ='http://localhost:5000/chathub';
  nick = 'Jeff';
  message = 'msg';
  groupId = 'testGroup';
  private connection: HubConnection;

  ngOnInit() {

  }


  Connect() {
    this.connection = new HubConnectionBuilder().withUrl(this.ip).build();
    this.connection.on('ReceiveMessage', (name, message) => {
      console.log(name, message);
    });

    this.connection.on('GetMsg', (msg)=> {
      console.log(msg);
    })

    this.connection
      .start()
      .then(() => console.log('Connection started!'))
      .catch(err => console.log('Error while establishing connection :('));
  }

  JoinGroup() {
    return this.connection.send("JoinGroup",this.nick, this.groupId);
  }

  SendToGroup() {
    return this.connection.send("SendToGroup", this.groupId, this.message);
  }

  SendMessage() {
    return this.connection.invoke('SendMessage', this.nick, this.message);
  }
}
