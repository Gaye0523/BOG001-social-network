const fs = firebase.firestore();

let name;
let userID;
let userLike = [];
let counterLike = 0;
let email;

export const logeado = () => {
    auth.onAuthStateChanged(user => {
        if (user) {
            console.log('existe usuario activo')
            name = user.displayName;
            email = user.email;
            userID = user.uid;
        }
        else {
            console.log('no existe usuario activo');
            window.onbeforeunload = function () { return "Your work will be lost."; };
        }
    })
    const headerLogin = `<div class="container-firts">
    <div class="container logo-nav-container">
        <div class="container-logo">
            <div class="container-img-logo"><img class="logoImg" src="imagenes/Logo-1.png">
                <div class="name-logo">ShojoAnime</div>
                <div class="name-logo1">Social</div>
            </div>
        </div>

        <nav class="navigation1">
            <ul>
                <li class="select"><a href="#/Login" class="link-btn">Inicio</a></li>
                <li class="select"><a href="#/Perfil" class="link-btn">Perfil</a></li>
                <li class="select"><a href="#/Animes" class="link-btn">Animes</a></li>
                <li class="select"><a href="#" id="logout"class="link-btn">Cerrar Sesión</a></li>
            </ul>
        </nav>
        </a>
    </div>`

    const vistaLogin = document.createElement("div")
    vistaLogin.innerHTML = headerLogin
    return vistaLogin
}

export const centroLog = () => {
    const centro = `<div class="card-body">
    <form id="formPublic" action="/images" method="POST" enctype="multipart/form-data">
        <div class="form-group">
            <textarea name="description" rows="7" cols="108" id="miid" class="form-control"
                placeholder="Que estas pensando? #Shojo #Animes #Manga" required></textarea>
        </div>
        <div class="container3">
            <div class="fotob">
                    <button id="foto-button1">
                        <img class="foto" src="imagenes/foto.svg">
                    </button>
                <button id="foto-button2">
                    <img class="video" src="imagenes/camara-de-video.svg">
                </button>
                <button id="foto-button3">
                    <img class="musica" src="imagenes/musica.svg">
                </button>
                <button id="foto-button4">
                    <img class="lista" src="imagenes/lista.svg">
                </button>
            </div>
            <div class="button">
                <button id="public-button">
                    <img id="public-button" class="publicar" src="imagenes/blog.svg"> PUBLICAR
                </button>
            </div>
        </div>
    </form>
</div>
<div id="publicacion"></div>
</form>`
    const cenLogin = document.createElement("div")
    cenLogin.innerHTML = centro
    return cenLogin
}

const deleteThoug = (id) => fs.collection('anime').doc(id).delete()
const getThoughts = () => fs.collection('anime').get()
const editThoughts = (id) => fs.collection('anime').doc(id).get()
const onGetThoughts = (callback) => fs.collection('anime').onSnapshot(callback)
const updateThoug = (id, updateThoug) => fs.collection('anime').doc(id).update(updateThoug)
let statusEdit = false;
let id = '';

export const globalPublic = async () => {

    const publi = document.getElementById('formPublic');

    const save = async (descripcion, name, userID, userLike, counterLike) =>
        fs.collection("anime").doc().set({
            descripcion,
            name,
            userID,
            userLike,
            counterLike
        });

    publi.addEventListener('submit', async (e) => {
        e.preventDefault();
        const descripcion = publi["miid"];
        if (!statusEdit) {
            await save(descripcion.value, name, userID, userLike, counterLike);
        }
        else {
            await updateThoug(id, {
                descripcion: descripcion.value
            })
        }
        statusEdit = false
        id = ''
        publi["public-button"].innerText = 'PUBLICAR'
        await getThoughts()
        publi.reset()
    })
}


export const editPublic = async () => {

    const publi = document.getElementById('formPublic');

    const botonEdit = document.querySelectorAll('.editando')
    botonEdit.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
            const datosImport = e.target.dataset
            editThoughts(datosImport.id);
            const doc = await editThoughts(e.target.dataset.id)
            let data = doc.data();
            if (data.userID === userID) {
                const cambios = doc.data();
                statusEdit = true;
                id = doc.id;
                publi["miid"].value = cambios.descripcion;
                publi["public-button"].innerText = "Editar"
            } else {
                swal.fire('no puedes editar esta publicacion')
            }
        })
    })
}


export const deletPublication = async () => {
    const boton = document.querySelectorAll('.basura')
    boton.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const datosImport = e.target.dataset
            const doc = await editThoughts(datosImport.id)
            let data = doc.data()
            if (data.userID === userID) {
                const datosImport = e.target.dataset
                await deleteThoug(datosImport.id);
            } else {
                swal.fire('no puedes borrar esta publicacion')
            }
        })
    })
}

export const goLike = async () => {

    const seeLike = document.querySelector('showLike')

    const btnlike = document.querySelectorAll(".like")
    const btnHeart = document.querySelectorAll(".heart")
    btnlike.forEach((btnL) => {
        btnL.addEventListener('click', async (e) => {
            if (e.target.className === 'like') {
                let id = e.target.dataset.id
                const doc = await editThoughts(e.target.dataset.id)
                const publicData = doc.data();
                let userLike = publicData.userLike;
                let counterLike = publicData.counterLike;
                userLike.push(userID);
                e.target.classList.remove('like');
                e.target.classList.add('heart');
                counterLike++;
                updateThoug(id, { userLike, counterLike })
            } else {
                return;
            }
        })
    })

    btnHeart.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
            if (e.target.className === 'heart') {
                let id = e.target.dataset.id;
                const doc = await editThoughts(id)
                let data = doc.data();
                let userLike = data.userLike;
                let counterLike = data.counterLike;
                e.target.classList.remove('heart');
                e.target.classList.add('like');
                let findPosition = userLike.indexOf(userID);
                if (findPosition !== -1) {
                    userLike.splice(findPosition, 1);
                }
                counterLike = counterLike - 1;
                updateThoug(id, { userLike, counterLike });
            }
        })
    })
}


export const publicacion = async () => {

    const publicando = document.getElementById('publicacion');

    onGetThoughts((querySnapshot) => {
        publicando.innerHTML = "";
        querySnapshot.forEach(doc => {
            const thought = doc.data();
            thought.id = doc.id
            const usersLikes = thought.userLike;
            let iconLike = '';
            let IconHeart = '';
            if (usersLikes.includes(userID)) {
                iconLike = `<img id="imgIcon" class="heart"data-id="${thought.id}"src="Imagenes/heart.svg"><div class="counter">${thought.counterLike}</div>`
            } else {
                IconHeart = `<img id="imgIcon" class="like"data-id="${thought.id}" src="Imagenes/me-gusta.svg"><div class="counter">${thought.counterLike}`
            }
            publicando.innerHTML += `<tr><div class="publicen">                       
                    ${doc.data().descripcion}
                    <div class="seccion">
                    <a class="usuario">${thought.name}</a>
                    <div class="completo">
                    ${iconLike}
                    ${IconHeart}
                    <img id="imgIcon" class="basura" data-id="${thought.id}" src="Imagenes/basura.svg">
                    <img id="imgIcon" class="editando" data-id="${thought.id}"src="Imagenes/editar.svg">
                    </div>
                    </div>
                </div>
                <tr>`
        })
        editPublic();
        deletPublication();
        goLike();
    })
}










