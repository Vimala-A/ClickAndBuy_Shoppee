export class Product {
    id: number;
    title: string;
    price: number;
    image: string;
    description: string;
    quantity: number = 1;
    category?: string;
    rating?: ProductRating;
    total: number = 0;
    constructor(obj?: any) {
        this.id = obj?.id;
        this.title = obj?.title;
        this.price = obj?.price;
        this.image = obj?.image;
        this.description = obj?.description;
        this.category = obj?.category;
        this.rating = new ProductRating(obj?.rating);
        this.total = obj?.total ||  obj?.price;
        this.quantity = obj?.quantity || 1;
    }

    public incQuantity(): void {
        this.quantity++;
        if(this.quantity > 1) {
          this.total = this.quantity * this.price;
        }
    }
    
    public decQuantity(): void {
        if(this.quantity <=1) {
            return;
        }
        this.quantity--;
          this.total = this.quantity * this.price;
    }
}

export class ProductRating {
    count:number;
    rate: number;
    constructor(obj: any) {
        this.count = obj?.count;
        this.rate = obj?.rate;
    }
}