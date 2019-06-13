import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFishListComponent } from './custom-fish-list.component';

describe('CustomFishListComponent', () => {
  let component: CustomFishListComponent;
  let fixture: ComponentFixture<CustomFishListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomFishListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFishListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
