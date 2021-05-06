import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@shared/material.module';
import { CardsComponent } from './components/cards-page/cards.component';


@NgModule({
  declarations: [
    CardsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [],
  providers: [],
})
export class CardsModule { }
