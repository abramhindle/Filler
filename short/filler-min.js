var u=16,w=32,P=512,s=1024,v=31,x=y=i=0,C=['black','gray','red','blue','green','cyan'],b=new Array(s),I=document.getElementById('c'),A=I.getContext('2d');A.createImageData(P,P);I.width=I.height=P;while(i<s){b[i++]=~~(Math.random()*4+2)}b[0]=0;b[s-1]=1;function d(){for(y=0;y<w;y++){for(x=0;x<w;x++){A.fillStyle=C[b[w*y+x]];A.fillRect(x*u,y*u,u,u);}}}function h(b,x,y,c,k){if(!(x>=0&&x<w&&y>=0&&y<w))return 0;i=w*y+x;if (b[i]==c){b[i]=k;return 1+h(b,x+1,y,c,k)+h(b,x-1,y,c,k)+h(b,x,y-1,c,k)+h(b,x,y+1,c,k)}return 0}function q(b,p,x,y,c){h(b,x,y,p,c);return h(b,x,y,c,p)}function f(b,p,x,y){var m=0,h=function(b,p1,x1,y1,p2,x2,y2,d){var i,m=-s*s*s,c=2;for(i=2;i<6;i++){var e=b.concat(),f=q(e,p1,x1,y1,i);if(d<5){f=f-h(e,p2,x2,y2,p1,x1,y1,d+1)[1];}if(f>=m){c=i;m=f;}}return [c,m]};return h(b,p,x,y,0,0,0,0)[0]}I.onclick=function(e){var x=~~((e.clientX-I.offsetLeft)/u),y=~~((e.clientY-I.offsetTop)/u),i=w*y+x,c=b[i];if(c>1){a=q(b,0,0,0,c);c=q(b,1,v,v,f(b,1,v,v));if(a+c==s)(a>c)?q(b,0,v,v,1):q(b,1,0,0,0);d()}};d();