var juego = {};

juego.filas = [[],[],[]];

juego.espacioVacio = {
    fila:2,
    columna:2
};

juego.crearPieza = function(numero,fila, columna){
    var nuevoElemento = $("<div>");
    nuevoElemento.addClass('pieza');
    nuevoElemento.css({
      backgroundImage:"url(piezas/" + numero + ".jpeg)",
      top: fila * 200,
      left: columna * 200
    });
    return {
      el:nuevoElemento,
      numero:numero,
      filaInicial:fila,
      columnaInicial:columna,
    };
};

juego.instalarPiezas = function(juegoEl){
    var contador = 1;
    // Creación de las piezas (del 1 al 8)
    for (var fila = 0; fila < 3; fila++) {
      for (var columna = 0; columna < 3; columna++) {
        if(fila == this.espacioVacio.fila && columna == this.espacioVacio.columna) {
          this.filas[fila][columna] = null;
        }
        else{
          var pieza = this.crearPieza(contador++,fila,columna);
          juegoEl.append(pieza.el);
          this.filas[fila][columna] = pieza;
        }
      }
    }
    return juegoEl;
};

juego.moverFichaFilaColumna = function(ficha,fila,columna){
  // Modificación del CSS desde javascript
    ficha.el.css({
      top: fila * 200,
      left: columna * 200
    })
};

juego.guardarEspacioVacio = function(fila,columna){
    this.espacioVacio.fila = fila;
    this.espacioVacio.columna = columna;
    this.filas[fila][columna] = null;

};

juego.intercambiarPosicionConEspacioVacio = function (fila, columna){
    var ficha = this.filas[fila] && this.filas[fila][columna];
    if(ficha){
      this.filas[this.espacioVacio.fila][this.espacioVacio.columna] = ficha;
      this.moverFichaFilaColumna(ficha,this.espacioVacio.fila,this.espacioVacio.columna);
      this.guardarEspacioVacio(fila,columna);
    }
};

juego.moverAbajo = function(){
    var filaOrigen = this.espacioVacio.fila-1;
    var columnaOrigen = this.espacioVacio.columna;
    this.intercambiarPosicionConEspacioVacio(filaOrigen,columnaOrigen);
};

juego.moverArriba = function(){
    var filaOrigen = this.espacioVacio.fila+1;
    var columnaOrigen = this.espacioVacio.columna;
    this.intercambiarPosicionConEspacioVacio(filaOrigen,columnaOrigen);
};

juego.moverDerecha = function(){
    var filaOrigen = this.espacioVacio.fila;
    var columnaOrigen = this.espacioVacio.columna-1;
    this.intercambiarPosicionConEspacioVacio(filaOrigen,columnaOrigen);
};

juego.moverIzquierda = function(){
    var filaOrigen = this.espacioVacio.fila;
    var columnaOrigen = this.espacioVacio.columna+1;
    this.intercambiarPosicionConEspacioVacio(filaOrigen,columnaOrigen);
};

juego.checkGanar = function(){
    for (var f = 0; f < this.filas.length; f++) {
      for (var c = 0; c < this.filas.length; c++) {
        var ficha = this.filas[f][c];
        if(ficha && !(ficha.filaInicial == f && ficha.columnaInicial == c)){
          return false;
        }
      }
    }
 
      $("#ganador").show(); 
      return alert("¡Oh no mataron a Kenny!");
      //$("#ganador").css('display','block');
    
    

};

juego.capturarTeclas = function(){
    var that = this;
    $(document).keydown(function(evento) {
        switch(evento.which) {
            case 37:
              that.moverIzquierda();
            break;
            case 38:
              that.moverArriba();
            break;
            case 39:
              that.moverDerecha();
            break;
            case 40:
              that.moverAbajo();
            break;
            default: return;
        }
        that.checkGanar();
        evento.preventDefault();
    });
};

juego.mezclarFichas = function(veces){
    if(veces<=0){return;}
    var that = this;
    var funciones = ["moverAbajo","moverArriba","moverIzquierda","moverDerecha"];
    var numeroRandom = Math.floor(Math.random() * 4);
    var nombreDeFuncion = funciones[numeroRandom];
    this[nombreDeFuncion]();
    setTimeout(function(){
      that.mezclarFichas(veces-1);
    },10);
};

juego.iniciar = function(el){
    this.instalarPiezas(el);
    this.mezclarFichas(200);
    this.capturarTeclas();
};

$(function(){
  var elemento = $('#juego');
  juego.iniciar(elemento);
});
