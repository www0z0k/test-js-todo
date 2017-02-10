var dataContainer = {
	items : {},
	createNextVO : function(){
		var item = new VO();
		this.items[item.getIdString()] = item;
		return item;
	},
	processChange:function(id){
		var obj = {
			title : $('#' + id + '-text').val(),
			text : $('#' + id + '-area').val(),
			checked : $('#' + id + '-box').is(":checked"),
			index : id.split('-')[1],
			id : id
		};
		var toChange = this.items[obj.id];
		toChange.text = obj.text || '';
		toChange.title = obj.title;
		toChange.done = obj.checked;
		if(toChange.done){
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
		this.save();
	},
	deleteItem:function(id){
		delete this.items[id];
		$('#' + id).remove();
		this.save();
	},
	save:function(){
		var jsstr = JSON.stringify(this.items);
		main.writeToStorage(jsstr);
	},
	load:function(str){
		this.items = {};
		var arr = JSON.parse(str);
		console.log('loaded ');
		console.log(arr);
		for(var i in arr){
			vo = new VO().init(arr[i].id, arr[i].title, arr[i].text, arr[i].done);
			this.items[vo.getIdString()] = vo;
		}
		main.render(this.sortItems());
	},
	sortItems:function(){
		var result = [];
		for(var k in this.items){
			result.push(this.items[k]);
		}
		result.sort(function(a, b){return a.title < b.title ? -1 : 1}); 
		return result.reverse();
	}
}


function VO(){
	this.id = new Date().getTime();
}
VO.prototype = {
	constructor : VO,
	id : '',
	text : '',
	title : '',
	done : false,
	getIdString : function(){
		return 'id-' + this.id;
	},
	init:function(idNum, titleText, bodyText, isDone){
		this.id = idNum;
		this.title = titleText || '';
		this.text = bodyText || '';
		this.done = isDone || false;
		return this;
	}
};