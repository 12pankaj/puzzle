var images=[ 	[7,5,2,1,8,4,6,3,9],
				[1,2,9,4,7,3,5,6,8],
				[1,9,8,6,3,7,2,4,5], 
				[8,2,5,4,3,7,1,6,9], 
				[5,7,3,9,2,4,8,6,1], 
				[2,4,9,6,7,5,1,8,3], 
				[1,3,2,6,4,7,5,8,9], 
				[8,3,7,5,6,4,1,2,9], 
				[2,8,9,7,1,5,6,3,4], 
				[6,8,7,1,4,2,9,3,5]
    	    ]
	var a1=1;  var arr=[];
	var click= new Audio("key.mpeg")
	do
    {
	    var r = Math.trunc(Math.random() * 10);
	    var arrr=0;
	    while(arrr<=a1)
	    {
	      if(arr[arrr]==r)
	      {
	        r = Math.trunc(Math.random() * 10) ;
	        arrr =-1;
	      }
	      arrr++;
	    }
	    arr[a1-1]=r;
      a1++;
	}while(a1<=10);
		let randimg=[];
		for(let val of arr){	randimg.push(images[val]); }
		images=randimg;
	    var rand   = Math.trunc(Math.random() * 9);
	    var move   = 0;
	  	var butbox = document.getElementById('randbutton');
	  	var image  = document.getElementById('image');
	  	var moves  = document.getElementById('moves');
	  	moves.innerText = "Moves : "+move;
			image.innerHTML="<img src='im"+rand+"/main.jpg' id='myimage'/>";
			function load() {
  				alert("Click on the tiles around the empty tile to move them and complete the puzzle.");
			}
		for(var i=0;i<images[rand].length;i++)
		{
		var br=document.createElement('br')
			if(i==3 || i==6 )	butbox.append(br)	
		var but=document.createElement('button')
			but.classList.add("col-4")
			but.classList.add("p-2")
			but.classList.add("bg-dark")	
			but.setAttribute("onclick","value1("+i+")")
			if(images[rand][i]==9) but.innerHTML="<img src=\" \">";
			else but.innerHTML="<b>"+images[rand][i]+"</b><img src='im"+rand+"/"+images[rand][i]+".jpg'/>";
			butbox.append(but)
		}
		var btn=document.getElementsByTagName('button')
		function value1(y)
		{
			click.pause();
				var co=btn[y].innerHTML;
			if(btn[y].innerHTML!="<img src=\" \">")
			{
				let valid=false;
			  	moves.innerText="Moves : "+move
				var changeindex = [y + 1, y - 1, y + 3, y - 3];
    for (var i of changeindex) {
      if (i >= 0 && i <= 8 && btn[i].innerHTML == "<img src=\" \">") {
        btn[i].innerHTML = co;
        btn[y].innerHTML = "<img src=\" \">";
        valid=true;
        wincheck();
        
      }
		  }
		  if(valid){

			click.play();
				move++;
		  }
			
		}
	}
		function wincheck(){
			var complet=0;
		if(btn[8].innerHTML=="<img src=\" \">" && btn[0].innerHTML=="<b>1</b><img src=\"im"+rand+"/1.jpg\">" && btn[2].innerHTML=="<b>3</b><img src=\"im"+rand+"/3.jpg\">" && btn[6].innerHTML=="<b>7</b><img src=\"im"+rand+"/7.jpg\">" && btn[3].innerHTML=="<b>4</b><img src=\"im"+rand+"/4.jpg\">" && btn[4].innerHTML=="<b>5</b><img src=\"im"+rand+"/5.jpg\">"  ){
		var i=0;
		while(i!=9){
			btn[i].classList.add("p-0");
			btn[i].classList.remove("p-2");
			btn[i].innerHTML="<img src=\"im"+rand+"/"+(i+1)+".jpg\">"
			 i++;}
		if(btn[8].innerHTML=="<img src=\" \">") btn[8].innerHTML="<img src=\"im"+rand+"/9.jpg\">"
			if(btn[8].innerHTML=="<img src=\"im"+rand+"/9.jpg\">")
			{
		setTimeout(() =>
				{
					var res=confirm("Congratulations!\npuzzle complet \nyour total Moves = "+move+"\n\"you play again \"")
					if(res){
					location.reload();
					}
					else{
						alert("Thanks for playing this game");
					}
				},3000);
			}
			}
			
		}
