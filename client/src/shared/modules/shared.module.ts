import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    AsyncPipe,
    DatePipe,
  ],
  exports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    AsyncPipe,
    DatePipe,
  ],
})
export class SharedModule {}
