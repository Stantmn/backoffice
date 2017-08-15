import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {UserComponent} from './user.component';
import {UserRoutingModule} from './user-routing.module';
import {PageHeaderModule, ModalModule} from './../../shared';
import {ModalComponent} from "../../shared/modules/modal/modal.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule.forRoot(),
        UserRoutingModule,
        ModalModule,
        PageHeaderModule
    ],
    providers: [ModalComponent],
    declarations: [UserComponent]
})
export class UserModule {
}
