import { HeroService } from './../services/hero.service';
import { Hero } from './../hero';
import { Observable, Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { debounceTime, distinct, distinctUntilChanged, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit {

  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>(); // RxJS Subject

  constructor(private heroService: HeroService) { }

  //Pegue um termo de pesquisa do Observable stream
  search(term: string): void {
    this.searchTerms.next(term);
  }
  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300), //Aguarde 300ms após considerar um termo digitado

      distinctUntilChanged(), //ignore o novo termo se for o mesmo do anterior

      switchMap((term: string) => this.heroService.searchHeroes(term)), //troque para nova pesquisa toda vez que o termo for alterado
    );
  }
}
