import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FishiconComponent } from './fishicon.component';

describe('FishiconComponent', () => {
  let component: FishiconComponent;
  let fixture: ComponentFixture<FishiconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FishiconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FishiconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
