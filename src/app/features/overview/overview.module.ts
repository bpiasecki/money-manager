import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { OverviewComponent } from './components/overview-page/overview.component';
import { OverviewRoutingModule } from './overview-routing.module';


@NgModule({
  declarations: [
    OverviewComponent
  ],
  imports: [
    CommonModule,
    OverviewRoutingModule,
    MatCardModule,
    FlexLayoutModule
  ],
  exports: [],
  providers: [],
})
export class OverviewModule { }
