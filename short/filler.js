//player1 -> 0
//player2 -> 1
//fillTouch -> Z
var W=16, // pixels per box was W now 
w=32, // size of map w * w
pw=512,
s=1024, 
colors=["rgb(0,0,0)","rgb(255,255,255)","rgb(100,200,70)","rgb(160,50,120)","rgb(120,120,210)","rgb(70,210,200)"],
coff=2,
ncolor=4,
colorbase=2,
board=new Array(w * w),
ig = document.getElementById("c");
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
var ctx = ig.getContext('2d');
var d = ctx.createImageData(pw,pw);
function drawBoard() {
  var x,y;
  for(y = 0; y < w; y++) {
    for(x = 0; x < w; x++) {
      var z = board[x + w * y];
      ctx.fillStyle = colors[z];
      ctx.fillRect(x * W, y * W, W, W);
    }
  }
}
function pos(x,y) { return w * y + x }
function bounds(x,y) { return (x >= 0 && x < w && y >= 0 && y < w) }
function fillFlood(board,xi,yi,c,rc) {
  if (!bounds(xi,yi)) { return 0; }
  var i = pos(xi,yi);
  if (board[i] == c) {
    board[i] = rc;
    return 1 + 
           fillFlood(board, xi+1,yi,c,rc) +
           fillFlood(board, xi-1,yi,c,rc) +
           fillFlood(board, xi,yi-1,c,rc) +
           fillFlood(board, xi,yi+1,c,rc);    
  } else {
    return 0;
  }
}
function Z(board, player, playerx, playery, c) {
  fillFlood(board, playerx, playery, player, c);
  return fillFlood(board, playerx, playery, c, player);
}
function testTouch(board, player, playerx, playery, c) {
  var b = board.concat();
  return Z( b, player, playerx, playery, c);
}
function maxai(board,player,x,y) {
  var c = coff, i=coff, m=0;
  for(i = coff; i < coff+ncolor; i++) {
    var v = testTouch(board,player,x,y,i);
    //debug(v+" " +i+" "+m+" "+player+" "+x+" "+y);
    if (m < v) {
      c = i; m = v;      
    }
  }
  return c;
}

function alphabeta( board, player, x, y, oplayer, ox, oy) { 
  var maxdepth=3;
  var choice = coff; 
  var m = 0;
  var helper = function(bd, p1, x1, y1, p2, x2, y2, depth, accm) {
    var it = 0;
    var m = -100000000;
    var c = coff;
    for( it = coff; it < coff+ncolor; it++) {
      var bi = bd.concat();
      var f = Z( bi, p1, x1, y1, it );
      if (depth < maxdepth) {
        var r = helper(bi, p2, x2, y2, p1, x1, y1, depth+1, accm+" "+it);
        f = f - r[1];

      }
      if (f >= m) {
        c = it;
        m = f;
      }      
    }
    return [c,m];
  };
  var r = helper(board, player, x, y, oplayer, ox, oy, 0,"");
  //debug(r); 
  return r[0];
      
};
function maxDistance( board, player, xi, yi) {
  dm = 0;
  for(y = 0; y < w; y++) {
    for(x = 0; x < w; x++) {
      var z = board[x + w * y];
      if (z == player) {
        var dx = x - xi,
            dy = y - yi,
            d  = dx * dx + dy * dy;
        dm = (d > dm)?d:dm;
      }
    }
  }
  return dm;
}
// refactor alphabeta into a heuristic function
function minimaxDist( maxdepth, board, player, x, y, oplayer, ox, oy) {
  var choice = coff; 
  var m = 0;
  var helper = function(bd, p1, x1, y1, p2, x2, y2, depth, accm) {
    var it = 0;
    var m = -100000000;
    var c = coff;
    for( it = coff; it < coff+ncolor; it++) {
      var bi = bd.concat();
      var f = Z( bi, p1, x1, y1, it );
      var md = maxDistance( bi, p1, x1, y1 ); // heuristic
      md = md * 10 + f;
      if (depth < maxdepth) {
        var r = helper(bi, p2, x2, y2, p1, x1, y1, depth+1, accm+" "+it);
        md = md - r[1];
      }
      if (md >= m) {
        c = it;
        m = md;
      }      
    }
    return [c,m];
  };
  var r = helper(board, player, x, y, oplayer, ox, oy, 0,"");
  return r[0];
      
};



var ai = alphabeta;


function onClick(e) {
  var x = ~~((e.clientX - ig.offsetLeft)/W) ;
  var y = ~~((e.clientY - ig.offsetTop)/W);
  var i = pos(x,y);
  var c = board[ i ];
  if (c > 1) {
    //fillFlood(board, x,y,c, 0);
    // us
    var us = Z( board, 0, 0, 0, c );
    // them
    var them = Z( board, 1, w-1, w-1, ai(board,1,w-1,w-1,0,0,0) );
    //board[ i ] = 0;
    var st = "Us: "+us+" Them: "+them;
    if (us + them == s) {
      if (us > them) {
        Z(board,1,w-1,w-1,0);
      } else {
        Z(board,1,w-1,w-1,0);
      } 
    }
    drawBoard();  
  }
}
ig.onclick=onClick;
initboard();
drawBoard();
