
//Se importa la funcion de
import { router } from './router.js'

const first = () => {
  router(window.location.hash)
  window.addEventListener('hashchange', () => {
    router(window.location.hash)
  })
}

window.addEventListener('load', first)



/*guardar datos del formulario de registro*/

/*firebase*/

/* const singUp = document.querySelector('#formulario');

singUp.addEventListener('submit', (e) => {
  e.preventDefault();
  const Usuario = document.querySelector('#usuario').value;
  const Email = document.querySelector('#correo').value;
  const Password = document.querySelector('#password').value;
  console.log(Usuario, Email, Password)
  auth
    .createUserWithEmailAndPassword(Email, Password)
    .then(userCredential => {
      console.log('singup');
    })
})
 */

