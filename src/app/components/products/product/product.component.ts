import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Product, UserService } from 'src/app/services';
@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
    @Input() product: Product;
    @Output() deleteProduct = new EventEmitter<number>();
    public isAdmin: boolean = true;
    public displayStyle = "none";

    constructor(private router: Router, private userService: UserService) { }

    public ngOnInit(): void {
        this.isAdmin = this.userService.isAdminUser();
    }

    public viewDetails(): void {
        this.router.navigateByUrl(`products/detail/${this.product.id}`);
    }

    public getSrc(): string {

        return this.product.image.startsWith('http') ? this.product.image : '../../../assets/images/default-product-image.png'
    }

    public openDeleteAlert(ev: any): void {
        ev.stopPropagation()
        this.displayStyle = "block";
    }
    public closePopup(): void {
        this.displayStyle = "none";
    }

    public confirmDelete(): void {
        this.displayStyle = "none";
        this.deleteProduct.emit(this.product?.id);
    }
}
