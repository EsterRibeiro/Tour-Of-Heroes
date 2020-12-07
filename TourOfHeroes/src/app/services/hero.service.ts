import { MessageService } from './message.service'; //injetando messageService no heroService
import { HEROES } from '../mock-heroes';
import { Hero } from '../hero';
 //Injectable para injeção de dependência angular
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root' //entregar ou criar um serviço com provedor
})
//" serviço em serviço ": você injeta o MessageServiceno HeroServiceque é injetado no HeroesComponent.
export class HeroService {
  constructor(private messageService : MessageService) { } //o angular injeta o singleton ao criar o HeroService

  //mande mensagem após buscar os heróis
  getHeroes(): Observable<Hero[]>{
    this.messageService.add('HeroService: fetched heroes - qualquer mensagem pode ser adicioanda aqui');
    return of(HEROES);
  }

  getHero(id: number): Observable<Hero>{
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }
}
