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
			equipment.equipmentName = ["Equipment Name:", $("#ename").val()];
			equipment.itemList = ["Item Slot:", $("#itemList").val()];
			equipment.rarity = ["Rarity:", $("input:radio[name=rarity]:checked").val()];
			equipment.levelSlide = ["Item Level:", $("#islide").val()];
			equipment.addNote = ["Notes:", $("#note").val()];
			
			//convert object to string
			localStorage.setItem(randomID, JSON.stringify(equipment));
			
			//notify the user, equipment has been added
			alert("Equipment has been Added");
			
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
