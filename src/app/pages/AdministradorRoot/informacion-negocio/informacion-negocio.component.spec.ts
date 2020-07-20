import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionNegocioComponent } from './informacion-negocio.component';

describe('InformacionNegocioComponent', () => {
  let component: InformacionNegocioComponent;
  let fixture: ComponentFixture<InformacionNegocioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacionNegocioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
