import {Component, OnInit} from '@angular/core';
import {Order} from '../../classes/order';
import {OrderService} from '../../services/order.service';
import {FileService} from '../../services/file.service';
import {Settings} from '../../constants/settings';
import {ModalComponent} from "../../shared/modules/modal/modal.component";

@Component({
    moduleId: module.id,
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
    providers: [OrderService, FileService]
})

export class OrderComponent implements OnInit {
    public orderList: Order[] = [];
    private order: Order;
    private deliveryTypeList: {};
    private statusList: {};
    public tableParams: any;
    public advancedPagination: number;
    public collectionSize: number;
    public showFormFlag: boolean;


    constructor(private orderService: OrderService,
                private modal: ModalComponent) {
        this.order = new Order;
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
        this.getOrders();
        this.statusList = Settings.ORDER_STATUS;
        this.deliveryTypeList = Settings.DELIEVERY_TYPE;
    }

    getOrders(): void {
        this.orderService.getOrders(this.tableParams)
            .subscribe(
                response => {
                    this.orderList = response.orders;
                    this.collectionSize = response.count;
                },
                error => {
                    this.modal.openMessage('Server Error', 'Can\'t get list of orders', 0);
                    console.log(error);
                }
            );
    }

    getOrder(id: number) {
        return this.orderService.getOrder(id)
            .subscribe(
                response => {
                    this.order = response;
                },
                error => {
                    this.modal.openMessage('Server Error', 'Can\'t an order', 0);
                    console.log(error);
                }
            );
    }

    deleteOrder(id: number): void {
        this.modal.openMessage('Delete Order', 'A you sure?', 1)
            .then(result => {
                if (result) {
                    this.orderService.deleteOrder(id)
                        .subscribe(
                            response => {},
                            error => {
                                this.modal.openMessage('Server Error', 'Can\'t delete an order', 0);
                                console.log(error);
                            },
                            () => {
                                this.getOrders();
                            }
                        );
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    orderSave(): void {
        if (this.order.id) {
            this.orderService.updateOrder(this.order)
                .subscribe(
                    response => {
                    },
                    error => {
                        this.modal.openMessage('Server Error', 'Can\'t update an orders', 0);
                        console.log(error);
                    },
                    () => {
                        this.getOrders();
                    }
                );
        }
    }

    editOrder(id: number): void {
        this.getOrder(id);
        this.showFormFlag = !this.showFormFlag;
        document.body.scrollTop = 0;
    }

    setShowForm(flag: boolean): void {
        if (flag) {
            this.showFormFlag = true;
        }
    }

    searchFilter(): void {
        if (this.tableParams.search.length > 3 || this.tableParams.search == '') {
            this.getOrders();
        }
    }

    changePage(page: number): void {
        this.tableParams.page = page;
        this.getOrders();
    }

    sortField(field: number): void {
        this.tableParams.sort = field;
        if (this.tableParams.sortType == "ASC") {
            this.tableParams.sortType = "DESC";
        } else {
            this.tableParams.sortType = "ASC";
        }
        this.getOrders();
    }

}
