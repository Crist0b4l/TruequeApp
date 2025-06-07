import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormPublicacionPage } from './form-publicacion.page';

describe('FormPublicacionPage', () => {
  let component: FormPublicacionPage;
  let fixture: ComponentFixture<FormPublicacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPublicacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
