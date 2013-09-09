// --------  JavaScript Document  -------- //
//Name: Nathan Byarley
//Project: Week 1
//Term: 1309
//Class: ASD

//Added sections for each page. these are just the basics as they will change as needed through the remaining weeks.

$('#homepg').on('pageinit', function() {
});

$('addItem').on('pageinit', function() {
});

$('#equipmentNameSearch').on('pageinit', function(){

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
