import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationVersementComponent } from './operation-versement.component';

describe('OperationVersementComponent', () => {
  let component: OperationVersementComponent;
  let fixture: ComponentFixture<OperationVersementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationVersementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationVersementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
