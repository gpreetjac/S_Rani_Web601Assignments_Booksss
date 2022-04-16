import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentDetailComponent } from './content-detail.component';
import { ContentDetailRoutingModule } from './content-detail-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ContentDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ContentDetailRoutingModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class ContentDetailModule { }
