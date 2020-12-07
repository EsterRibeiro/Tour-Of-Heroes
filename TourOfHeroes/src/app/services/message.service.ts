import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { } //sempre será necessário o construtor?

  messages: string[] = [];

  add(message: string) {
    this.messages.push(message); //push - adicionar mensagem no cache
  }

  clear() {
    this.messages = []; //excluir mensagens do cache
  }

}
