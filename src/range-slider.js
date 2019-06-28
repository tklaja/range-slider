
/*---
W pliku należy uruchomic metodę CreateRangeSliders()
---*/

//klasa odpowiedzialna za dynmaiczne tworzenie sliderów`
function CreateRangeSliders() {
  this.rangeSliders = [];

  this.createHTML = function() {
    let sliders = document.querySelectorAll(".range-slider");
    let iteration = 0;
    for(const s of sliders) {
      //odczytanie/nadanie id
      let id = s.id?s.id:'rs-slider-' + ++iteration;
      s.id = id;

      //utworzenie range-slider-display
      let rsd = document.createElement('div');
      rsd.classList.add('range-slider-display');
      let rsdr = document.createElement('div');
      rsdr.classList.add('range-slider-display-range');
      rsd.appendChild(rsdr);

      //utworzenie sliderówarn
      let s1 = document.createElement('div');
      s1.classList.add('slider','slider1');
      let s2 = document.createElement('div');
      s2.classList.add('slider','slider2');

      //dodanie sliderów do rsd
      rsd.appendChild(s1);
      rsd.appendChild(s2);

      //utworzenie inputów
      let i1 = document.createElement('input');
      i1.type = "text";
      i1.classList.add('value','value1');
      i1.size = 3;
      i1.name = s.dataset.prefix?s.dataset.prefix+'-val-min':id+'-val-min';
      let i2 = document.createElement('input');
      i2.type = "text";
      i2.classList.add('value','value2');
      i2.size = 3;
      i2.name = s.dataset.prefix?s.dataset.prefix+'-val-min':id+'-val-max';

      //dodanie elementów do slidera
      s.appendChild(rsd);
      s1.appendChild(i1);
      s2.appendChild(i2);

      //dodanie obsługi nowego RangeSlidera przez klasę RangeSlider
      this.rangeSliders.push(new RangeSlider(id));
      console.log(this);
    }

    //utworzenie range sliderów
  }
  this.createHTML();
};

