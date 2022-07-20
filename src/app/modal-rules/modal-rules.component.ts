import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { BackendApiService } from '../services/backend-api.service';

@Component({
  selector: 'app-modal-rules',
  templateUrl: './modal-rules.component.html',
  styleUrls: ['./modal-rules.component.css']
})
export class ModalRulesComponent implements OnInit {

  public closeResult = '';
  public changeMode: any;

  constructor(private modalService: NgbModal, private api: BackendApiService) { }

  ngOnInit(): void {
    this.api.currentChangeMode.subscribe((res) => {
      this.changeMode = res;
    });
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
}
