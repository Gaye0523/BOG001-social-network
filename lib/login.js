import { router } from "../router.js";

export default () => {
  const template =
    ` <!-- Formulario Login -->
    <form action="" class="form" id="form">
      <div class="containerLogin" id="containerLogin">
        <div id='form-box' class="form-box">
          <div class="button-box">
            <a href="#" id="close-login" class="close-login"><i class="fas fa-times"></i></a>
            <button type="button" class="toggle-btn">INGRESO</button>
          </div>

          <!-- Grupo Usuario -->
          <div class="form__group " id="group__user">
            <label for="user" class="label__form">Correo</label>
            <div class="form__group-input">
              <input type="text" class="input-field1" name="user" id="user" placeholder="correo electronico">
              <i class="form__valitation-status fas fa-times-circle"></i>
            </div>
            <p class="form__input-error">El correo solo puede contener letras, numeros, puntos, guiones y guion
              bajo..</p>
          </div>

          <!-- Grupo Password -->
          <div class="form__group" id="group__password">
            <label for="password0" class="label__form">Contraseña</label>
            <div class="form__group-input">
              <input type="password" class="input-field1" name="password0" id="password0" placeholder="contraseña">
              <i class="form__valitation-status fas fa-times-circle"></i>
            </div>
            <img src = "Imagenes/ver.svg" class="eye" id="boton">
            <p class="form__input-error">La contraseña tiene que ser de 6 a 12 dígitos.</p>
          </div>

          <!-- Grupo Recordarme -->
          <div class="form__group" id="group__remember">
            <label class="label__form" id="">
              <input type="checkbox" class="checkbox__form" name="remember" id="remember">Recordarme
            </label>
          </div>
          <div class="local" id="local"></div>
          <div class="msj__form" id="msj__form">
            <p id="error"><i class="fas fa-bomb"></i> <b >Error:</b> Por favor rellena el formulario correctamente.</p>
          </div>
          <div class="exito" id="exito">
            <p class="mensaje-exito" id="mensaje-exito">Formulario enviado exitosamente!</p>
          </div>
          <!-- Grupo Redes sociales -->
          <div class="redes-sociales">
            <p class="access"> O ACCEDE CON: </p>
            <div class="container-redes">
            <button type="button" id="facebook">
            <img src="Imagenes/facebook.svg" alt="icono-facebook" class="btnImg">
            </button>
            <button type="button" id="google">
            <img src="Imagenes/ui.svg" alt="icono-google" class="btnImg1">
            </button>
            </div>
            <p class="access">¿OLVIDASTE TU CONTRASEÑA?</p>
          </div>

          <!--Grupo boton-->
          <div class="form__group form__group-btn-acceder">
          <a href="#" id="submit-btn1" class="submit-btn1">ACCEDER</a>
          </div>
        </div>
      </div>
    </form>
`

  const vistaDom = document.createElement("div")
  vistaDom.innerHTML = template;
  return vistaDom
}

export const eventos = () => {

  const close = document.querySelector("#close-login")
  close.addEventListener('click', () => {
    console.log("Cerro!")
    router("")
  })

  const botonEye = document.getElementById("boton");
  const eyePass = document.getElementById("password0");
  botonEye.addEventListener('click', () => {
    if (eyePass.type == "password") {
      eyePass.type = "text";
      botonEye.src = "Imagenes/eye-no.svg";
      setTimeout(() => {
        eyePass.type = "password";
        botonEye.src = "Imagenes/ver.svg";
      }, 3000)
    }
    else {
      eyePass.type = "password";
      botonEye.src = "Imagenes/ver.svg";
    }
  });

  const googleBtn = document.querySelector('#google')
  googleBtn.addEventListener('click', e => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
      .then(result => {
        redirectToLogin();
        swal.fire('bienvenido de nuevo')
      })
      .catch(err => {
        swal.fire("error");
      })
  })

  const facebookLogin = document.querySelector('#facebook')
  facebookLogin.addEventListener('click', e => {
    e.preventDefault();
    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider)
      .then(result => {
        redirectToLogin();
        swal.fire('facebook login')
      })
      .catch(err => {
        swal.fire((err))
      })
  })

  const signinForm = document.querySelector('#submit-btn1');
  signinForm.addEventListener('click', () => {
    const Usuario = document.querySelector('#user').value;
    const password = document.querySelector('#password0').value;
    auth
      .signInWithEmailAndPassword(Usuario, password)
      .then(userCredential => {
        redirectToLogin();
        swal.fire('Bienvenido de nuevo')
      })
      .catch(error => {
        swal.fire('Tu correo o contraseña estan mal')
      })
  })
}

export function observado() {
  auth.onAuthStateChanged(user => {
    if (user) {
      console.log('existe usuario activo')
      const displayName = user.displayName;
      const email = user.email;
      const emailVerified = user.emailVerified;
      const photoURL = user.photoURL;
      const isAnonymous = user.isAnonymous;
      const uid = user.uid;
      const providerData = user.providerData;
    }
    else {
      console.log('no existe usuario activo')
    }
  })
}

export function redirectToLogin() {
  window.location.hash = '#/Login';
}

export const validarLogin = () => {
  const formLogin = document.getElementById('form');
  const inpustLogin = document.querySelectorAll('#form input');
  const expresiones2 = {
    user: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password0: /^.{6,12}$/, // 4 a 12 digitos.
  }
  const validarLogin = (evento) => {
    switch (evento.target.name) {
      case "user":
        if (expresiones2.user.test(evento.target.value)) {
          document.getElementById('group__user').classList.remove('form__group-incorrecto');
          document.getElementById('group__user').classList.add('form__group-correcto');
          document.querySelector('#group__user i').classList.add('fa-check-circle');
          document.querySelector('#group__user i').classList.remove('fa-times-circle');
          document.querySelector('#group__user .form__input-error').classList.remove('form__input-error-active');
        }
        else {
          document.getElementById('group__user').classList.add('form__group-incorrecto');
          document.getElementById('group__user').classList.remove('form__group-correcto');
          document.querySelector('#group__user i').classList.add('fa-times-circle');
          document.querySelector('#group__user i').classList.remove('fa-check-circle');
          document.querySelector('#group__user .form__input-error').classList.add('form__input-error-active');
        }
        break;
      case "password0":
        if (expresiones2.password0.test(evento.target.value)) {
          document.getElementById('group__password').classList.remove('form__group-incorrecto');
          document.getElementById('group__password').classList.add('form__group-correcto');
          document.querySelector('#group__password i').classList.add('fa-check-circle');
          document.querySelector('#group__password i').classList.remove('fa-times-circle');
          document.querySelector('#group__password .form__input-error').classList.remove('form__input-error-active');
        }
        else {
          document.getElementById('group__password').classList.add('form__group-incorrecto');
          document.getElementById('group__password').classList.remove('form__group-correcto');
          document.querySelector('#group__password i').classList.add('fa-times-circle');
          document.querySelector('#group__password i').classList.remove('fa-check-circle');
          document.querySelector('#group__password .form__input-error').classList.add('form__input-error-active');
        }
        break;
    }
  }
  inpustLogin.forEach((input) => {
    input.addEventListener('keyup', validarLogin);
    input.addEventListener('blur', validarLogin);
  });
}







