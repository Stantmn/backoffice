export class Settings {
    public static API_ENDPOINT: string = 'http://localhost:4200/api';
    public static CATEGORIES: {} = [
        {value: 0, name: "Undefined"},
        {value: 1, name: "Toys"},
        {value: 2, name: "Books"},
        {value: 3, name: "Games"}
    ];
    public static PRODUCT_STATUS: {} = [
        {value: 0, name: "Hide"},
        {value: 1, name: "Show"},
    ];
    public static CUSTOMER_STATUS: {} = [
        {value: 0, name: "Undefined"},
        {value: 1, name: "Active"},
        {value: 2, name: "Inactive"},
    ];
    public static USER_ROLES: {} = [
        {value: 0, name: "Undefined"},
        {value: 1, name: "Admin"},
        {value: 2, name: "Operator"},
        {value: 3, name: "Read Only"}
    ];
}
