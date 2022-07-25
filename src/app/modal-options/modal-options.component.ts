import { Component, HostListener, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { BackendApiService } from '../services/backend-api.service';

@Component({
  selector: 'app-modal-options',
  templateUrl: './modal-options.component.html',
  styleUrls: ['./modal-options.component.css']
})
export class ModalOptionsComponent implements OnInit {

  public closeResult = '';
  public closeResultResponsiveModal = '';
  public changeMode: boolean = false;
  public enablePC: boolean = false;

  constructor(private modalService: NgbModal, private api: BackendApiService) { }

  ngOnInit(): void {
    this.api.currentChangeMode.subscribe((res) => {
      this.changeMode = res;
    });
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

  public changeModeFunction() {
    this.changeMode = !this.changeMode;
    this.api.changeMode.next(this.changeMode);
  }

}
