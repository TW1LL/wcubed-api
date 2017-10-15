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

         public name?: string;

         public length?: number;

         public width?: number;

         public height?: number;

         public predefined_package?: string;

    public weight?: number;


         public orderItems: OrderItem[];

         public products: Product[];

}

export class Parcel {
    constructor(packaging: Package, weight: number) {
        this.length = packaging.length;
        this.width = packaging.width;
        this.height = packaging.height;
        this.predefined_package = packaging.predefined_package;
        this.weight = weight;
    }

    public length?: number;

    public width?: number;

    public height?: number;

    public predefined_package?: string;

    public weight?: number;

}


    
 export class Product {
    public static joins: any = [['category', Category], ['prodPackaging', Package]];

         public id: number;

         public category: Category;

         public prodPackaging: Package;

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
         public id?: number;

         public name: string;

         public user?: User;

         public orders?: Order[];

         public companyName?: string;

         public street1: string;

         public street2?: string;

         public city: string;

         public state: string;

         public zip: string;

         public country: string;

         public email: string;

    public mode?: string;

         public residential: boolean;


}

    export class OrderShipment {
    constructor(shipmentId: string, rateId?: string, price?: number) {
        this.shipmentId = shipmentId;
        this.rateId = rateId;
        this.price = price;
    }

         public id: string;

         public shipmentId: string;

         public rateId: string;

         public label?: string;

         public carrier?: string;

         public service?: string;

         public tracking?: string;

         public shipped?: boolean;

         public price: number;

}

       export class OrderItem {
    public static joins: any = [['product', Product], ['packaging', Package], ['shipment', OrderShipment]];

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

         public stripeToken: string;

         public paymentId: string;

         public currency: string;

         public paid: boolean;

         public amount: number;

         public balanceTrans: string;
}

import {
    Column, CreateDateColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, OneToOne,
    JoinColumn
} from 'typeorm';
       export class Order {
    public static joins: any = [['user', User], ['items', OrderItem], ['address', Address], ['payment', Payment]];
    public static permissions: rankTitle = rankTitle.Mod;

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

