import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TinymceModule} from 'angular2-tinymce';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ProductComponent} from './product.component';
import {ProductRoutingModule} from './product-routing.module';
import {PageHeaderModule, ModalModule} from './../../shared';
import {ModalComponent} from "../../shared/modules/modal/modal.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule.forRoot(),
        ProductRoutingModule,
        ModalModule,
        PageHeaderModule,
        TinymceModule.withConfig({})

    ],
    providers: [ModalComponent],
    declarations: [ProductComponent]
})
export class ProductModule {
}
