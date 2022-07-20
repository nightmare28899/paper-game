import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRulesComponent } from './modal-rules.component';

describe('ModalRulesComponent', () => {
  let component: ModalRulesComponent;
  let fixture: ComponentFixture<ModalRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRulesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
