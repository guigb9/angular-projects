import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {Product} from "./Product";
import {ProductService} from "./services/product.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list-component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = true;
  filteredProducts: Product[] = [];
  errorMessage: string = '';
  private _listFilter: string = '';
  sub!: Subscription;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.listFilter = 'cart'
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products
        this.filteredProducts = this.products
      },
      error: err => this.errorMessage = err
    });
  }


  products: Product[] = [];

  invertShowImage() {
    this.showImage = !this.showImage;
  }

  get listFilter(): string {
    return this._listFilter;
  };

  set listFilter(value: string){
    this._listFilter = value;
    this.filteredProducts = this.performFilter(this.listFilter);
  };

  onNotify(message: string): void{
    this.pageTitle = 'ProductList' + message;
  }


  performFilter(value: string): Product[] {
    value = this.listFilter.toLowerCase();
    return this.products.filter((product: Product) => product.productName.toLowerCase().includes(value));
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}

