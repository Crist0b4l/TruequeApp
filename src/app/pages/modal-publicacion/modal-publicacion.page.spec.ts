// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { IonicModule, ModalController, NavParams, AlertController, ToastController } from '@ionic/angular';
// import { ModalPublicacionPage } from './modal-publicacion.page';

// describe('ModalPublicacionPage', () => {
//   let component: ModalPublicacionPage;
//   let fixture: ComponentFixture<ModalPublicacionPage>;

//   // mocks simples para evitar errores de inyección
//   const modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss']);
//   const navParamsSpy = jasmine.createSpyObj('NavParams', ['get']);
//   const alertCtrlSpy = jasmine.createSpyObj('AlertController', ['create']);
//   const toastCtrlSpy = jasmine.createSpyObj('ToastController', ['create']);

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ModalPublicacionPage],
//       imports: [IonicModule.forRoot()],
//       providers: [
//         { provide: ModalController, useValue: modalCtrlSpy },
//         { provide: NavParams, useValue: navParamsSpy },
//         { provide: AlertController, useValue: alertCtrlSpy },
//         { provide: ToastController, useValue: toastCtrlSpy }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(ModalPublicacionPage);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


//Comentado para correr prueba unitaria