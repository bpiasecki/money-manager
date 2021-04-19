import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { CardsRoutingModule } from './cards-routing.module';
import { CardsComponent } from './components/cards-page/cards.component';


@NgModule({
  declarations: [
    CardsComponent
  ],
  imports: [
    CommonModule,
    CardsRoutingModule,
    MatCardModule,
    MatGridListModule
  ],
  exports: [],
  providers: [],
})
export class CardsModule { }