//klasa odpowiedzialna za pojedynczy slajder
function RangeSlider(id = null) {
  this.slId = id,
  this.sl= null,
  this.slRange= null,
  this.sl1= null,
  this.sl2= null,
  this.val1= null,
  this.val2= null,
  this.sl1Active= false,
  this.sl2Active= false,
  this.slPosMin= 0,
  this.slPosMax= 0,
  this.dataValMin= 0,
  this.dataValMax= 0,
  this.valueOffset= 0,
  this.value1= 0,
  this.value2= 0,
  this.prefix = 'rs',
  this.initialseRangeSlider = function () {
    //pobranie elementów, którymi skrypt będzie manipulował
    this.sl = document.querySelector("#"+this.slId);

    this.slRange = this.sl.querySelector('.range-slider-display-range');

    // this.sl = document.querySelector(".range-slider-display");
    this.sl1 = document.querySelector("#"+this.slId+" .range-slider-display .slider1");
    this.sl2 = document.querySelector("#"+this.slId+" .range-slider-display .slider2");
    this.val1 = document.querySelector("#"+this.slId+" .value1");
    this.val2 = document.querySelector("#"+this.slId+" .value2");

    //ustalenie maksymalnych przesunięć suwaka
    this.slPosMin = 0;
    this.slPosMax = this.sl.querySelector('.range-slider-display').offsetWidth;

    // ustalenie wartości suwaka z pól data-
    this.dataValMin = !isNaN(Number(this.sl.dataset.min))?Number(this.sl.dataset.min):0;
    this.dataValMax = !isNaN(Number(this.sl.dataset.max))?Number(this.sl.dataset.max):100;
    this.value1 = !isNaN(Number(this.sl.dataset.start))?Number(this.sl.dataset.start):this.dataValMin;
    this.value2 = !isNaN(Number(this.sl.dataset.end))?Number(this.sl.dataset.end):this.dataValMax;
console.log('v1',this.value1,'v2',this.value2,'vmin',this.dataValMin,'vmax',this.dataValMax);
    if(this.value1 < this.dataValMin) {
      this.value1 = this.dataValMin;
    }
    if(this.value2 > this.dataValMax) {
      this.value2 = this.dataValMax;
    }

    //ustalenie offsetu dla jednej wartości suwaka
    this.valueOffset = (this.slPosMax-this.slPosMin-this.sl1.offsetWidth*2)/(this.dataValMax-this.dataValMin);

    //ustawienie suwaka w wartości początkowej
    this.setSliderByValue(this.value1,1);
    this.setSliderByValue(this.value2,2);

    //ustawienie wyróżnienia dla przedziału
    this.setRange();

    //obsługa zdarzeń na dla obszaru suwaka (nie suwaków indywidualnie)
    this.sl.addEventListener("mousedown", this.dragStart.bind(this), false);
    this.sl.addEventListener("mousemove", this.drag.bind(this), false);
    window.addEventListener("mouseup", this.dragStop.bind(this), false);
    this.sl.addEventListener("touchstart", this.dragStart.bind(this), false);
    this.sl.addEventListener("touchmove", this.drag.bind(this), false);
    window.addEventListener("touchend", this.dragStop.bind(this), false);
  },
  //funcja ustawiająca suwak na pozycji na podstawie wartośści
  this.setSliderByValue = function(value, slNumber) {
    if(slNumber === 1) {
      this.sl1.style.left = (value*this.valueOffset) + "px";
      this.value1 = value;
      this.val1.value = this.value1;
    }
    else if(slNumber === 2) {
      this.sl2.style.left = (value*this.valueOffset+this.sl1.offsetWidth) + "px";
      this.value2 = value;
      this.val2.value = this.value2;
    }
  },
  //funkcja ustawiająca tło zakresu zaznaczenia
  this.setRange = function(){
    this.slRange.style.width = ((this.value2 - this.value1)*this.valueOffset+this.sl1.offsetWidth)+"px";
    this.slRange.style.left = (this.sl1.offsetLeft + this.sl1.offsetWidth/2)+"px";
    console.log(this.value2 - this.value1);
  }
  //rozpoczęcie przeciągania (wciśnięcie myszy)
  this.dragStart = function(e) {
    //jeżeli został kliknięty suwak1 to aktywujemy go do przesuwania
    if(e.target === this.sl1) {
        this.sl1Active = true;
  //jeżeli został kliknięty suwak2 to aktywujemy go do przesuwania
} else if(e.target === this.sl2) {
        this.sl2Active = true;
    }
  },
  //przeciąganie
 this.drag = function(e) {
   e.preventDefault();
   //obliczenie nowej pozycji suwaka
   let nPos = Math.round(e.clientX - this.sl.offsetLeft - this.sl1.offsetWidth/2);

   nPos = this.sl2Active?nPos-this.sl1.offsetWidth:nPos;
   //obliczenie nowej wartości dla suwaka
   let nVal = Math.round(nPos/this.valueOffset);

   //jeżeli nowa pozycja jest poniżej vartości minimalnej ustawiamy minimalną
   if(nVal < this.dataValMin) { nVal = this.dataValMin; }
   //jeżeli nowa pozycja jest powyżej wartości maksymalnej usawiamy maksymalną
   else if(nVal > this.dataValMax) { nVal = this.dataValMax; }

   if(this.sl1Active) { //suwak 1
     //jeżeli wyliczona nowa wartość jest poniżej wartości drugiego suwaka to przesuwamy
     if(nVal < this.value2) {
       this.setSliderByValue(nVal,1);
     }
   }
   if(this.sl2Active) {
     //jeżeli wyliczona nowa wartość jest powyżej wartości pierwszego suwaka to przesuwamy
     if(nVal > this.value1) {
       this.setSliderByValue(nVal,2);
     }
     // setSliderByPosition(nPos, 2);
   }

   this.setRange();
 },
 //zakończenie przeciągania (zwolnienie klawisza myszy)
 this.dragStop = function(e) {
   //dezaktywacja suwaków
   this.sl1Active = false;
   this.sl2Active = false;
 }

 //inicjalizacja slidera
 this.initialseRangeSlider();
};

// var RS = new RangeSlider();
// var crs = new CreateRangeSliders();
// window.addEventListener('DOMContentLoaded', function() { RS.initialseRangeSlider()});
// window.addEventListener('DOMContentLoaded', function(){ CreateRangeSliders(); });
