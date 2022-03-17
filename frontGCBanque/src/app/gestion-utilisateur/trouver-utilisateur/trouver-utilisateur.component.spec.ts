import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrouverUtilisateurComponent } from './trouver-utilisateur.component';

describe('TrouverUtilisateurComponent', () => {
  let component: TrouverUtilisateurComponent;
  let fixture: ComponentFixture<TrouverUtilisateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrouverUtilisateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrouverUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
