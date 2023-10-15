export interface IItem {
    id ?: string;
    itemName ?: string;
    price ?: number;
    quantity ?: number
}

export interface IBill {
    customerMobile ?: string;
    billNo ?: string;
    amount ?: number;
    billDate ?: string;
    cashier ?: string;
    counter ?: number;
    mode ?: string;
    items ?: Array<IItem>
}
