import { MessageService } from './../services/message.service';
//import { HEROES } from './../mock-heroes';
import { HeroService } from '../services/hero.service';
import { Hero } from './../hero';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];
  //heroes = HEROES;
  //selectedHero: Hero;
  /*
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };*/

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  /*onSelect(hero: Hero): void{
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected Hero id: ${hero.id}`); //sintaxe do $ e ``
  }*/

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes); //subscribe - passa a matriz emitida (Heroes[]) para o retorno da chamada - abordagem assíncrona
  }

  add(name: string): void {
    name = name.trim();

    if (!name){ return; }
    this.heroService.addHero({ name } as Hero)
    .subscribe(hero => {
      this.heroes.push(hero);
    });

}


  //original
  /*getHeroes(): void {
    this.heroes = this.heroService.getHeroes();
  }*/

}
