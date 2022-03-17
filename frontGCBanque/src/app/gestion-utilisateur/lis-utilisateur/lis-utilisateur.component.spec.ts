import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LisUtilisateurComponent } from './lis-utilisateur.component';

describe('LisUtilisateurComponent', () => {
  let component: LisUtilisateurComponent;
  let fixture: ComponentFixture<LisUtilisateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LisUtilisateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LisUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
