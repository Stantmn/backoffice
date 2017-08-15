import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TinymceModule} from 'angular2-tinymce';
import {PageComponent} from './page.component';
import {PageRoutingModule} from './page-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PageHeaderModule, ModalModule} from './../../shared';
import {ModalComponent} from "../../shared/modules/modal/modal.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule.forRoot(),
        PageRoutingModule,
        ModalModule,
        PageHeaderModule,
        TinymceModule.withConfig({})

    ],
    providers: [ModalComponent],
    declarations: [PageComponent]
})
export class PageModule {
}
