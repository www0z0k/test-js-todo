var main = {
	useStorage:false, //which storage to use
	init:function(){
		var avail = typeof(Storage) !== undefined ? true : false; //set
		this.useStorage = avail;
		this.readFromStorage();  //read
    },
    addNew:function(){ //adds a new (empty) element
    	document.getElementById('main-container').appendChild(entryElement.createEntryElement(dataContainer.createNextVO().getIdString()));
    },
    writeToStorage:function(str){ //writes a string to the available storage
    	if(this.useStorage){
    		localStorage.setItem("list", str);
    	}else{
			document.cookie = str;
    	}
    	
    }, 
    readFromStorage:function(){ //reads a string from the available storage
    	var str = '';
    	if(this.useStorage){
    		str = localStorage.getItem("list");
    	}else{
    		str = document.cookie;
    	}
    	dataContainer.load(str); //and gives it to dataContainer
    },
    render:function(arr){ //fills main-container with new elements
    	document.getElementById('main-container').innerHTML = '';
    	for(var i = 0; i < arr.length; i++){
    		document.getElementById('main-container').appendChild(entryElement.createEntryElement(arr[i].getIdString(), arr[i].title, arr[i].text, arr[i].done));		
		}
    },
    updateOrder:function(){ //re-renders re-sorted items
        this.render(dataContainer.sortItems());
    }
};
	