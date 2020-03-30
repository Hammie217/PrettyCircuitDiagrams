var c = document.getElementById("c");
var ctx = c.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
var scale = 5;
c.width  *= scale;
c.height *= scale;
var centreX = c.width / 2;
var centreY = c.height / 2;
var carrying=2;
var currentRatio=1;
var currentRotation=1/2;

var rect = c.getBoundingClientRect();

var imgTag1 = new Image();
imgTag1.src = "../assets/no4.png";   // load image
var imgTag2 = new Image();
imgTag2.src = "../assets/co.png";   // load image

var s1 =[{}];
var s1Count=0;


function buttonPressed(event){
  carrying=1;
  ctx.clearRect(0, 0, c.width, c.height); 
  renderFromStores();
}
function buttonPressedC(event){
  carrying=2;
  ctx.clearRect(0, 0, c.width, c.height); 
  renderFromStores();
}

function sizexs(event){currentRatio=0.33;}
function sizes(event){currentRatio=0.66;}
function sizem(event){currentRatio=1;}
function sizel(event){currentRatio=1.33;}
function sizexl(event){currentRatio=1.66;}




function onmove(event){
  if(carrying!=0){
    ctx.clearRect(0, 0, c.width, c.height); 
    var x =(event.clientX*5)+(25-((event.clientX*5)%25))-rect.left;
    var y =(event.clientY*5)+(25-((event.clientY*5)%25))-rect.top;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(3.14*currentRotation);
    if(carrying==1)
      ctx.drawImage(imgTag1,-(imgTag1.width/2), -(imgTag1.height/2),imgTag1.width * currentRatio, imgTag1.height * currentRatio); 
    if(carrying==2)
      ctx.drawImage(imgTag2,-(imgTag2.width/2), -(imgTag2.height/2),imgTag2.width * currentRatio, imgTag2.height * currentRatio); 
    ctx.restore();
    renderFromStores()
  }
}

function renderFromStores(){
  for (let index = 1; index <= s1Count; index++) {
    ctx.save();
    ctx.translate(s1[index].x, s1[index].y);
    ctx.rotate(3.14*s1[index].rotation);
    switch(s1[index].name){
      case 1:
          ctx.drawImage(imgTag1,-(imgTag1.width/2), -(imgTag1.height/2),imgTag1.width * s1[index].ratio, imgTag1.height * s1[index].ratio); 
        break;
        case 2:
          ctx.drawImage(imgTag2,-(imgTag2.width/2), -(imgTag2.height/2),imgTag2.width * s1[index].ratio, imgTag2.height * s1[index].ratio); 
        break;
      default:
        break;
    }
    ctx.restore();

  }
}

function onLeftDown(event){
    var xVal =(event.clientX*5)+(25-((event.clientX*5)%25))-rect.left;
    var yVal =(event.clientY*5)+(25-((event.clientY*5)%25))-rect.top;
    if(carrying!=0){
          s1.push({
            name: carrying,
            ratio: currentRatio,
            rotation: currentRotation,
            x: xVal,
            y: yVal
          });

      
    s1Count++;
    console.log(s1);
    renderFromStores();
  }
}

function onKeyboardPress(event){
  switch(event.keyCode){
    case 82://R key
      currentRotation+=1/2;
      break;
    case 67://R key
      carrying=2;
      break;
    case 78://R key
      carrying=1;
      break;
    default:
      break;
  }
}

window.addEventListener("mousemove", onmove)   // We try to pick an object   var pickResult = scene.pick(scene.pointerX, scene.pointerY);});
c.addEventListener("mousedown", onLeftDown)
window.addEventListener("keydown", onKeyboardPress)