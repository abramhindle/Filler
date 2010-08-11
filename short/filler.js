//player1 -> 0
//player2 -> 1
//fillTouch -> q
var W=16, // pixels per box was W now 
w=32, // size of map w * w
pw=512,
s=1024,
colors=["rgb(0,0,0)","rgb(255,255,255)","rgb(100,200,70)","rgb(160,50,120)","rgb(120,120,210)","rgb(70,210,200)"],
coff=2,
ncolor=4,
colorbase=2,
board=new Array(w * w),
ig=document.getElementById("c"),
ctx=ig.getContext('2d'),
d=ctx.createImageData(pw,pw);
ig.width=ig.height=pw;
function initboard() {
  var i=0;
  while(i<s){
    board[i++]=~~(Math.random()*ncolor+coff)
  }
  board[0]=0;
  board[s-1]=1;
}
initboard();
function pos(x,y) { return w * y + x }
function drawBoard() {
  var x,y;
  for(y=0;y<w;y++) {
    for(x=0;x<w;x++) {
      var z=board[pos(x,y)];
      ctx.fillStyle=colors[z];
      ctx.fillRect(x * W, y * W, W, W);
    }
  }
}
function bounds(x,y) { return (x >= 0 && x < w && y >= 0 && y < w) }
function fillFlood(board,xi,yi,c,rc) {
  if (!bounds(xi,yi)) { return 0; }
  var i=pos(xi,yi);
  if (board[i]==c) {
    board[i]=rc;
    return 1 + 
           fillFlood(board, xi+1,yi,c,rc) +
           fillFlood(board, xi-1,yi,c,rc) +
           fillFlood(board, xi,yi-1,c,rc) +
           fillFlood(board, xi,yi+1,c,rc);    
  } else {
    return 0;
  }
}
function q(board, player, playerx, playery, c) {
  fillFlood(board, playerx, playery, player, c);
  return fillFlood(board, playerx, playery, c, player);
}
function testTouch(board, player, playerx, playery, c) {
  var b=board.concat();
  return q( b, player, playerx, playery, c);
}
function maxai(board,player,x,y) {
  var c=coff,i=coff,m=0;
  for(i=coff;i<coff+ncolor;i++) {
    var v=testTouch(board,player,x,y,i);
    //debug(v+" " +i+" "+m+" "+player+" "+x+" "+y);
    if(m<v){
      c=i;m=v;      
    }
  }
  return c;
}

function alphabeta(board,player,x,y,oplayer,ox,oy) { 
  var maxdepth=3,choice=coff,m=0,
  helper=function(bd,p1,x1,y1,p2,x2,y2,depth,accm) {
    var it = 0;
    var m = -100000000;
    var c = coff;
    for( it = coff; it < coff+ncolor; it++) {
      var bi = bd.concat();
      var f = q( bi, p1, x1, y1, it );
      if (depth < maxdepth) {
        var r = helper(bi, p2, x2, y2, p1, x1, y1, depth+1, accm+" "+it);
        f = f - r[1];

      }
      if (f>=m) {
        c=it;
        m=f;
      }      
    }
    return [c,m];
  };
  return helper(board,player,x,y,oplayer,ox,oy,0,"")[0];
  return r[0];
}


var ai = alphabeta;


function onClick(e) {
  var x=~~((e.clientX-ig.offsetLeft)/W),
      y=~~((e.clientY-ig.offsetTop)/W),
      i=pos(x,y),
      c=board[i];
  if (c > 1) {
    //fillFlood(board, x,y,c, 0);
    // us
    var us = q( board, 0, 0, 0, c );
    // them
    var them = q( board, 1, w-1, w-1, ai(board,1,w-1,w-1,0,0,0) );
    //board[ i ] = 0;
    if (us + them == s) {
      if (us > them) {
        q(board,1,w-1,w-1,0);
      } else {
        q(board,1,w-1,w-1,0);
      } 
    }
    drawBoard();  
  }
}
ig.onclick=onClick;
initboard();
drawBoard();
