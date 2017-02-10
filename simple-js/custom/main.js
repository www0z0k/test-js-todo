var main = {
	useStorage:false,
	init:function(){
		var avail = typeof(Storage) !== undefined ? true : false;
		console.log('Storage available : ' + avail);
		//main-container
		this.useStorage = avail;
		this.readFromStorage();
    },
    addNew:function(){
    	document.getElementById('main-container').appendChild(entryElement.createEntryElement(dataContainer.createNextVO().getIdString()));
    },
    writeToStorage:function(str){
    	if(this.useStorage){
    		localStorage.setItem("list", str);
    		console.log('saved');
    	}else{
			document.cookie = str;
    	}
    	
    }, 
    readFromStorage:function(){
    	var str = '';
    	if(this.useStorage){
    		str = localStorage.getItem("list");
    	}else{
    		str = document.cookie;
    	}
    	dataContainer.load(str);
    },
    render:function(arr){
    	document.getElementById('main-container').innerHTML = '';
    	for(var i = 0; i < arr.length; i++){
    		document.getElementById('main-container').appendChild(entryElement.createEntryElement(arr[i].getIdString(), arr[i].title, arr[i].text, arr[i].done));		
		}
    },
    updateOrder:function(){
        this.render(dataContainer.sortItems());
    }
};
	