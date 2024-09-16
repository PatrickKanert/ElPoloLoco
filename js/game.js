let canvas;
let world;
let kayboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);

    console.log('My Character is', world.character);
}

window.addEventListener("keypress", (e) => {
    console.log(e)
});