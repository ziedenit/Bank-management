import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationVirementComponent } from './operation-virement.component';

describe('OperationVirementComponent', () => {
  let component: OperationVirementComponent;
  let fixture: ComponentFixture<OperationVirementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationVirementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationVirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
