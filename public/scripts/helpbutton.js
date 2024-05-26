function mostrarTexto() {
    var texto = document.getElementById("tooltiptext");
    if (texto.style.display === 'none') {
      texto.style.display = 'flex';
    } else {
      texto.style.display = "none";
    }
  }
  