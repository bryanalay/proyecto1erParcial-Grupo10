import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarTecnicoModalComponent } from './asignar-tecnico-modal.component';

describe('AsignarTecnicoModalComponent', () => {
  let component: AsignarTecnicoModalComponent;
  let fixture: ComponentFixture<AsignarTecnicoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsignarTecnicoModalComponent]
    });
    fixture = TestBed.createComponent(AsignarTecnicoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
