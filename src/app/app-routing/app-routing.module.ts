import { Router, RouterModule , Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from './routes'



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }