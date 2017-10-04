export class Order {
    id: number;
    customerId: number;
    customerName: string;
    shippingAddress: string;
    date: string;
    items: [any];
    itemCount: number;
    total: number;
    deliveryType: number;
    status: number;
}
