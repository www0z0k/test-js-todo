var entryElement = {
	createEntryElement : function(id, title, text, done){
		var span = document.createElement('span');
		$(span).attr('id', id);
		$(span).addClass('single-entry');

		//TODO - create a label or something to explain the checkbox
		var doneBox = document.createElement('input');
		$(doneBox).attr('type', 'checkbox');
		$(doneBox).attr('id', id + '-box');
		$(doneBox).attr('title', 'toggle done');
		$(doneBox).prop('checked', done);
		$(doneBox).addClass('done-box');
		span.appendChild(doneBox);

		var input = document.createElement('input');
		$(input).attr('type', 'text');
		$(input).attr('id', id + '-text');
		$(input).addClass('entry-title');
		if(title){
			input.value = title;
		}
		$(input).attr('placeholder', 'enter task title...');
		
		span.appendChild(input);
		
		var a = document.createElement('span');
		$(a).addClass('delete-entry');
		//$(a).addClass('unselectable');
		$(a).addClass('button');
		//$(a).addClass('hand-cursor');
		$(a).text('delete');
		span.appendChild(a);

		var area = document.createElement('textarea');
		$(area).addClass('entry-text');
		$(area).attr('id', id + '-area');
		if(text){
			area.value = text;
		}
		$(area).attr('placeholder', 'enter task description...');
		
		span.appendChild(area);
		
		if(done){
			$(span).addClass('single-entry-done');
			$(input).addClass('entry-done');
			$(area).addClass('entry-done');

			$(input).prop('disabled', true);
			$(area).prop('disabled', true);
		}


		$(a).on('click', function() {
			if(confirm("Really irreversibly delete this entry forever?")){
				dataContainer.deleteItem(id);
			}
		});
		$(area).bind('input propertychange', function() {
			dataContainer.processChange(id);
		});
		$(input).bind('input propertychange', function() {
			dataContainer.processChange(id);
		});
		$(doneBox).bind('input propertychange', function() {
			dataContainer.processChange(id);
		});

		return span;
	}
}