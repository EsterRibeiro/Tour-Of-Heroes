import { MessageService } from './../services/message.service';
import { Component, OnInit } from '@angular/core';


//Deve exibir todas as mensagens, incluindo quando houver busca de heróis (fetch)
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
  }

}
