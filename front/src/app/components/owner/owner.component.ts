import {Component, OnInit} from '@angular/core';
import {Owner} from '../../classes/owner';
import {OwnerService} from '../../services/owner.service';
import {FileService} from '../../services/file.service';
import {Settings} from '../../constants/settings';
import {ModalComponent} from "../../shared/modules/modal/modal.component";

@Component({
    moduleId: module.id,
    selector: 'app-owner',
    templateUrl: './owner.component.html',
    styleUrls: ['./owner.component.scss'],
    providers: [OwnerService, FileService]
})

export class OwnerComponent implements OnInit {
    private ownerList: Owner[] = [];
    private owner: Owner;
    private errorMessage: any;
    private result: any;
    private frequencyList: {};
    private paymentMethodsList: {};
    private statusList: {};
    private tableParams: any;
    private advancedPagination: number;
    private collectionSize: number;
    private fileList: Array<File>;

    constructor(private ownerService: OwnerService, private modal: ModalComponent, private fileService: FileService) {
        this.owner = new Owner;
        this.owner.files = [];
        this.fileList = [];
        this.tableParams = {
            page: 1,
            sort: 1,
            sortType: "DESC",
            limit: 20,
            search: ''
        };
        this.advancedPagination = 1;
    }

    ngOnInit() {
        this.getOwners();
        this.ownerCancel();
        this.frequencyList = Settings.PAYMENT_FREQUENCY;
        this.paymentMethodsList = Settings.PAYMENT_METHOD;
        this.statusList = Settings.OWNER_STATUS;
    }

    getOwners(): void {
        this.ownerService.getOwners(this.tableParams)
            .subscribe(
                response => {
                    this.ownerList = response.owners;
                    this.collectionSize = response.count;
                },
                error => this.errorMessage = <any>error
            );
    }

    getOwner(id: number) {
        return this.ownerService.getOwner(id)
            .subscribe(
                response => {
                    this.owner = response;

                    if (this.owner.fileGrp) {
                        this.getFileInfo();
                    }
                },
                error => this.errorMessage = <any>error,
            );
    }

    deleteOwner(id: number): void {
        this.modal.openMessage('Delete Owner', 'A you sure?', 1)
            .then(result => {
                if (result) {
                    this.ownerService.deleteOwner(id)
                        .subscribe(
                            response => this.result = response,
                            error => this.errorMessage = <any>error,
                            () => {
                                this.getOwners();
                            }
                        );
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    ownerSave(): void {
        if (this.owner.firstName && this.owner.lastName) {
            if (this.owner.id) {
                this.ownerService.updateOwner(this.owner)
                    .subscribe(
                        response => this.result = response,
                        error => this.errorMessage = <any>error,
                        () => {
                            this.getOwners();
                            this.ownerCancel();
                        }
                    );
            } else {
                this.ownerService.addOwner(this.owner)
                    .subscribe(
                        response => this.result = response,
                        error => this.errorMessage = <any>error,
                        () => {
                            this.getOwners();
                            this.ownerCancel();
                        }
                    );
            }
        }
    }

    getFileInfo(): void {
        this.fileService.getFiles(this.owner.fileGrp)
            .subscribe(
                (res) => {
                    this.owner.files = [];
                    if (res.length > 0) {
                        for (let i = 0; i < res.length; i++) {
                            this.owner.files[i] = res[i].filename;
                        }
                    }
                })
    }

    deleteFile(filename): void {
        this.fileService.deleteFile(filename)
            .subscribe(
                (res) => {
                    this.getFileInfo();
                },
                (error) => {
                    console.log(error);
                })
    }

    fileChangeEvent(event) {
        let formData: FormData = new FormData();
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {

            for (let i = 0; i < fileList.length; i++) {
                let file: File = fileList[i];
                formData.append('files', file, file.name);
            }
        }

        formData.append('type', 1);
        if (this.owner.fileGrp) {
            formData.append('fileGrp', this.owner.fileGrp);
        }
        this.fileService.uploadFiles(formData)
            .subscribe(
                (res) => {
                    this.owner.fileGrp = res;
                    this.getFileInfo();
                },
                (error) => {
                    console.log(error);
                })
    }

    editOwner(id: number): void {
        this.getOwner(id);
        document.body.scrollTop = 0;
    }

    ownerCancel(): void {
        this.owner.id = null;
        this.owner.firstName = "";
        this.owner.lastName = "";
        this.owner.shippingAddress = "";
        this.owner.billingAddress = "";
        this.owner.phone = "";
        this.owner.email = "";
        this.owner.paymentMethod = null;
        this.owner.frequency = null;
        this.owner.status = null;
        this.owner.password = "";
        this.owner.files = [];
        this.owner.fileGrp = null;
    }

    searchFilter(): void {
        if (this.tableParams.search.length > 3 || this.tableParams.search == '') {
            this.getOwners();
        }
    }

    changePage(page: number): void {
        this.tableParams.page = page;
        this.getOwners();
    }

    sortField(field: number): void {
        this.tableParams.sort = field;
        if (this.tableParams.sortType == "ASC") {
            this.tableParams.sortType = "DESC";
        } else {
            this.tableParams.sortType = "ASC";
        }
        this.getOwners();
    }

}
