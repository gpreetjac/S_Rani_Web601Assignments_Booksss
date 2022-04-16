import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContentListComponent } from './content-list.component';
import { ContentCardComponent } from '../content-card/content-card.component';
import { ContenListRoutingModule } from './content-list-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ModifyContentComponent } from '../modify-content/modify-content.component';
import { AddContentDialogComponent } from '../add-content-dialog/add-content-dialog.component';
import { EditContentDialogComponent } from '../edit-content-dialog/edit-content-dialog.component';
@NgModule({
  declarations: [
    ContentListComponent,
    ContentCardComponent,
    ModifyContentComponent,
    AddContentDialogComponent,
    EditContentDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ContenListRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class ContentListModule { }
