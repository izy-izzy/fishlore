import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMessageDialogComponent } from './modal-message.component';

describe('ModalMessageComponent', () => {
  let component: ModalMessageDialogComponent;
  let fixture: ComponentFixture<ModalMessageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMessageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
