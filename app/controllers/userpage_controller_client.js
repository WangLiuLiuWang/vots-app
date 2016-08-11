'use strict';
//page home 
//get the name
(
    function(){
		var downbut = document.querySelector('#downbut');
		var userName = document.querySelector('#userName');
		var url = "/userPage/name/5438";
		function update(data){
			var user = JSON.parse(data);
			if(downbut){
				downbut.innerHTML = user.name+"<span class='caret'></span>";
			}
			if(userName){
				userName.innerHTML = user.name;
			}
		}
		 ajaxFunctions.ready(ajaxFunctions.ajaxRequest("GET",url,update));
	}

)();