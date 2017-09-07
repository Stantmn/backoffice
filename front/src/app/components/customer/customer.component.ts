import {Component, OnInit} from '@angular/core';
import {Customer} from '../../classes/customer';
import {CustomerService} from '../../services/customer.service';
import {FileService} from '../../services/file.service';
import {Settings} from '../../constants/settings';
import {ModalComponent} from "../../shared/modules/modal/modal.component";

@Component({
    moduleId: module.id,
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.scss'],
    providers: [CustomerService, FileService]
})

export class CustomerComponent implements OnInit {
    public customerList: Customer[] = [];
    private customer: Customer;
    private errorMessage: any;
    private result: any;
    private statusList: {};
    private tableParams: any;
    private advancedPagination: number;
    private collectionSize: number;
    public fileList: Array<File>;
    private showFormFlag: boolean;

    constructor(private customerService: CustomerService, private modal: ModalComponent, private fileService: FileService) {
        this.customer = new Customer;
        this.customer.files = [];
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
        this.getCustomers();
        this.customerCancel();
        this.statusList = Settings.CUSTOMER_STATUS;
    }

    getCustomers(): void {
        this.customerService.getCustomers(this.tableParams)
            .subscribe(
                response => {
                    this.customerList = response.customers;
                    this.collectionSize = response.count;
                },
                error => this.errorMessage = <any>error
            );
    }

    getCustomer(id: number) {
        return this.customerService.getCustomer(id)
            .subscribe(
                response => {
                    this.customer = response;

                    if (this.customer.fileGrp) {
                        this.getFileInfo();
                    }
                },
                error => this.errorMessage = <any>error,
            );
    }

    deleteCustomer(id: number): void {
        this.modal.openMessage('Delete Customer', 'A you sure?', 1)
            .then(result => {
                if (result) {
                    this.customerService.deleteCustomer(id)
                        .subscribe(
                            response => this.result = response,
                            error => this.errorMessage = <any>error,
                            () => {
                                this.getCustomers();
                            }
                        );
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    customerSave(): void {
        if (this.customer.firstName && this.customer.lastName) {
            if (this.customer.id) {
                this.customerService.updateCustomer(this.customer)
                    .subscribe(
                        response => this.result = response,
                        error => this.errorMessage = <any>error,
                        () => {
                            this.getCustomers();
                            this.customerCancel();
                        }
                    );
            } else {
                this.customerService.addCustomer(this.customer)
                    .subscribe(
                        response => this.result = response,
                        error => this.errorMessage = <any>error,
                        () => {
                            this.getCustomers();
                            this.customerCancel();
                        }
                    );
            }
        }
    }

    getFileInfo(): void {
        this.fileService.getFiles(this.customer.fileGrp)
            .subscribe(
                (res) => {
                    this.customer.files = [];
                    if (res.length > 0) {
                        for (let i = 0; i < res.length; i++) {
                            this.customer.files[i] = res[i].filename;
                        }
                    }
                })
    }

    deleteFile(filename): void {
        this.fileService.deleteFile(filename)
            .subscribe(
                (res) => {
                    console.log(res);
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
        if (this.customer.fileGrp) {
            formData.append('fileGrp', this.customer.fileGrp);
        }
        this.fileService.uploadFiles(formData)
            .subscribe(
                (res) => {
                    this.customer.fileGrp = res;
                    this.getFileInfo();
                },
                (error) => {
                    console.log(error);
                })
    }

    editCustomer(id: number): void {
        this.getCustomer(id);
        this.showFormFlag = !this.showFormFlag;
        document.body.scrollTop = 0;
    }

    customerCancel(): void {
        this.customer.id = null;
        this.customer.firstName = "";
        this.customer.lastName = "";
        this.customer.billingAddress = "";
        this.customer.shippingDifferent = false;
        this.customer.shippingAddress = "";
        this.customer.phone = "";
        this.customer.email = "";
        this.customer.status = null;
        this.customer.password = "";
        this.customer.files = [];
        this.customer.fileGrp = null;
        this.showFormFlag = false;
    }

    setShowForm(flag: boolean): void {
        if (!flag) {
            this.customerCancel();
        }else {
            this.showFormFlag = true;
        }
    }

    searchFilter(): void {
        if (this.tableParams.search.length > 3 || this.tableParams.search == '') {
            this.getCustomers();
        }
    }

    changePage(page: number): void {
        this.tableParams.page = page;
        this.getCustomers();
    }

    sortField(field: number): void {
        this.tableParams.sort = field;
        if (this.tableParams.sortType == "ASC") {
            this.tableParams.sortType = "DESC";
        } else {
            this.tableParams.sortType = "ASC";
        }
        this.getCustomers();
    }

}
