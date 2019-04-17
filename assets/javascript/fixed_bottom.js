(function(){
	var button2 = document.getElementById('smartcmsht-button'),
	wrapper2 = document.getElementById('smartcmsht-wrapper'),
	overlay2 = document.getElementById('smartcmsht-overlay');
	

	//open and close menu when the button is clicked
	var open = false;
	button2.addEventListener('click', handler2, false);
	wrapper2.addEventListener('click', smartcmshthandle, false);

	function smartcmshthandle(e){
		e.stopPropagation();
	}

	function handler2(e){
		if (!e) var e = window.event;
	 	e.stopPropagation();//so that it doesn't trigger click event on document

	  	if(!open){
	    	openNav();
	  	}
	 	else{
	    	open = false;
			button2.innerHTML = "+";
			classie.remove(overlay2, 'on-overlay');
			classie.remove(wrapper2, 'opened2-nav');
	  	}
	}
	function openNav(){
		open = true;
	    button2.innerHTML = "-";
	    classie.add(overlay2, 'on-overlay');
	    classie.add(wrapper2, 'opened2-nav');
	}
	function closeNav(){
		open = false;
		button2.innerHTML = "+";
		classie.remove(overlay2, 'on-overlay');
		classie.remove(wrapper2, 'opened2-nav');
	}

})();
