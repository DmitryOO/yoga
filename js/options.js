class Options {
  constructor(height, width, bg, fontSize, textAlign) {
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    this.textAlign = textAlign;
  }

  add(tag) {
    let div = document.createElement('div');
    div.style.height = this.height;
    div.style.width = this.width;
    div.style.backgroundColor = this.bg;
    div.style.fontSize = this.fontSize;
    div.style.textAlign = this.textAlign;
    div.innerText = 'text';
    tag.after(div);
  }
}
let tag = document.querySelector('footer');
let a = new Options('100px', '500px', 'lightgreen', '50px', 'right');

a.add(tag);


