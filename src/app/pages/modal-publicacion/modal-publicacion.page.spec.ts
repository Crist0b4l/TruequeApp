import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalPublicacionPage } from './modal-publicacion.page';

describe('ModalPublicacionPage', () => {
  let component: ModalPublicacionPage;
  let fixture: ComponentFixture<ModalPublicacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPublicacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
