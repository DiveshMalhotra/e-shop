import { Component, HostListener, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {

  product: any;

  isExpanded!: boolean;

  smallScreen!: boolean;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void { }

  public closeModal(): void {
    this.activeModal.dismiss();
  }

  public expandSocialMedia(): void {
    this.isExpanded = !this.isExpanded;
  }

  public selectedSize(size: any, product: any): void {
    product.forEach((size: any) => {
      size.selected = false;
    });
    size.selected = !size.selected;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.smallScreen = this.isExpanded = window.innerWidth <= 768;
  }

}
