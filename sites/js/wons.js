jQuery(document).ready(function() {
	jQuery(".d_left").mouseover(function() {
		jQuery(".d_left").css("background", "#d6d6d6");
		/*
        $( ".d_left" ).animate({
          backgroundColor: "#d6d6d6",
        }, 1000 );
        */
		jQuery("#img_wonH").attr("src", "images/index/wonH_over.jpg");
	});
	
	jQuery(".d_left").mouseout(function() {
		jQuery(".d_left").css("background", "");
		jQuery("#img_wonH").attr("src", "images/index/wonH.jpg");
	});
	
	jQuery(".d_right").mouseover(function() {
		jQuery(".d_right").css("background", "#d6d6d6");
		jQuery("#img_Hwon").attr("src", "images/index/Hwon_over.jpg");
	});
	
	jQuery(".d_right").mouseout(function() {
		jQuery(".d_right").css("background", "");
		jQuery("#img_Hwon").attr("src", "images/index/Hwon.jpg");
	});
	
	
	
	
});	