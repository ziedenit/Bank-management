import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCreditComponent } from './gestion-credit.component';

describe('GestionCreditComponent', () => {
  let component: GestionCreditComponent;
  let fixture: ComponentFixture<GestionCreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionCreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
