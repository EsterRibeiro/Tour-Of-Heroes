import { HeroService } from './../services/hero.service';
import { Hero } from './../hero';
import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;

  //injeção de dependência angular
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location)
    { }

  ngOnInit(): void {
    this.getHero();
  }

  //Pega o hero pelo id da rota details
  //O operador + converte string em número ex: id
  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id'); //snapshot - imagem estática da rota após a criação, paraMap - dicionário de parâmetros da rota extraídos da URL, retorna o id da rota
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

}
