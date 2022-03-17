import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageaccueilComponent } from './pageaccueil.component';

describe('PageaccueilComponent', () => {
  let component: PageaccueilComponent;
  let fixture: ComponentFixture<PageaccueilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageaccueilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageaccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
