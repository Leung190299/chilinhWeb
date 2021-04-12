import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopEditComponent } from './shop-edit/shop-edit.component';
import { ShopCreateComponent } from './shop-create/shop-create.component';
import { ShopsComponent } from './shops/shops.component';
import { shoplRouting } from './shop-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ShopEditComponent, ShopCreateComponent, ShopsComponent],
  imports: [
    CommonModule,
    shoplRouting,
    ReactiveFormsModule,
  ]
})
export class ShopModule { }
