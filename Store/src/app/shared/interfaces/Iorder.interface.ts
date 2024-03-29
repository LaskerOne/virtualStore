export interface Idetails{

    productId: number;
    productName: string;
    quantity: number;
}

export interface Iorder {

    name: string;
    shippingAdres: string;
    city: string;
    date: string;
    isDelivery: boolean;
    id: number;
}

export interface IdetailsOrders {

    details: Idetails[];
    orderId: number;
}