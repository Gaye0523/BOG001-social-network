
//Aqui importamos el objeto que manipula los js de los formularios
/* import { myFunction } from './lib/index.js'; myFunction(); */
import login from './lib/login.js';
import { eventos } from './lib/login.js';
import { inicio } from './lib/header.js';
import { centro } from './lib/header.js';
import { registro } from './lib/registro.js';
import { evento2 } from './lib/registro.js';
import { validarRegistro } from './lib/registro.js';
import { validarLogin } from './lib/login.js';
import { observado } from './lib/login.js';
/* import { validationFirebase } from './lib/registro.js'; */


const header = document.getElementById("header")
const medio = document.getElementById("vista")
const show = document.getElementById("show")


const router = (route) => {
  switch (route) {
    case '':
      show.innerHTML = "";
      const vistaInicio = inicio();
      header.appendChild(vistaInicio);
      vista.innerHTML = "";
      const vistaCentral = centro();
      vista.appendChild(vistaCentral);
      break;

    case '#/formulario':
      show.innerHTML = "";
      const formLogin = login();
      show.appendChild(formLogin);
      validarLogin();
      observado();
      eventos();
      break;

    case '#/formularioRegistro':
      const formRegistro = registro();
      show.appendChild(formRegistro);
      validarRegistro();
      evento2();
      break;
    default:
      return console.log('# ERROR 404')
  }
}
export { router }
