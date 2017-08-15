export class Settings {
    public static API_ENDPOINT: string = 'http://localhost:4200/api';
    public static PAYMENT_FREQUENCY: {} = [
        {value: 0, name: "Undefined"},
        {value: 1, name: "Monthly"},
        {value: 2, name: "Twice a year"},
        {value: 3, name: "Yearly"}
    ];
    public static PAYMENT_METHOD: {} = [
        {value: 0, name: "Undefined"},
        {value: 1, name: "Credit Card"},
        {value: 2, name: "Pay Check"},
        {value: 3, name: "Cash"}
    ];
    public static OWNER_STATUS: {} = [
        {value: 0, name: "Inactive"},
        {value: 1, name: "Active"},
        {value: 2, name: "Suspended"},
        {value: 3, name: "Deleted"}
    ];
    public static USER_ROLES: {} = [
        {value: 0, name: "Undefined"},
        {value: 1, name: "Admin"},
        {value: 2, name: "Operator"},
        {value: 3, name: "Read Only"}
    ];
}
