# range-slider
JavaScript implementation of html range slider

Code generates range sliders from tags marked with class named "range-slider". Tags are supposed to be empty. Code fills them with necessary items. Every tags marked with class will be converted.
Sliders provide two input fields which can be used in forms. Names of inputs are based on id of slider with suffixes: -val-min -val-max

Sliders are configurable, available attributes:
data-min - minimum value for slider (default 0) 
data-max - minimum value for slider (default 100)
data-start - position of lower pointer (default 0)
data-end - position of higher pointer (default 100)

required files:
-range-slider.js
-range-slider.css

To initialise script You have to run method CreateRangeSliders() when document is loaded
