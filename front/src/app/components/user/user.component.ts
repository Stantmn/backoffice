import {Component, OnInit} from '@angular/core';
import {User} from '../../classes/user';
import {UserService} from '../../services/user.service';
import {Settings} from '../../constants/settings';
import {ModalComponent} from "../../shared/modules/modal/modal.component";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    providers: [UserService]
})
export class UserComponent implements OnInit {
    public userList: User[] = [];
    private user: User;
    private errorMessage: any;
    private result: any;
    private roles: {};
    private tableParams: any;
    private advancedPagination: number;
    private collectionSize: number;
    private showFormFlag: boolean;


    constructor(private userService: UserService, private modal: ModalComponent) {
        this.user = new User;
        this.tableParams = {
            page: 1,
            sort: 1,
            sortType: "DESC",
            limit: 20,
            search: ''
        };
        this.advancedPagination = 1;
        this.showFormFlag = false;
    }

    ngOnInit() {
        this.getUsers();
        this.userCancel();
        this.roles = Settings.USER_ROLES;
    }

    getUsers(): void {
        this.userService.getUsers(this.tableParams)
            .subscribe(
                response => {
                    this.userList = response.users;
                    this.collectionSize = response.count;
                },
                error => this.errorMessage = <any>error
            );
    }

    getUser(id: number) {
        return this.userService.getUser(id)
            .subscribe(
                response => {
                    this.user = response;
                },
                error => this.errorMessage = <any>error,
            );
    }

    userSave(): void {
        if (this.user.firstName && this.user.lastName) {
            if (this.user.id) {
                this.userService.updateUser(this.user)
                    .subscribe(
                        response => this.result = response,
                        error => this.errorMessage = <any>error,
                        () => {
                            this.getUsers();
                            this.userCancel();
                        }
                    );
            } else {
                this.userService.addUser(this.user)
                    .subscribe(
                        response => this.result = response,
                        error => this.errorMessage = <any>error,
                        () => {
                            this.getUsers();
                            this.userCancel();
                        }
                    );
            }
        }
    }

    editUser(id: number): void {
        this.setShowForm(!this.showFormFlag);
        this.getUser(id);
        document.body.scrollTop = 0;
    }

    deleteUser(id: number): void {
        this.modal.openMessage('Delete User', 'A you sure?', 1)
            .then(result => {
                if (result) {
                    this.userService.deleteUser(id)
                        .subscribe(
                            response => this.result = response,
                            error => this.errorMessage = <any>error,
                            () => {
                                this.getUsers();
                            }
                        );
                }
            })
            .catch(error => {
                console.log(error);
            });
    }


    userCancel(): void {
        this.user.id = null;
        this.user.firstName = "";
        this.user.lastName = "";
        this.user.email = "";
        this.user.role = null;
        this.user.password = "";
        this.showFormFlag = false;
    }

    setShowForm(flag: boolean): void {
        if (!flag) {
            this.userCancel();
        }else {
            this.showFormFlag = true;
        }
    }

    searchFilter(): void {
        if (this.tableParams.search.length > 3 || this.tableParams.search == '') {
            this.getUsers();
        }
    }

    changePage(page: number): void {
        this.tableParams.page = page;
        this.getUsers();
    }

    sortField(field: number): void {
        this.tableParams.sort = field;
        if (this.tableParams.sortType == "ASC") {
            this.tableParams.sortType = "DESC";
        } else {
            this.tableParams.sortType = "ASC";
        }
        this.getUsers();
    }

}
