import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialesModalComponent } from './materiales-modal.component';

describe('MaterialesModalComponent', () => {
  let component: MaterialesModalComponent;
  let fixture: ComponentFixture<MaterialesModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialesModalComponent]
    });
    fixture = TestBed.createComponent(MaterialesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
