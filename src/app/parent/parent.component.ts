import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EshopService } from '../eshop.service';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ChildComponent } from './child/child.component';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {

  public data: any;

  public showMore!: boolean;

  private ngUnsubscribe: Subject<void>;

  constructor(
    private eshopService: EshopService,
    private modalService: NgbModal
  ) {
    this.data = [];
    this.ngUnsubscribe = new Subject<void>();
  }

  ngOnInit(): void {
    this.eshopService.getData().pipe(takeUntil(this.ngUnsubscribe.asObservable()))
      .subscribe((data) => {
        this.data = JSON.parse(JSON.stringify(data)).default;
      });
  }

  public productInFocus(product: any): void {
    product.selected = !product.selected;
  }

  public openModal(product: any): void {
    let productModal: NgbModalRef;
    const modalConfig: NgbModalOptions = {
      backdrop: 'static',
      windowClass: 'child-component-modal',
      keyboard: false,
      centered: true,
      size: 'lg'
    };
    productModal = this.modalService.open(ChildComponent, modalConfig);
    productModal.componentInstance.product = product;
  }
}
