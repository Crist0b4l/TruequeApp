import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbserviceService {

  public db!: SQLiteObject;
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private toastController: ToastController) {
    this.initDatabase();
  }

  private initDatabase() {
    this.sqlite.create({
      name: 'mydatabase.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.db = db;
      this.createTables();
      this.isDBReady.next(true);
      this.presentToast('Base de datos y tabla creadas con éxito');
    }).catch(error => console.log(error));
  }

  private createTables() {
    this.db.executeSql(
      `CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario TEXT UNIQUE,
        password TEXT,
        nombre TEXT,
        apellido TEXT,
        fecha_nacimiento TEXT,
        telefono TEXT,
        comuna TEXT,
        email TEXT UNIQUE
      )`, []
    ).then(() => this.presentToast('Tabla de usuarios creada con éxito'))
     .catch(error => this.presentToast('Error al crear tabla: ' + error.message));
  }

  insertUsuario(usuario: {
    usuario: string;
    password: string;
    nombre: string;
    apellido: string;
    fecha_nacimiento: string;
    telefono: string;
    comuna: string;
    email: string;
  }): Promise<void> {
    const sql = `INSERT INTO usuarios (usuario, password, nombre, apellido, fecha_nacimiento, telefono, comuna, email)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const datos = [
      usuario.usuario,
      usuario.password,
      usuario.nombre,
      usuario.apellido,
      usuario.fecha_nacimiento,
      usuario.telefono,
      usuario.comuna,
      usuario.email
    ];

    return this.db.executeSql(sql, datos)
      .then(() => this.presentToast('Usuario registrado con éxito'))
      .catch(err => {
        this.presentToast('Error al registrar: ' + err.message);
        throw err;
      });
  }

  // Función devuelve objeto con usuario y email por separado
  async existeUsuario(usuario: string, email: string): Promise<{ usuarioExistente: boolean, emailExistente: boolean }> {
    const queryUsuario = `SELECT COUNT(*) as count FROM usuarios WHERE usuario = ?`;
    const queryEmail = `SELECT COUNT(*) as count FROM usuarios WHERE email = ?`;

    try {
      const [usuarioRes, emailRes] = await Promise.all([
        this.db.executeSql(queryUsuario, [usuario]),
        this.db.executeSql(queryEmail, [email])
      ]);

      const usuarioExistente = usuarioRes.rows.item(0).count > 0;
      const emailExistente = emailRes.rows.item(0).count > 0;

      return { usuarioExistente, emailExistente };
    } catch (err: any) {
      this.presentToast('Error al verificar existencia: ' + err.message);
      return { usuarioExistente: true, emailExistente: true }; // Para prevenir registros incorrectos
    }
  }
// funcion para obtener todos los usuarios y ver si quedaron regisados correctamente
  getUsuarios(): Promise<any[]> {
  const sql = `SELECT * FROM usuarios`;
  return this.db.executeSql(sql, []).then(res => {
    const usuarios: any[] = [];
    for (let i = 0; i < res.rows.length; i++) {
      usuarios.push(res.rows.item(i));
    }
    return usuarios;
  }).catch(err => {
    this.presentToast('Error al obtener usuarios: ' + err.message);
    return [];
  });
}

  validarLogin(usuario: string, password: string): Promise<boolean> {
    const sql = `SELECT * fROM usuarios WHERE usuario = ? AND password = ?`;
    return this.db.executeSql(sql, [usuario, password])
      .then(res => {
        if (res.rows.length > 0) {
          return true; // Login exitoso
        } else {
          this.presentToast('Usuario o contraseña incorrectos');
          return false; // Login fallido
        }
      })
      .catch(err => {
        this.presentToast('Error al validar login: ' + err.message);
        return false; // En caso de error, consideramos el login fallido
      });
  }

  actualizarUsuario(usuarioActual: string, nuevoUsuario: string, nuevaPassword: string): Promise<void> {
    const sql = `UPDATE usuarios SET usuario = ?, password = ? WHERE usuario = ?`;
    return this.db.executeSql(sql, [nuevoUsuario, nuevaPassword, usuarioActual])
      .then(() => this.presentToast('Perfil actualizado correctamente'))
      .catch(err => {
        this.presentToast('Error al actualizar perfil: ' + err.message);
        throw err;
      });
  }

  obtenerUsuario(usuario: string): Promise<any> {
  const sql = `SELECT * FROM usuarios WHERE usuario = ?`;
  return this.db.executeSql(sql, [usuario])
    .then(res => {
      if (res.rows.length > 0) {
        return res.rows.item(0);
      } else {
        throw new Error('Usuario no encontrado');
      }
    })
    .catch(err => {
      this.presentToast('Error al obtener usuario: ' + err.message);
      throw err;
    });
}


  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}


