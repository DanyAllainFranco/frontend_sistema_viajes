import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalComponent } from './sucursal.component';

describe('ReporteViajeComponent', () => {
  let component: SucursalComponent;
  let fixture: ComponentFixture<SucursalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SucursalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
