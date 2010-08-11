//player1 -> 0
//player2 -> 1
//fillTouch -> q
//coff -> 2
//ncolor -> 4
//colorbase -> 2
var u=16,// pixels per box was W now 
w=32,// size of map w * w
P=512,
s=1024,
v=31,
x=y=i=0,
//colors=['rgb(0,0,0)','rgb(255,255,255)','rgb(100,200,70)','rgb(160,50,120)','rgb(120,120,210)','rgb(70,210,200)'],
C=['black','gray','red','blue','green','cyan'],//rgb(0,0,0)','rgb(255,255,255)','rgb(100,200,70)','rgb(160,50,120)','rgb(120,120,210)','rgb(70,210,200)'],
b=new Array(s),
I=document.getElementById('c'),
A=I.getContext('2d');
A.createImageData(P,P);
I.width=I.height=P;
while(i<s){
  b[i++]=~~(Math.random()*4+2)
}
b[0]=0;
b[s-1]=1;
function d(){//drawBoard
  for(y=0;y<w;y++){
    for(x=0;x<w;x++){
      A.fillStyle=C[b[w*y+x]];
      A.fillRect(x*u,y*u,u,u);
    }
  }
}
function h(b,x,y,c,k){ //fillflood
  if(!(x>=0&&x<w&&y>=0&&y<w))return 0;
  i=w*y+x;
  if (b[i]==c){
    b[i]=k;
    return 1+ 
           h(b,x+1,y,c,k)+
           h(b,x-1,y,c,k)+
           h(b,x,y-1,c,k)+
           h(b,x,y+1,c,k)
  }
  return 0
}
function q(b,p,x,y,c){//fill the color then fill yourself and count the fills
  h(b,x,y,p,c);
  return h(b,x,y,c,p)
}
function f(b,p,x,y){ //minimax ai
  var m=0,
  h=function(b,p1,x1,y1,p2,x2,y2,d){
    var i,
    m=-s*s*s,//100000000;
    c=2;
    for(i=2;i<6;i++){
      var e=b.concat(),//copy the table
      f=q(e,p1,x1,y1,i);
      if(d<3){//maximum depth
        f=f-h(e,p2,x2,y2,p1,x1,y1,d+1)[1];
        //f=f-r[1];

      }
      if(f>=m){
        c=i;
        m=f;
      }      
    }
    return [c,m]
  };
  return h(b,p,x,y,0,0,0,0)[0]
}




I.onclick=function(e){
  var x=~~((e.clientX-I.offsetLeft)/u),
      y=~~((e.clientY-I.offsetTop)/u),
      i=w*y+x,
      c=b[i];
  if(c>1){
    // us
    a=q(b,0,0,0,c);
    // them
    c=q(b,1,v,v,f(b,1,v,v));//hardcoded response to player
    //board[ i ] = 0;
    if(a+c==s)(a>c)?q(b,0,v,v,1):q(b,1,0,0,0);
    d()  
  }
};
d();
