import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TinymceModule} from 'angular2-tinymce';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CustomerComponent} from './customer.component';
import {CustomerRoutingModule} from './customer-routing.module';
import {PageHeaderModule, ModalModule} from './../../shared';
import {ModalComponent} from "../../shared/modules/modal/modal.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule.forRoot(),
        CustomerRoutingModule,
        ModalModule,
        PageHeaderModule,
        TinymceModule.withConfig({})

    ],
    providers: [ModalComponent],
    declarations: [CustomerComponent]
})
export class CustomerModule {
}
