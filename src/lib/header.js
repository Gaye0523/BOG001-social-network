
export const inicio = () => {
  const template1 =

    `<div class="container-firts">
  <div class="container logo-nav-container">
  <div class="container-logo">
  <div class="container-img-logo"><img class="logoImg" src="Imagenes/Logo-1.png">
  <div class="name-logo">ShojoAnime</div>
  <div class="name-logo1">Social</div>
</div>
</div>

<nav class="navigation">
<ul>
<li><a href="#/formulario">Login</a></li>
<li><a href="#/formularioRegistro">Registro</a></li>
</ul>
</nav>
</a>
</div>`

  const vistaInicio = document.createElement("div")
  vistaInicio.innerHTML = template1
  return vistaInicio
}

export const centro = () => {
  const template2 =
    `<div class="container1">
<img src="Imagenes/ImagenInicio.jpg" class="img">
<img src="Imagenes/corazon.svg" class="corazon">
<h1>Tu portal de Anime Shojo</h1>
<h2>Orientado a chicas jovenes. Las series Shojo son mangas hechos para publico femenino, muy románticos en
  general.</h2>
</div>

<div class= "container2">
<div class=  "containerimg">
<img src="Imagenes/usuario.svg" class="imagen">
<h3 class="titulo">Conoce nuevas personas</h3>
<blockquote>
<p class="p1">Comparte tus gustos,<br>opiniones o simplemente pasa-<br> un buen rato con los demás.&nbsp</p>
</blockquote>
</div>

<div class="containerimg">
<img src="Imagenes/libro.svg" class="imagen">
<h3 class="titulo">Lee Recomendaciones</h3>
<blockquote>
<p class="p1">Conoce nuevos mangas y animes<br> que puedan ser de tu interés.</p>
</blockquote>
</div>

<div class ="containerimg">
<img src="Imagenes/telefono.svg" class="imagen">
<h3 class="titulo">Desde tu móvil o tablet</h3>
<blockquote>
<p class="p1" >Adaptado a todos los dispositivos<br> tablets y smartphone.</p>
</blockquote>
</div>
</div>

<div class ="containerimg1">
<img src="Imagenes/telefono.svg" class="imagen">
<h3 class="h7"> Explora el universo del manganime</h3>
<p class="p1">Busca entre animes, mangas, ovas y doramas.</p>
</div>

<div class="imageGif">
<img src="Imagenes/Imagen-1.gif" class="gif1">
<img src="Imagenes/Imagen-2.gif" class="gif2">
<img src="Imagenes/Imagen-3.gif" class="gif3">
</div>`
  const vistaCentral = document.createElement("div")
  vistaCentral.innerHTML = template2
  return vistaCentral
}