const db = firebase.firestore();

export const event = () => {
  const logout = document.querySelector('#logout');
  logout.addEventListener('click', e => {
    e.preventDefault();
    auth.signOut()
      .then(() => {
        swal.fire('cerro sesion');
        redirectToInicio();
      })
  })
}

export function redirectToInicio() {
  window.location.hash = '#';
}

export const profile = () => {

  const user = firebase.auth().currentUser;
  let photoURL
  let email

  if (user != null) {
    name = user.displayName;
    photoURL = user.photoURL;
    email = user.email;
  } else {
    photoURL = "Imagenes/Perfil.png";
  }

  if (photoURL == null) {
    photoURL = "Imagenes/Perfil.png";
  }

  const pgPerfil = `
    <nav class="navigation1">
      <ul>
        <li class="select"><a href="#/Login" class="link-btn">Inicio</a></li>
        <li class="select"><a href="#/Perfil" class="link-btn">Perfil</a></li>
        <li class="select"><a href="#/Animes" class="link-btn">Animes</a></li>
        <li class="select"><a href="#" id="logout"class="link-btn">Cerrar Sesión</a></li>
      </ul>
    </nav>
    </a>
  </div>

  <div class="containerProfile">
    <img class="avatar" src="${photoURL}" alt="">
    <h1 class="name">${name}</h1>
  </div>

  <div class="container-globalPro">

    <div class="containerInfo">
      <h1>Sobre Mi</h1>
      <h3 class="letra">Pais: Colombia</h3>
      <h3 class="letra">E-mail: ${email}</h3>
    </div>

    <div class="containerPublication">
      <form id="publicForm" action="/images" onsubmit="return false">
      <img src="${photoURL}" class="avatar1" alt="">
      <textarea name="" id="textControl" class="textControl" cols="108" rows="5" placeholder="¿Que estas pensando?"></textarea>
        <button type="submit" id="buttonPublic">PUBLICAR</button>
      </div>
      </form>
    </div>
    <h1 id="publicationTitle">Ultimas Publicaciones</h1>
      <div class="containerinfo1" id="containerinfo1">
      <h1 id="publicationTitle">Ultimas Publicaciones</h1>
      
      </div>
  </div>`


  const vistaPerfil = document.createElement("div")
  vistaPerfil.innerHTML = pgPerfil
  return vistaPerfil
}

const getThoughts = () => db.collection('thoughts').get()
const editThoughts = (id) => db.collection('thoughts').doc(id).get()
const onGetThoughts = (callback) => db.collection('thoughts').onSnapshot(callback)
const deleteThoug = id => db.collection('thoughts').doc(id).delete()
const updateThoug = (id, updateThoug) => db.collection('thoughts').doc(id).update(updateThoug)
let editStatus = false
let id = ""

export const publicGlobal = async () => {

  const publicForm = document.getElementById('publicForm')

  const saveThoughts = async (publication) =>
    db.collection('thoughts').doc().set({
      publication
    });

  publicForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const publication = publicForm['textControl'].value;

    if (!editStatus) {
      await saveThoughts(publication)
    } else {
      await updateThoug(id, {
        publication: textControl.value
      })

      editStatus = false
      id = ''
      publicForm['buttonPublic'].innerText = 'PUBLICAR'

    }
    await getThoughts()

    publicForm.reset()

  })
}

export const editPerfilPulication = async () => {

  const publicForm = document.getElementById('publicForm');

  const btnsEditar = document.querySelectorAll('.btnEditar')
  btnsEditar.forEach(btns => {
    btns.addEventListener('click', async (e) => {
      const doc = await editThoughts(e.target.dataset.id)
      const thought = doc.data()

      editStatus = true
      id = doc.id

      publicForm['textControl'].value = thought.publication
      publicForm['buttonPublic'].innerText = 'CARGAR'
    })
  })
}

export const deletPerfilPublication = async () => {
  const btnsBorrar = document.querySelectorAll('.btnBorrar')
  btnsBorrar.forEach(btns => {
    btns.addEventListener('click', (e) => {
      const datosImport = e.target.dataset
      deleteThoug(datosImport.id)
    })
  })
}

export const publicHistory = async () => {

  const containerinfo1 = document.getElementById('containerinfo1')


  onGetThoughts((querySnapshort) => {
    containerinfo1.innerHTML = "";
    querySnapshort.forEach(doc => {

      const thought = doc.data()
      thought.id = doc.id

      containerinfo1.innerHTML += `<div class="showPublication">
        <p> ${thought.publication}</p>
        <button class="btnBorrar" data-id="${thought.id}">BORRAR</button>
        <button class="btnEditar" data-id="${thought.id}">EDITAR</button>
        </div>`
    })
    editPerfilPulication();
    deletPerfilPublication();
  })
}







