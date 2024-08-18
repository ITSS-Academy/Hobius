import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, DatePipe, JsonPipe } from '@angular/common';
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
    JsonPipe,
  ],
  exports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    AsyncPipe,
    DatePipe,
    JsonPipe,
  ],
})
export class SharedModule {}
