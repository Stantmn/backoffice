import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from './layout.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            {path: 'owner', loadChildren: '../owner/owner.module#OwnerModule'},
            {path: 'user', loadChildren: '../user/user.module#UserModule'},
            {path: 'page', loadChildren: '../page/page.module#PageModule'},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {
}
