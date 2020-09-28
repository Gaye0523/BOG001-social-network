
//Se importa la funcion de
import { router } from './router.js'


const first = () => {
  router(window.location.hash)
  window.addEventListener('hashchange', () => {
    router(window.location.hash)
  })
}
history.pushState(null, document.title, location.href);
window.addEventListener('popstate', function (event) {
  history.pushState(null, document.title, location.href);
});

window.addEventListener('load', first)
