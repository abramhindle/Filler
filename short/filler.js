//player1 -> 0
//player2 -> 1
//fillTouch -> q
//coff -> 2
//ncolor -> 4
//colorbase -> 2
var u=16, // pixels per box was W now 
w=32, // size of map w * w
pw=512,
s=1024,
colors=["rgb(0,0,0)","rgb(255,255,255)","rgb(100,200,70)","rgb(160,50,120)","rgb(120,120,210)","rgb(70,210,200)"],
b=new Array(w * w),
ig=document.getElementById("c"),
ctx=ig.getContext('2d'),
d=ctx.createImageData(pw,pw);
ig.width=ig.height=pw;
var i=0;
while(i<s){
  b[i++]=~~(Math.random()*4+2)
}
b[0]=0;
b[s-1]=1;
function pos(x,y) { return w * y + x }
function drawBoard() {
  var x,y;
  for(y=0;y<w;y++) {
    for(x=0;x<w;x++) {
      var z=b[pos(x,y)];
      ctx.fillStyle=colors[z];
      ctx.fillRect(x*u,y*u,u,u);
    }
  }
}
function bounds(x,y) { return (x >= 0 && x < w && y >= 0 && y < w) }
function h(b,xi,yi,c,rc) { //fillflood
  if (!bounds(xi,yi)) { return 0; }
  var i=pos(xi,yi);
  if (b[i]==c) {
    b[i]=rc;
    return 1+ 
           h(b,xi+1,yi,c,rc)+
           h(b,xi-1,yi,c,rc)+
           h(b,xi,yi-1,c,rc)+
           h(b,xi,yi+1,c,rc);    
  } else {
    return 0;
  }
}
function q(b, p, x, y, c) {
  h(b,x,y,p,c);
  return h(b,x,y,c,p);
}
function ai(b,p,x,y,o,ox,oy) { 
  var choice=2,m=0,
  helper=function(bd,p1,x1,y1,p2,x2,y2,d) {
    var i=0,
    m=-s*s*s,//100000000;
    c=2;
    for(i=2;i<6;i++) {
      var bi=bd.concat(),
      f=q(bi,p1,x1,y1,i);
      if (d<3) {
        var r = helper(bi,p2,x2,y2,p1,x1,y1,d+1);
        f = f - r[1];

      }
      if (f>=m) {
        c=i;
        m=f;
      }      
    }
    return [c,m];
  };
  return helper(b,p,x,y,o,ox,oy,0)[0];
  return r[0];
}




function onClick(e) {
  var x=~~((e.clientX-ig.offsetLeft)/u),
      y=~~((e.clientY-ig.offsetTop)/u),
      i=pos(x,y),
      c=b[i];
  if (c > 1) {
    // us
    var us = q( b, 0, 0, 0, c );
    // them
    var them = q( b, 1, w-1, w-1, ai(b,1,w-1,w-1,0,0,0) );
    //board[ i ] = 0;
    if (us + them == s) {
      if (us > them) {
        q(b,1,w-1,w-1,0);
      } else {
        q(b,1,w-1,w-1,0);
      } 
    }
    drawBoard();  
  }
}
ig.onclick=onClick;
drawBoard();
