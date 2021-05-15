class Options {
  constructor(height, width, bg, fontSize, textAlign) {
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize=fontSize;
    this.textAlign=textAlign;
  }

  add() {
    let div = document.createElement('div'),
        el = document.querySelector('footer');
    div.style.height = this.height;
    div.style.width = this.width;
    div.style.backgroundColor = this.bg;
    div.style.fontSize = this.fontSize;
    div.style.textAlign = this.textAlign;
    div.innerText='text';
    el.after(div); 
  }
}

let a = new Options('100px','500px','lightgreen','50px','right');

a.add();


