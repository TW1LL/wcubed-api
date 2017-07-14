    export class UserAuth {
         public id: number;

              public user: User;

         public rank: number;

    get RankTitle() {
        return rankTitle[rankTitle[this.rank]];
    }

         public password: string;
}
export enum rankTitle {
    Guest,
    User,
    Mod,
    Admin,
    Owner
}

    
 export class User {
         public id: number;

         public email: string;

         public addresses: Address[];

         public orders: Order[];
}


   export class Category {
         public id: number;

         public name: string;

         public description: string;

         public thumbnail: string;

         public products: Product[];
}

   export class Package {
         public id: number;
         public name: string;
         public length: number;
         public width: number;
         public height?: number;

         public orderItems: OrderItem[];

}

    
 export class Product {
    public static joins: string[] = ['category'];

         public id: number;

         public category: Category;

              public packaging: Package[];

         public orderItems: OrderItem[];

         public name: string;

         public description: string;

         public price: number;

         public weight: number;

         public digital: boolean;

         public onHand: number;

         public hidden: boolean;

         public productionTime: number;

         public thumbnail: string;

         public images: string;



}


     export class Address {
         public id: number;

         public user: User;

         public orders: Order[];

         public firstName: string;

         public lastName: string;

         public companyName?: string;

         public streetAddress: string;

         public streetAddress2?: string;

         public city: string;

         public state: string;

         public zipCode: string;

         public country: string;

         public phone: string;

         public email: string;


}

       export class OrderItem {
    constructor(id: number = 0, product: Product = null, quantity: number = null) {
        this.product = product;
        this.quantity = quantity;
        this.id = id;
    }

         public id: number;

         public quantity: number;

              public product: Product;

              public packaging: Package;

              public shipment: OrderShipment;

              public order: Order;


}

   export class Payment {
         public id: string;

         public paymentId: string;

         public amount: number;
         public balanceTrans: string;
}

    export class OrderShipment {
         public id: string;

         public label: string;

         public tracking: string;

         public shipped: boolean;

}

       export class Order {
    public static joins: string[] = ['products'];

         public id: number;

         public user: User;

         public items: OrderItem[];

         public address: Address;

         public payment: Payment;

         public dateCreated: Date;

         public dateModified: Date;

         public description: string;

         public total: number;

}

