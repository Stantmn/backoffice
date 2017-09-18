import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from './layout.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            {path: 'user', loadChildren: '../user/user.module#UserModule'},
            {path: 'product', loadChildren: '../product/product.module#ProductModule'},
            {path: 'order', loadChildren: '../order/order.module#OrderModule'},
            {path: 'customer', loadChildren: '../customer/customer.module#CustomerModule'},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {
}
