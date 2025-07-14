import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalController, ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { FormPublicacionPage } from './form-publicacion.page';


describe('FormPublicacionPage', () => {

  let component: FormPublicacionPage;
  let fixture: ComponentFixture<FormPublicacionPage>;
  let modalCtrlSpy: jasmine.SpyObj<ModalController>;
  let toastCtrlSpy: jasmine.SpyObj<ToastController>;


    beforeEach(async () => {
    modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss']);
    toastCtrlSpy = jasmine.createSpyObj('ToastController', ['create']);

    await TestBed.configureTestingModule({
      declarations: [FormPublicacionPage],
      providers: [
        { provide: ModalController, useValue: modalCtrlSpy },
        { provide: ToastController, useValue: toastCtrlSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormPublicacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })


  it('Debería crear el componente', () => {
    expect(component).toBeTruthy();
  })

  it('Debería cerrar el modal al llamar a cerrar', () => {
    component.cerrar();
    expect(modalCtrlSpy.dismiss).toHaveBeenCalled();
  });

  it('Deberia mostrar un toast si los campos estan incompletos', async () => {

    // Simular campos incompletos
    component.titulo = '';
    component.descripcion = '';
    component.intercambio = '';
    component.tipo = '';
    component.categoria = '';
    component.comuna = '';
    component.imagenDataUrl = '';


    const toastSpy = jasmine.createSpyObj('HTMLIonToastElement', ['present']);
    toastCtrlSpy.create.and.resolveTo(toastSpy);

    await component.publicar();

    expect(toastCtrlSpy.create).toHaveBeenCalledWith({
      message: 'Por favor completa todos los campos y selecciona una imagen.',
      duration: 2500,
      color: 'danger'
    });

    expect(toastSpy.present).toHaveBeenCalled();


    expect(modalCtrlSpy.dismiss).not.toHaveBeenCalled();
  })

  it('debería establecer la comuna si se obtiene la ubicación', async () => {
    // Mock de Geolocation.getCurrentPosition
    spyOn<any>(navigator.geolocation, 'getCurrentPosition')
      .and.callFake((success: any) => {
        success({
          coords: {
            latitude: -33.45,
            longitude: -70.6667
          }
        });
      });

    spyOn(component, 'obtenerComunaDesdeCoords')
      .and.resolveTo('Providencia');

    await component.obtenerUbicacion();

    expect(component.comuna).toBe('Providencia');
  });

  it('debería devolver la comuna obtenida desde la API', async () => {
    // Simula fetch devolviendo datos
    spyOn(window, 'fetch').and.resolveTo({
      json: async () => ({
        address: { city: 'Las Condes' }
      })
    } as Response);

    const comuna = await component.obtenerComunaDesdeCoords(-33.4, -70.6);

    expect(comuna).toBe('Las Condes');
  });

  it('debería devolver null si no encuentra comuna', async () => {
    spyOn(window, 'fetch').and.resolveTo({
      json: async () => ({})
    } as Response);

    const comuna = await component.obtenerComunaDesdeCoords(-33.4, -70.6);
    expect(comuna).toBeNull();
  });




  it('debería llamar a dismiss con datos si todos los campos están completos', async () => {
    // Simula datos válidos
    component.titulo = 'Título prueba';
    component.descripcion = 'Descripción prueba';
    component.intercambio = 'Cosa por intercambiar';
    component.tipo = 'Ofrece';
    component.categoria = 'Juguetes';
    component.comuna = 'Ñuñoa';
    component.imagenDataUrl = 'data:image/png;base64,AAA';

    await component.publicar();

    expect(modalCtrlSpy.dismiss).toHaveBeenCalledWith({
      tipo: 'Ofrece',
      titulo: 'Título prueba',
      descripcion: 'Descripción prueba',
      intercambio: 'Cosa por intercambiar',
      usuario: 'Tú',
      comuna: 'Ñuñoa',
      categoria: 'Juguetes',
      imagen: 'data:image/png;base64,AAA'
    }, 'confirm');

    expect(toastCtrlSpy.create).not.toHaveBeenCalled();
  });



});




// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { FormPublicacionPage } from './form-publicacion.page';

// describe('FormPublicacionPage', () => {
//   let component: FormPublicacionPage;
//   let fixture: ComponentFixture<FormPublicacionPage>;

//   beforeEach(() => {
//     fixture = TestBed.createComponent(FormPublicacionPage);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
