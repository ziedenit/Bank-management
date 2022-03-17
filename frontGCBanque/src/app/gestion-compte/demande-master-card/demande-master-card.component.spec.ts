import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeMasterCardComponent } from './demande-master-card.component';

describe('DemandeMasterCardComponent', () => {
  let component: DemandeMasterCardComponent;
  let fixture: ComponentFixture<DemandeMasterCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeMasterCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeMasterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
