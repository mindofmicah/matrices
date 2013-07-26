console.clear();
var equations = [
        '-321y + 432x = 4',
        '-15y + 2x=8'
    ];
    
var Matrix = function () {
    this.equations = [];
    this.spacing = {};
}

var MatrixEquation = function (equation) {
this.original = equation;
    var sides = equation.replace(/\s+/g,'').split('=');
    this.total = sides[1];
    this.chunks = {};
    var str =sides[0];
    var operator = '+';
    var matches =     str.match(/([+-]?)(\d+)(.*)/g);
    while (str.length > 1 ) {
        matches = str.match(/^([+-]?)(\d*)([A-z]?)(.*)/)

        str = matches[4];
        if (matches[1].length === 0) {
            matches[1] = '+';
        }
        if (matches[2].length === 0 ) {
            matches[2] = "1";
        }
        
        this.chunks[matches[3]] = matches[1] + matches[2];
    }
}

MatrixEquation.fitToStrLength = function (orig, total_length, character) {
    while (orig.length < total_length) {
        orig = (character||' ') + orig;
    }
    return orig;
}
MatrixEquation.prototype.toConsole = function (spacing_info) {
    var ret = '|';
    for(key in this.chunks) {
        ret+= " " + MatrixEquation.fitToStrLength(this.chunks[key],spacing_info[key]);
    }
    ret+= ' | ' + MatrixEquation.fitToStrLength(this.total, spacing_info.total) + ' |';
    return ret;

}
Matrix.prototype.updateSpacing = function (equation) {
    for (var i in equation.chunks) {


        if (!this.spacing.hasOwnProperty(i) || equation.chunks[i].length > this.spacing[i]) {
            this.spacing[i] = equation.chunks[i].length;
        }
    }
    if (!this.spacing.hasOwnProperty('total') || equation.total.length > this.spacing.total) {
        this.spacing.total = equation.total.length;
    }
}
Matrix.prototype.addEquation = function (equation) {
    e = new MatrixEquation(equation);
    this.equations.push(e);
    this.updateSpacing(e);
}

Matrix.prototype.getMatrixWidth = function () {
    var ret = 0;
    for (var key in this.spacing) {
        ret+=this.spacing[key];
    }
    return ret;
}

Matrix.prototype.show = function () {
    var ret = 'Equations' + "\n";
    for (var i = 0; i < this.equations.length; i++) {
       ret+=this.equations[i].original + "\n";
    }
    ret+= "\n" +'create' + "\n";
    
    ret+= "+" + MatrixEquation.fitToStrLength('+', 7+this.getMatrixWidth(),'-') + "\n";
    
    for (var i = 0; i < this.equations.length; i++) {
       ret+=this.equations[i].toConsole(this.spacing) + "\n";
    }
    ret+= "+" + MatrixEquation.fitToStrLength('+', 7+this.getMatrixWidth(),'-') + "\n";
    return ret;
}

var m = new Matrix;
for (var i = 0; i < equations.length; i++) {
    m.addEquation(equations[i]);
}

console.log(m.show());
