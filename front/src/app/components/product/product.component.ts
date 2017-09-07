import {Component, OnInit} from '@angular/core';
import {Product} from '../../classes/product';
import {ProductService} from '../../services/product.service';
import {FileService} from '../../services/file.service';
import {Settings} from '../../constants/settings';
import {ModalComponent} from "../../shared/modules/modal/modal.component";

@Component({
    moduleId: module.id,
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    providers: [ProductService, FileService]
})

export class ProductComponent implements OnInit {
    public productList: Product[] = [];
    private product: Product;
    private errorMessage: any;
    private result: any;
    private categoryList: {};
    private statusList: {};
    private tableParams: any;
    private advancedPagination: number;
    private collectionSize: number;
    public fileList: Array<File>;
    private showFormFlag: boolean;


    constructor(
        private productService: ProductService,
        private modal: ModalComponent,
        private fileService: FileService
    ) {
        this.product = new Product;
        this.product.files = [];
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
        this.getProducts();
        this.productCancel();
        this.statusList = Settings.PRODUCT_STATUS;
        this.categoryList = Settings.CATEGORIES;
    }

    getProducts(): void {
        this.productService.getProducts(this.tableParams)
            .subscribe(
                response => {
                    this.productList = response.products;
                    this.collectionSize = response.count;
                },
                error => this.errorMessage = <any>error
            );
    }

    getProduct(id: number) {
        return this.productService.getProduct(id)
            .subscribe(
                response => {
                    this.product = response;

                    if (this.product.fileGrp) {
                        this.getFileInfo();
                    }
                },
                error => this.errorMessage = <any>error,
            );
    }

    deleteProduct(id: number): void {
        this.modal.openMessage('Delete Product', 'A you sure?', 1)
            .then(result => {
                if (result) {
                    this.productService.deleteProduct(id)
                        .subscribe(
                            response => this.result = response,
                            error => this.errorMessage = <any>error,
                            () => {
                                this.getProducts();
                            }
                        );
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    productSave(): void {
        if (this.product.name && this.product.description && this.product.cost) {
            if (this.product.id) {
                this.productService.updateProduct(this.product)
                    .subscribe(
                        response => this.result = response,
                        error => this.errorMessage = <any>error,
                        () => {
                            this.getProducts();
                            this.productCancel();
                        }
                    );
            } else {
                this.productService.addProduct(this.product)
                    .subscribe(
                        response => this.result = response,
                        error => this.errorMessage = <any>error,
                        () => {
                            this.getProducts();
                            this.productCancel();
                        }
                    );
            }
        }
    }

    getFileInfo(): void {
        this.fileService.getFiles(this.product.fileGrp)
            .subscribe(
                (res) => {
                    this.product.files = [];
                    if (res.length > 0) {
                        for (let i = 0; i < res.length; i++) {
                            this.product.files[i] = res[i].filename;
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
        if (this.product.fileGrp) {
            formData.append('fileGrp', this.product.fileGrp);
        }
        this.fileService.uploadFiles(formData)
            .subscribe(
                (res) => {
                    this.product.fileGrp = res;
                    this.getFileInfo();
                },
                (error) => {
                    console.log(error);
                })
    }

    editProduct(id: number): void {
        this.getProduct(id);
        this.showFormFlag = !this.showFormFlag;
        document.body.scrollTop = 0;
    }

    productCancel(): void {
        this.product.id = null;
        this.product.name = "";
        this.product.description = "";
        this.product.cost = null;
        this.product.status = null;
        this.product.files = [];
        this.product.fileGrp = null;
        this.showFormFlag = false;
    }

    setShowForm(flag: boolean): void {
        if (!flag) {
            this.productCancel();
        } else {
            this.showFormFlag = true;
        }
    }

    searchFilter(): void {
        if (this.tableParams.search.length > 3 || this.tableParams.search == '') {
            this.getProducts();
        }
    }

    changePage(page: number): void {
        this.tableParams.page = page;
        this.getProducts();
    }

    sortField(field: number): void {
        this.tableParams.sort = field;
        if (this.tableParams.sortType == "ASC") {
            this.tableParams.sortType = "DESC";
        } else {
            this.tableParams.sortType = "ASC";
        }
        this.getProducts();
    }

}
