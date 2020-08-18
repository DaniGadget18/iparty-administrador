import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerficarCodigoComponent } from './verficar-codigo.component';

describe('VerficarCodigoComponent', () => {
  let component: VerficarCodigoComponent;
  let fixture: ComponentFixture<VerficarCodigoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerficarCodigoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerficarCodigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
