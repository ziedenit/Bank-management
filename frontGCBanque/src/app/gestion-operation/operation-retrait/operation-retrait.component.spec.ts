import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationRetraitComponent } from './operation-retrait.component';

describe('OperationRetraitComponent', () => {
  let component: OperationRetraitComponent;
  let fixture: ComponentFixture<OperationRetraitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationRetraitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationRetraitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
