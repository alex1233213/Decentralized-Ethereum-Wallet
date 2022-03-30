import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncateAddressPipe } from './truncate-address.pipe';



@NgModule({
  declarations: [
    TruncateAddressPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TruncateAddressPipe
  ]
})
export class PipesModule { }
