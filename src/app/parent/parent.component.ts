import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EshopService } from '../eshop.service';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ChildComponent } from './child/child.component';
import { EShop } from '../e-shop.interface';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit, OnDestroy {
  // holds the data of products
  public data: EShop[];
  // boolean to show and hide the show more badge on hover
  public showMore!: boolean;
  // subject for unsubscribing subscribers
  private ngUnsubscribe: Subject<void>;

  constructor(
    private eshopService: EshopService,
    private modalService: NgbModal
  ) {
    this.data = [];
    this.ngUnsubscribe = new Subject<void>();
  }

  /**
   * method to initialize the component
   * @returns void
   */
  public ngOnInit(): void {
    this.eshopService.getData().pipe(takeUntil(this.ngUnsubscribe.asObservable()))
      .subscribe((data) => {
        this.data = JSON.parse(JSON.stringify(data)).default;
      });
  }

  /**
   * holds the current hovered product
   * @param product EShop
   * @returns void
   */
  public productInFocus(product: EShop): void {
    product.selected = !product.selected;
  }

  /**
   * opens the modal and displays the selected product
   * @param product EShop
   * @returns void
   */
  public openModal(product: EShop): void {
    let productModal: NgbModalRef;
    const modalConfig: NgbModalOptions = {
      backdrop: 'static',
      windowClass: 'child-component-modal',
      keyboard: false,
      centered: true,
      size: 'lg',
      animation: true
    };
    productModal = this.modalService.open(ChildComponent, modalConfig);
    productModal.componentInstance.product = product;
    productModal.componentInstance.smallScreen = window.innerWidth <= 768;
  }

  /**
   * method to destroy the component
   * @returns void
   */
  public ngOnDestroy(): void {
    this.ngUnsubscribe.complete();
    this.ngUnsubscribe.subscribe();
  }
}
