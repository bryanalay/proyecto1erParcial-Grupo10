import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiezasModalComponent } from './piezas-modal.component';

describe('PiezasModalComponent', () => {
  let component: PiezasModalComponent;
  let fixture: ComponentFixture<PiezasModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PiezasModalComponent]
    });
    fixture = TestBed.createComponent(PiezasModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
