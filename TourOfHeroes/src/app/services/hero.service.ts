import { MessageService } from './message.service'; //injetando messageService no heroService
import { HEROES } from '../mock-heroes';
import { Hero } from '../hero';
 //Injectable para injeção de dependência angular
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';//tratamento de erros

@Injectable({
  providedIn: 'root' //entregar ou criar um serviço com provedor
})
//" serviço em serviço ": você injeta o MessageServiceno HeroServiceque é injetado no HeroesComponent.
export class HeroService {

  private heroesUrl = 'api/heroes'; //URL da web api

  constructor(
    private messageService: MessageService,
    private http: HttpClient) { } //o angular injeta o singleton ao criar o HeroService

    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };


  //mande mensagem após buscar os heróis
  //tap - acessa o fluxo de valores observable e envia uma mensagem
  getHeroes(): Observable<Hero[]>{
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe( //entensão do pipe para tratamento de erros
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getError, []')) //catchError intercepta um Observable que falhou
    );
  }

  private handleError<T>(operation = 'operation', result?: T){
    return(error: any): Observable<T> => {

      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    }

  }

  getHero(id: number): Observable<Hero>{
    const url = `${this.heroesUrl}/${id}`;

    return this.http.get<Hero>(url)
    .pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  //Update tem 3 parâmetros: URL, dados que serão atualizados e options (cabeçalho)
  updateHero(hero: Hero): Observable<any>
  {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
    .pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
    .pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions)
    .pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );

  }

  //message usado com frequência, coloco dentro de um log
  private log(message: string){
    this.messageService.add(`HeroService: ${message}`);
  }
}
