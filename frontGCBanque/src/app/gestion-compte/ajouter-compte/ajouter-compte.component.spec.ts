import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterCompteComponent } from './ajouter-compte.component';

describe('AjouterCompteComponent', () => {
  let component: AjouterCompteComponent;
  let fixture: ComponentFixture<AjouterCompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterCompteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
