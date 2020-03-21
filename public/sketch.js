let video;
let frame;
let socket=io();
let img;
function setup(){
    createCanvas(500,500);
    video=createCapture(VIDEO);
    video.size(100,100);
    video.hide();
    img=createImage(100,100);
}   
function draw(){
    frameRate(10);
    background(0);
    frame=video.get();
    image(frame,0,0,100,100);
    image(img,100,0,200,200);
    frame.loadPixels();
    socket.emit("newFrame",Array.from(frame.pixels));
    // noLoop();
}
socket.on("pixels",(pixels)=>{
    // console.log(pixels);
    img.loadPixels();
    for (let i = 0; i < 4 * (100*100); i += 4) {
        img.pixels[i] = pixels[i];
        img.pixels[i + 1] = pixels[i+2];
        img.pixels[i + 2] = pixels[i+3];
        img.pixels[i + 3] = pixels[i+4];
    }
    img.updatePixels();
})