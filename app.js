var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var particalsOnScreen = 245;
var particalsArray = [];
var w, h;
w = canvas.width = window.innerWidth;
h = canvas.height = window.innerHeight;

function random(min, max) {
    return min + Math.random() * (max - min);
};

function clientResize(ev){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
};
window.addEventListener('resize', clientResize);

function createSnowFlakes() {
    for(var i = 0; i < particalsOnScreen; i++){
        particalsArray.push({
            x: Math.random() * w,
            y: Math.random() * h,
            opacity: Math.random(),
            speedX: random(-1, 1),
            speedY: random(1, 3),
            radius: random(0.5, 4.2),
        });
    }
};

function drawSnowflakes(){
    for(var i = 0; i < particalsArray.length; i++){
        var gradient = ctx.createRadialGradient(
            particalsArray[i].x,
            particalsArray[i].y,
            0,
            particalsArray[i].x,
            particalsArray[i].y,
            particalsArray[i].radius
        );
            
        gradient.addColorStop(0, "rgba(255,255,255," + particalsArray[i].opacity + ")");
        gradient.addColorStop(0.8, "rgba(210, 236, 242," + particalsArray[i].opacity + ")");
        gradient.addColorStop(1, "rgba(237, 247, 294," + particalsArray[i].opacity + ")");
        
        ctx.beginPath();
        ctx.arc(
            particalsArray[i].x,
            particalsArray[i].y,
            particalsArray[i].radius,
            0,
            Math.PI * 2,
            false
        );

        ctx.fillStyle = gradient;
        ctx.fill();  
    }
};

function moveSnowFlakes(){
    for (var i = 0; i < particalsArray.length; i++) {
        particalsArray[i].x += particalsArray[i].speedX;
        particalsArray[i].y += particalsArray[i].speedY;

        if (particalsArray[i].y > h) {
            particalsArray[i].x = Math.random() * w;
            particalsArray[i].y = -50;
        }
    }
};

function updateSnowfall () {
    ctx.clearRect(0, 0, w, h);
    drawSnowflakes();
    moveSnowFlakes();
};

setInterval(updateSnowfall, 50);
createSnowFlakes();

