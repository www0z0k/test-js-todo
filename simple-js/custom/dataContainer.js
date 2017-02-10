var dataContainer = {
	items : {}, //all entries
	createNextVO : function(){//creates and returns an empty one
		var item = new VO();
		this.items[item.getIdString()] = item;
		return item;
	},
	processChange:function(id){ //a handler for UI change
		var obj = {				//reads entry data into an object
			title : $('#' + id + '-text').val(),
			text : $('#' + id + '-area').val(),
			checked : $('#' + id + '-box').is(":checked"),
			index : id.split('-')[1],
			id : id
		};
		var toChange = this.items[obj.id]; //and sets this data 
		toChange.text = obj.text || '';
		toChange.title = obj.title;
		toChange.done = obj.checked;
		if(toChange.done){				   //changes styles according to new data
			$('#' + id + '-text').addClass('entry-done');
			$('#' + id + '-area').addClass('entry-done');
			$('#' + id).addClass('single-entry-done');

			$('#' + id + '-text').prop('disabled', true);
			$('#' + id + '-area').prop('disabled', true);
		}else{
			$('#' + id + '-text').removeClass('entry-done');
			$('#' + id + '-area').removeClass('entry-done');
			$('#' + id).removeClass('single-entry-done');

			$('#' + id + '-text').prop('disabled', false);
			$('#' + id + '-area').prop('disabled', false);
		}
		this.save(); 					  //and saves it
	},
	deleteItem:function(id){ //remove item from items and from view
		delete this.items[id];
		$('#' + id).remove();
		this.save();         //save new state
	},
	save:function(){ //that's just it - create a string and pass it to main to write it somewhere
		var jsstr = JSON.stringify(this.items);
		main.writeToStorage(jsstr);
	},
	load:function(str){ //handles a string loaded by main
		this.items = {};
		var arr = JSON.parse(str);
		for(var i in arr){
			vo = new VO().init(arr[i].id, arr[i].title, arr[i].text, arr[i].done); //creates a new VO
			this.items[vo.getIdString()] = vo;
		}
		main.render(this.sortItems()); //calls main.render
	},
	sortItems:function(){ //sorts items in desired order
		var result = [];
		for(var k in this.items){
			result.push(this.items[k]); //fills a new array
		}
		result.sort(function(a, b){return a.title > b.title ? -1 : 1}); //sort it
		return result;
	}
}


function VO(){ //the data container value object
	this.id = new Date().getTime(); //uses timestamp as a unique id
}
VO.prototype = {
	constructor : VO,
	id : '',
	text : '',
	title : '',
	done : false,
	getIdString : function(){ //id usage as key and html id attr
		return 'id-' + this.id;
	},
	init:function(idNum, titleText, bodyText, isDone){ // a way to fill it in one line
		this.id = idNum;
		this.title = titleText || '';
		this.text = bodyText || '';
		this.done = isDone || false;
		return this;
	}
};