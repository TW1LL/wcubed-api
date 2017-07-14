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

}

   
 export class Product {
    public static joins: string[] = ['category'];

         public id: number;

         public name: string;

         public category: Category;

         public description: string;

         public price: number;

         public weight: number;

         public digital: boolean;

         public onHand: number;

         public hidden: boolean;

         public productionTime: number;

         public thumbnail: string;

         public images: string;

         public orderProducts: OrderItem[];

}


     export class Address {
         public id: number;

         public user: User;

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

         public orders: Order[];

}

     export class OrderItem {
    constructor(id: number = 0, product: Product = null, quantity: number = null, order: Order = null) {
        this.id = id;
        this.product = product;
        this.quantity = quantity;
        this.order = order;
    }
         public id: number;

         public product: Product;

         public quantity: number;

    // public packaging: Package;
    // public shipment: OrderShipment;

         public order: Order;
}

   export class Payment {
         public id: string;
         public amount: number;
         public balanceTrans: string;
}

    export class OrderShipment {
         public id: string;
         public label: string;
         public tracking: string;
         public shipped: boolean;

         public order: Order;
}

         export class Order {
    public static joins: string[] = ['products'];

         public id: number;

         public user: User;

         public items: OrderItem[];

         public address: Address;

         public shipments: OrderShipment[];

         public dateCreated: Date;

         public dateModified: Date;

         public description: string;

         public total: number;

         public payment: Payment;

}

