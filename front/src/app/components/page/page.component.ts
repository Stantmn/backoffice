import {Component, OnInit} from '@angular/core';
import {PageService} from '../../services/page.service';
import {Page} from '../../classes/page';
import {ModalComponent} from "../../shared/modules/modal/modal.component";
import {FileService} from "../../services/file.service";

@Component({
    moduleId: module.id,
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.scss'],
    providers: [PageService, FileService]
})

export class PageComponent implements OnInit {
    public pageList: Page[] = [];
    public page: Page;
    private errorMessage: any;
    private result: any;
    public fileList: Array<File>;
    public tableParams: any;
    public advancedPagination: number;
    public collectionSize: number;

    constructor(private pageService: PageService, private modal: ModalComponent, private fileService: FileService) {
        this.page = new Page;
        this.page.files = [];
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
        this.getPages();
    }

    getPages(): void {
        this.pageService.getPages(this.tableParams)
            .subscribe(
                response => {
                    this.pageList = response.pages;
                    this.collectionSize = response.count;
                },
                error => this.errorMessage = <any>error
            );
    }

    getPage(id: number) {
        return this.pageService.getPage(id)
            .subscribe(
                response => {
                    this.page = response;

                    if (this.page.fileGrp) {
                        this.getFileInfo();
                    }
                },
                error => this.errorMessage = <any>error,
            );
    }

    deletePage(id: number): void {
        this.modal.openMessage('Delete Page', 'A you sure?', 1)
            .then(result => {
                if (result) {
                    this.pageService.deletePage(id)
                        .subscribe(
                            response => this.result = response,
                            error => this.errorMessage = <any>error,
                            () => {
                                this.getPages();
                            }
                        );
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    pageSave(): void {
        if (this.page.text && this.page.title) {
            if (this.page.id) {
                this.pageService.updatePage(this.page)
                    .subscribe(
                        response => this.result = response,
                        error => this.errorMessage = <any>error,
                        () => {
                            this.getPages();
                            this.pageCancel();
                        }
                    );
            } else {
                this.pageService.addPage(this.page)
                    .subscribe(
                        response => this.result = response,
                        error => this.errorMessage = <any>error,
                        () => {
                            this.getPages();
                            this.pageCancel();
                        }
                    );
            }
        }
    }

    getFileInfo(): void {
        this.fileService.getFiles(this.page.fileGrp)
            .subscribe(
                (res) => {
                    this.page.files = [];
                    if (res.length > 0) {
                        for (let i = 0; i < res.length; i++) {
                            this.page.files[i] = res[i].filename;
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
        if (this.page.fileGrp) {
            formData.append('fileGrp', this.page.fileGrp);
        }
        this.fileService.uploadFiles(formData)
            .subscribe(
                (res) => {
                    this.page.fileGrp = res;
                    this.getFileInfo();
                },
                (error) => {
                    console.log(error);
                })
    }

    editPage(id: number): void {
        this.getPage(id);
        document.body.scrollTop = 0;
    }


    searchFilter(): void {
        if (this.tableParams.search.length > 3 || this.tableParams.search == '') {
            this.getPages();
        }
    }

    changePage(page: number): void {
        this.tableParams.page = page;
        this.getPages();
    }

    sortField(field: number): void {
        this.tableParams.sort = field;
        if (this.tableParams.sortType == "ASC") {
            this.tableParams.sortType = "DESC";
        } else {
            this.tableParams.sortType = "ASC";
        }
        this.getPages();
    }

    pageCancel() {
        this.page.id = null;
        this.page.title = "";
        this.page.text = "";
        this.page.files = [];
        this.page.fileGrp = null;
    }

}
