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
v=31,
colors=["rgb(0,0,0)","rgb(255,255,255)","rgb(100,200,70)","rgb(160,50,120)","rgb(120,120,210)","rgb(70,210,200)"],
b=new Array(w * w),
ig=document.getElementById("c"),
ctx=ig.getContext('2d');
ctx.createImageData(pw,pw);
ig.width=ig.height=pw;
var i=0;
while(i<s){
  b[i++]=~~(Math.random()*4+2)
}
b[0]=0;
b[s-1]=1;
function drawBoard(){
  var x,y;
  for(y=0;y<w;y++){
    for(x=0;x<w;x++){
      var z=b[w*y+x];
      ctx.fillStyle=colors[z];
      ctx.fillRect(x*u,y*u,u,u);
    }
  }
}
function h(b,x,y,c,k){ //fillflood
  if (!(x >= 0 && x < w && y >= 0 && y < w))return 0;
  var i=w*y+x;
  if (b[i]==c){
    b[i]=k;
    return 1+ 
           h(b,x+1,y,c,k)+
           h(b,x-1,y,c,k)+
           h(b,x,y-1,c,k)+
           h(b,x,y+1,c,k);    
  }
  return 0;
}
function q(b,p,x,y,c){
  h(b,x,y,p,c);
  return h(b,x,y,c,p);
}
function ai(b,p,x,y,o,ox,oy){ 
  var choice=2,m=0,
  h=function(bd,p1,x1,y1,p2,x2,y2,d){
    var i=0,
    m=-s*s*s,//100000000;
    c=2;
    for(i=2;i<6;i++){
      var bi=bd.concat(),
      f=q(bi,p1,x1,y1,i);
      if (d<3){
        var r=h(bi,p2,x2,y2,p1,x1,y1,d+1);
        f=f-r[1];

      }
      if (f>=m){
        c=i;
        m=f;
      }      
    }
    return [c,m];
  };
  return h(b,p,x,y,o,ox,oy,0)[0];
}




ig.onclick=function(e){
  var x=~~((e.clientX-ig.offsetLeft)/u),
      y=~~((e.clientY-ig.offsetTop)/u),
      i=w*y+x,
      c=b[i];
  if (c > 1){
    // us
    a=q(b,0,0,0,c);
    // them
    c=q(b,1,v,v,ai(b,1,v,v,0,0,0));
    //board[ i ] = 0;
    if (a+c==s){
      if (a>c){
        q(b,0,v,v,1);
      } else {
        q(b,1,0,0,0);
      } 
    }
    drawBoard();  
  }
};
drawBoard();
