import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifUtilisateurComponent } from './modif-utilisateur.component';

describe('ModifUtilisateurComponent', () => {
  let component: ModifUtilisateurComponent;
  let fixture: ComponentFixture<ModifUtilisateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifUtilisateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
