// --------  JavaScript Document  -------- //
//Name: Nathan Byarley
//Project: Week 2
//Term: 1309
//Class: ASD

//Added sections for each page. these are just the basics as they will change as needed through the remaining weeks.

$('#homepg').on('pageinit', function() {
});

$('#addItem').on('pageinit', function() {
		var myForm = $('#equipmentForm');
			myForm.validate({
				invalidHandler: function(form, validator) {
					},
				submitHandler: function(form) {
				var data = myForm.serializeArray();
				saveData(this.key);//data
				}
		
			});
	//save data function
	var saveData = function(data, key) {
		if(!key) {
		    //if there is no key it means this is a new items and needs a new key.
			var randomID = Math.floor(Math.random()*10000001);
		}else {
		//set the id to the existing key were editing so that it will save over the data
		//the key is the same key thats been passed alon fron the edit buttin even handler
		//to the validate funtion, and then pass here into the store data function.
			randomID = key;
		}
		
		//get form information and store within an object
		var equipment = {};
			equipment.equipmentName = [$("#ename").val()];
			equipment.itemList = [$("#itemList").val()];
			equipment.rarity = [$("input:radio[name=rarity]:checked").val()];
			equipment.levelSlide = [$("#islide").val()];
			equipment.addNote = [$("#note").val()];
			
			//convert object to string
			localStorage.setItem(randomID, JSON.stringify(equipment));
			
			//notify the user, equipment has been added
			if(localStorage.length === 0){
				alert("Equipment not saved");
			} else {
				alert("Equipment has been added to localStorage")

			}
		window.location.reload();
	};

});

$('#equipmentNameSearch').on('pageinit', function(){
	$('#json').on('click', function(){
		$('#equipListings').empty();
		$.ajax({
			url		 : 'xhr/data.json',
			type	 : 'GET',
			dataType : 'json',
			success  : function(jsondata) {
				for(var i=0, j=jsondata.equipment.length; i<j; i++) {
					var equip = jsondata.equipment[i];
					$(''+
						'<div class="listing">' +
				          '<h2>' + 'Equipment Name: ' + equip.equipmentName +'</h2>' +
				          '<p>' + 'Item Slot: ' + equip.itemList +'</p>' +
				          '<p>' + 'Rarity: ' + equip.rarity +'</p>' +
				          '<p>' + 'Level: ' + equip.levelSlide +'</p>' +
				          '<p>' + 'Note: ' + equip.addNote +'</p>' +
				        '</div>'
				    ).appendTo('#equipListings');
				}
			}
		});
	});
	$('#xml').on('click', function(){
		$('#equipListings').empty();
		$.ajax({
			url		 : 'xhr/data.xml',
			type 	 : 'GET',
			dataType : 'xml',
			success	 : function(xml) {
				$(xml).find('item').each(function() {
					var equipmentName = $(this).find('equipmentName').text();
					var itemList = $(this).find('itemList').text();
					var rarity = $(this).find('rarity').text();
					var levelSlide = $(this).find('levelSlide').text();
					var addNote = $(this).find('addNote').text();
					$(''+
					'<div class="listing">' +
						'<h2>' + 'Equipment Name: ' + equipmentName +'</h2>' +
						'<p>' + 'Item Slot: ' + itemList +'</p>' +
						'<p>' + 'Rarity: ' + rarity +'</p>' +
						'<p>' + 'Level: ' + levelSlide +'</p>' +
						'<p>' + 'Note: ' + addNote +'</p>' +
					'</div>').appendTo('#equipListings');
				});
			}

		});
	});
});	

$('#slotSearch').on('pageinit', function(){
	$('#lstorage').on('click', function(){
		//Clears the field before it repoplulates it with new data
		//this will prevent duplicates
		$('#slotListings').empty();
		//for loop to continue through localStorage for all items.
		for( var i=0, ls = localStorage.length; i < ls; i++) {
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);

		var objectString = JSON.parse(value);
		//console.log(objectString);

			var subList = $(''+
				'<div class="listing">' +
					'<h3>' + 'Equipment Name: ' + objectString.equipmentName +'</h3>' +
					'<p>' + 'Item Slot: ' + objectString.itemList +'</p>' +
					'<p>' + 'Rarity: ' + objectString.rarity +'</p>' +
					'<p>' + 'Level: ' + objectString.levelSlide +'</p>' +
					'<p>' + 'Note: ' + objectString.addNote +'</p>' +
					'<div class="ui-block-b">' + '<input type="button" class="delete" value="Delete" id="' + key + '"/>' + '</div>'+
					'<div class="ui-block-b">' + '<input type="button" class="edit" value="Edit" id="' + key + '"/>' + '</div>'+
					'<br />'+
				'</div>'
			).appendTo('#slotListings');

			//delete function
			$('.delete').on('click', function(){
				var answer = ('Are you sure you want to delete this item?');
				if (answer){
					var dKey = this.id;
					localStorage.removeItem(dKey);
					window.location.reload();
				}

				
			});

			//edit function
			$('.edit').on('click', function(){
				$.mobile.changePage('#addItem');
				var eKey = $(this).attr('id');
				
				$('#ename').val(objectString.equipmentName[0]);
				$('#itemList').val(objectString.itemList[0]);
            	var radioBtn = document.forms[0].rarity;
				for(var i = 0; i < radioBtn.length; i++){
					if(radioBtn[i].value == "Common" && equipment.rarity[1] == "Common") {
						radioBtn[i].setAttribute("checked", "checked");
					}else if(radioBtn[i].value == "Uncommon" && equipment.rarity[1] == "Uncommon") {
						radioBtn[i].setAttribute("checked", "checked");
					}else if(radioBtn[i].value == "Rare" && equipment.rarity[1] == "Rare") {
						radioBtn[i].setAttribute("checked", "checked");
					}else if (radioBtn[i].value == "Epic" && equipment.rarity[1] == "Epic"){
						radioBtn[i].setAttribute("checked", "checked");
					}
				}
            	$('#islide').val(objectString.levelSlide[0]);
            	$('#note').val(objectString.addNote[0]);
				$('#key').val(objectString);
			});
		}
	})
});



//Thsi will clear the localstorage
$("#clearLocalStorage").on('click', function() {
	if(localStorage.length === 0){
		alert("There is nothing to delete");
	}else {
    	var verify = confirm("Are you sure you want to clear the localStorage?");
	}
 
    if (verify) {
        localStorage.clear();
    }
    location.refresh();
});

$('#levelSearch').on('pageinit', function(){
});

$('#about').on('pageinit', function(){
	<!---- Tab function on about page ---->
	$('#about').delegate('.ui-navbar a', 'click', function () {
    	$(this).addClass('ui-btn-active');
    	$('.content_div').hide();
    	$('#' + $(this).attr('data-href')).show();
	});
});

(function(){
	$('#deleteItem').bind('click', deleteLocalItem);
})


