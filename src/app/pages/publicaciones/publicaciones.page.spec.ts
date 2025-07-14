import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicacionesPage } from './publicaciones.page';
import { ModalController, AlertController } from '@ionic/angular';

describe('PublicacionesPage', () => {
  let component: PublicacionesPage;
  let fixture: ComponentFixture<PublicacionesPage>;

  beforeEach(async () => {
    const modalCtrlSpy = jasmine.createSpyObj('ModalController', ['create']);
    const alertCtrlSpy = jasmine.createSpyObj('AlertController', ['create']);

    await TestBed.configureTestingModule({
      declarations: [PublicacionesPage],
      providers: [
        { provide: ModalController, useValue: modalCtrlSpy },
        { provide: AlertController, useValue: alertCtrlSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PublicacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
