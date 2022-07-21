import { Component, HostListener, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { BackendApiService } from '../services/backend-api.service';

@Component({
  selector: 'app-modal-rules',
  templateUrl: './modal-rules.component.html',
  styleUrls: ['./modal-rules.component.css']
})
export class ModalRulesComponent implements OnInit {

  public closeResult = '';
  public closeResultResponsiveModal = '';
  public changeMode: any;
  public innerWidth: any;

  constructor(private modalService: NgbModal, private api: BackendApiService) { }
  @HostListener('window:resize', ['$event'])
  ngOnInit(): void {
    this.api.currentChangeMode.subscribe((res) => {
      this.changeMode = res;
    });
    this.innerWidth = window.innerWidth;
  }

  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

  open(content: any) {
    this.modalService.open(content, {size: 'md'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  openResponsiveModal(modalResponsive: any) {
    this.modalService.open(modalResponsive, {fullscreen: true});
  }
}
