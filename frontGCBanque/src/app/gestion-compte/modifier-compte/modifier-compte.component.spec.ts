import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierCompteComponent } from './modifier-compte.component';

describe('ModifierCompteComponent', () => {
  let component: ModifierCompteComponent;
  let fixture: ComponentFixture<ModifierCompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierCompteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
