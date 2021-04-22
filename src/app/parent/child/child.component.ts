import { Component, HostListener, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EShop, Sizes } from 'src/app/e-shop.interface';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {
  // holds the value of selected product from parent component
  public product!: EShop;
  // boolean to expand and collapse social media icons
  public isExpanded!: boolean;
  // boolean to align elements on small screen
  public smallScreen!: boolean;

  constructor(private activeModal: NgbActiveModal) { }

  /**
   * method to initialize the component
   * @returns void
   */
  public ngOnInit(): void { }

  /**
   * method to close the modal
   * @returns void
   */
  public closeModal(): void {
    this.activeModal.dismiss();
  }

  /**
   * method to expand and collapse social media icons
   * @returns void
   */
  public expandSocialMedia(): void {
    this.isExpanded = !this.isExpanded;
  }

  /**
   * method to select the size of product
   * @param size Sizes
   * @param product EShop
   * @returns void
   */
  public selectedSize(size: Sizes, product: Sizes[]): void {
    product.forEach((size: any) => {
      size.selected = false;
    });
    size.selected = !size.selected;
  }

  /**
   * method to detect resizing of screen and asjust elements accordingly
   */
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.smallScreen = this.isExpanded = window.innerWidth <= 768;
  }

}
