import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistarMenuComponent } from './registar-menu.component';

describe('RegistarMenuComponent', () => {
  let component: RegistarMenuComponent;
  let fixture: ComponentFixture<RegistarMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistarMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
