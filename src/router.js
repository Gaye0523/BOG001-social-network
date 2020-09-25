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
import { logeado, publicacion, globalPublic, deletPublication, editPublic, goLike } from './lib/vistaLg.js';
import { centroLog } from './lib/vistaLg.js';
import { lista } from './lib/animes.js';
import { listaAnimes } from './lib/animes.js';
import { profile, publicHistory, publicGlobal, editPerfilPulication, deletPerfilPublication } from './lib/perfil.js';
import { event } from './lib/perfil.js';

const header = document.getElementById("header")
const medio = document.getElementById("vista")
const show = document.getElementById("show")


const router = async (route) => {
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
      header.innerHTML = "";
      vista.innerHTML = "";
      show.innerHTML = "";
      const vistaInicio2 = inicio();
      header.appendChild(vistaInicio2);
      vista.innerHTML = "";
      const vistaCentral2 = centro();
      vista.appendChild(vistaCentral2);
      const formLogin = login();
      show.appendChild(formLogin);
      validarLogin();
      observado();
      eventos();
      break;

    case '#/formularioRegistro':
      header.innerHTML = "";
      vista.innerHTML = "";
      show.innerHTML = "";
      const vistaInicio1 = inicio();
      header.appendChild(vistaInicio1);
      vista.innerHTML = "";
      const vistaCentral1 = centro();
      vista.appendChild(vistaCentral1);
      const formRegistro = registro();
      show.appendChild(formRegistro);
      validarRegistro();
      evento2();
      break;

    case '#/Login':
      header.innerHTML = "";
      vista.innerHTML = "";
      show.innerHTML = "";
      const headerLo = logeado();
      header.appendChild(headerLo);
      const cenVista = centroLog();
      vista.appendChild(cenVista);
      event();
      await globalPublic();
      await publicacion();
      await editPublic();
      await deletPerfilPublication();
      await goLike();

      break;

    case '#/Perfil':
      header.innerHTML = "";
      vista.innerHTML = "";
      show.innerHTML = "";
      const logeadoHed = logeado();
      header.appendChild(logeadoHed);
      const perfilVista = profile();
      vista.appendChild(perfilVista);
      event();
      observado();
      await publicGlobal();
      await publicHistory();
      await editPerfilPulication();
      await deletPerfilPublication();
      break;

    case '#/Animes':
      vista.innerHTML = "";
      show.innerHTML = "";
      header.innerHTML = "";
      const headerL = logeado();
      header.appendChild(headerL);
      const ini = lista();
      show.appendChild(ini);
      const lis = listaAnimes();
      vista.appendChild(lis);
      event();
      break;
    default:
      return console.log('# ERROR 404')
  }
}
export { router }
