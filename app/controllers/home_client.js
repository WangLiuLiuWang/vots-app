var content = document.getElementById('content_title');
var vots = document.getElementById('vots');
var page = 0;var next = true;
var ajax = function(page){
	vots.innerHTML = '';
	var url = '/visit/'+page;
	function update(data){
		if(data !== ''){
			data = data.slice(1,data.length-1).replace(/},{/g,'}||{').split('||');
			var ul = document.createElement('ul');
			data.forEach(function(ele){
				ele = JSON.parse(ele);
				var li = document.createElement('li');
				var a = document.createElement('a');
				a.setAttribute('href','#');
				if(ele.name.length > 10){
					li.innerHTML = ele.name.slice(0,10)+"...";
				}else{
					li.innerHTML = ele.name;
				}
				
				li.setAttribute('onclick','look("'+ele['_id']+'")');
				a.appendChild(li);
				ul.appendChild(a);
			});
			vots.appendChild(ul);
			if(page === 0){
				var div = document.createElement('div');
				div.innerHTML = 'here are some votings.';
				content.insertBefore(div,vots);
				var button1 = document.createElement('button');
				button1.setAttribute('id','down');
				button1.setAttribute('type','button');
				button1.innerHTML = 'pageDown';
				content.appendChild(button1);
				var button2 = document.createElement('button');
				button2.setAttribute('id','up');
				button2.setAttribute('type','button');
				button2.innerHTML = 'pageup';
				content.appendChild(button2);
			}
			
		}else{
			 next = false;
		}
		
	}
	ajaxFunctions.ready(ajaxFunctions.ajaxRequest('get',url,update));
}
ajax(page);
var up = document.getElementById('up');
var down = document.getElementById('down');
if(down !== null){
	down.addEventListener('onclick',function(){
		if(next){
			page++;
			ajax(page);
		}
		
	});
	up.addEventListener('onclick',function(){
		if(page > 0){
			page--;
			ajax(page);
		}
	});

}