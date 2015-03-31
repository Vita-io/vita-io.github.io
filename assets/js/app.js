// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
/* $(document).foundation(); */

//debounced resizing, courtesy of Paul Irish http://www.paulirish.com/2009/throttled-smartresize-jquery-event-handler/
(function($,sr){

  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100);
      };
  }
  // smartresize 
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');

//animation to "auto" property
jQuery.fn.animateAuto = function(prop, speed, callback){
    var elem, height, width;
    return this.each(function(i, el){
        el = jQuery(el), elem = el.clone().css({"height":"auto","width":"auto"}).appendTo("body");
        height = elem.css("height"),
        width = elem.css("width"),
        elem.remove();
        
        if(prop === "height")
            el.animate({"height":height}, speed, callback);
        else if(prop === "width")
            el.animate({"width":width}, speed, callback);  
        else if(prop === "both")
            el.animate({"width":width,"height":height}, speed, callback);
    });  
}

/* eval odd and even integers */
function isNumber(n){ return n == parseFloat(n); }
function isEven(n){ return isNumber(n) && (n % 2 == 0); }
function isOdd(n){ return isNumber(n) && (Math.abs(n) % 2 == 1); }

//returning a (namespaced) svg object to jquery
function SVG(tag){ return document.createElementNS('http://www.w3.org/2000/svg', tag); }

$(document).ready(function(){
	console.log("doc ready");
	
	$("html").addClass("js");
	
	//init skrollr
	var s = skrollr.init({
		smoothScrolling:true,
		smoothScrollingDuration:200,
		forceHeight:false,
		keyframe: function(slide3, datacenter) {
			var count = new countUp("counter-1", 0, 93, 0, 2);
			count.start();
			var count2 = new countUp("counter-2", 0, 15, 0, 1);
			count2.start();
	    }
	});
	
	//vars
	var wHeight = window.innerHeight,
		wWidth = window.innerWidth,
		wScroll = $(window).scrollTop(),
		words = ['people','place','time'],
		curWord = 0,
		htmlClasses = $("html").attr('class');
	
	//jquery vars
	var	$topOpening = $("#top-opening"),
	     $logo = $("#top-opening #logo"),
	     $spacedItems = $(".space-relative"),
		  switchWord = setInterval(switchWord, 2400);
	
	//top opening height
	$topOpening.css({"height":(wHeight*1.1)/* ,"max-height":wWidth*0.65 */});
	
	//adjusting logo spacing relative to section height
	if(wWidth >= 960){
			$spacedItems.css("margin",($topOpening.height()*0.04));
		}else{
			$spacedItems.css("margin","0");
		}
		
	//resize events
	$(window).smartresize(function(){ 
		wHeight = window.innerHeight,
		wWidth = window.innerWidth; /* console.log(wWidth);console.log(wHeight); */
		$topOpening.css({"height":(wHeight*1.1)/* ,"max-height":wWidth*0.55 */}); 
		
		if(wWidth >= 960){
			$spacedItems.css("margin",($topOpening.height()*0.04));
		}else{
			$spacedItems.css("margin","0");
		}
		
		//skrollr refresh datapoints
		s.refresh();
	});
	
	//scroll events
	$(window).scroll(function(e){ 
/* 		e.preventDefault(); */
		wScroll = $(window).scrollTop();
	});
	
	//add scrolling fade in to elements with class .scroll-fadein
	$(".scroll-fadein").each(function(){
		var p = parseInt($(this).offset().top)-wHeight,
		d = $(this).attr("data-delay"),
		s = "data-"+(p+200+d),
		e = "data-"+(p+350+d);
		$(this).attr(s,"opacity:0;top:50px").attr(e,"opacity:1;top:0px");
	});
	
	$(".slide").each(function(){
		$(this)
		.attr({
			"data-400-center":"opacity:0.1",
			"data-center-center":"opacity:1",
			"data-200-center":"opacity:1",
			"data--100-top-bottom":"opacity:0.1",
			"data-smooth-scrolling":"off"
		});
		$(".slide:last").attr({"data--200-center":"opacity:1","data--200-top":"opacity:1;"})
	});
	
	if((wHeight/2) <= 600){ $(".slide").css("min-height",wHeight/2); }else{ $(".slide").css("min-height",500); }
	
	//add slogan stuff to DOM
	
	for(var i=0;i<=words.length-1;i++){
		$("#slogan #words").append('<span id="word-'+i+'" class="rotate">'+words[i]+'</span>');
	}
	$(".rotate").css({'opacity':'0.1'});
	$("#word-0").css({'opacity':'1'}); //first word
	
	function switchWord(){
		curWord=curWord+1;
		if(curWord >= words.length){
			curWord=0;
			$(".rotate").css({'opacity':'0.1'});
			$("#word-"+curWord).css({'opacity':'1'});
		}else{
			$(".rotate").css({'opacity':'0.1'});
			$("#word-"+curWord).css({'opacity':'1'});
		}
	}
	function topPlx(){
		//remove image placeholder
		$topOpening.addClass("js").append('<svg id="top-plx-container" viewBox = "0 0 '+wWidth+' 300" xmlns="http://www.w3.org/2000/svg" version = "1.1"><linearGradient id="gradient-black" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="black" stop-opacity="0" /><stop offset="0.3" stop-color="black" stop-opacity="1" /><stop offset="1" stop-color="black" stop-opacity="1" /></linearGradient><linearGradient id="gradient-blue" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#95d3db" stop-opacity="1" /><stop offset="0.7" stop-color="#95d3db" stop-opacity="1" /><stop offset="1" stop-color="#95d3db" stop-opacity="0" /></linearGradient></svg>');
		$svgContainer = $("#top-plx-container");
			
		var objW = 500,
			objH = 80,
			rot	 = -15,
			borderR = "100px",
			offset = 273;
			
			for(var i = 0; i <= (wWidth/(objW/3)); i++){
				
/* 				$("#top-plx-container").append('<mask id="mask'+i+'"><rect x="0" y="0" width="'+wWidth+'" height="300" fill="url(#gradient)"  /></mask>'); */
				
				var $line = $(SVG("path"));
				
				var objFill = "url(#gradient-black)";
				if(isEven(i)){ 
					objFill = "url(#gradient-blue)"; 
					
					$line.attr({'data-0':'@d:M'+parseInt(-200+(offset*i))+',200 L'+parseInt(-200+(offset*i))+',200', 
								'data-100':'@d:M'+parseInt(-200+(offset*i))+',200 L'+parseInt(150+(offset*i))+',100',
								'data-700':'@d:M'+parseInt(-200+(offset*i))+',200 L'+parseInt(350+(offset*i))+',42'}); 
				}else{
					$line.attr({'data-0':'@d:M'+parseInt(150+(offset*i))+',100 L'+parseInt(150+(offset*i))+',100', 
								'data-100':'@d:M'+parseInt(150+(offset*i))+',100 L'+parseInt(-200+(offset*i))+',200',
								'data-1000':'@d:M'+parseInt(150+(offset*i))+',100 L'+parseInt(-400+(offset*i))+',250'});
				}
					
				$line.attr({ 					
					  'd':'M'+parseInt(-200+(offset*i))+',200 L'+parseInt(150+(offset*i))+',100',
					  'stroke':objFill,
					  'stroke-linecap':'round',
					  'stroke-width':75,
					  'class':'plx-piece',
					  'mask':'url(#mask'+i+')'
				  }).appendTo($svgContainer);
				  
			}//for end
		
	}
	//only for home
	if($("body").hasClass("home")){
  	console.log("welcome home");
  	topPlx();
	}
	
	var sCount = 1,
		$fixedNav = $("#fixed-nav .nav-item-list"),
		navHeight = 23;
	
	
	//detect skrollr mobile class
	if( htmlClasses.indexOf("skrollr-mobile") === -1 ){ 
	
		$fixedNav.append('<li class="nav-item"><a href="#top-opening" class="nav-item-link" data--1="background:#fff"></a></li>');
		$fixedNav.css({"height":navHeight,"margin":"0"});
		
		//fixed nav
		$(".slide").each(function(){
			sCount = sCount+1;
			navHeight = navHeight+23;
			
			var slideId = $(this),
				slideHeight = $(slideId).height(),
				slidePadding = parseInt($(slideId).css("padding-top"))*2,
				slidePos = $(slideId).offset().top,
				slideScrollOffset = $(slideId).attr("data-scroll-offset") || 0,
				scrollPos = (slidePos-50)-( (wHeight/2)-(slideHeight-slidePadding)-slideScrollOffset );
				
			$fixedNav.append('<li class="nav-item"><a href="#'+$(this).attr("id")+'" class="nav-item-link" data-0="background:transparent" data-'+scrollPos+'="background:#fff"></a></li>');
			$fixedNav.css("height",navHeight);
		});
	}
	
	//fading scroll animation
	var faders = new Array,
		faderStart = 200,
		faderOffset = -30;
	
	$(".fader").each(function(){
		faders.push($(this));
	});
	
	$.each(faders, function(index){
		var faderData = (faderStart+(faderOffset*(index+1)));
		$(this).attr('data-'+faderData+'-center','@opacity:0;transform:translateY(0px);')
		.attr('data-'+(faderData-150)+'-center','@opacity:1;transform:translateY(-30px);') 
		.attr('data-'+(faderData-300)+'-center','@opacity:0;transform:translateY(-60px)');
	});
	
	//bubbles scroll animation
	var bubbles = new Array,
		bubbleStart = 200,
		bubbleOffset = 30;
	
	$(".bubble").each(function(){
		bubbles.push($(this));
	});
	
	bubbles.reverse();
	
	$.each(bubbles, function(index){
		var bubbleData = (bubbleStart+(bubbleOffset*(index+1)));
		$(this).attr('data-'+bubbleData+'-center','@opacity:0;transform:translateY(30px);')
		.attr('data-'+(bubbleData-150)+'-center','@opacity:1;transform:translateY(0px);') 
		.attr('data-'+(bubbleData-300)+'-center','@opacity:0;transform:translateY(-30px)');
	});
	
	$('.nav-item-link, #learn-more .arrow-down').click(function(){
	
		var slideId = $.attr(this, 'href'),
			slideHeight = $(slideId).height(),
			slidePadding = parseInt($(slideId).css("padding-top"))*2,
			slidePos = $(slideId).offset().top,
			slideScrollOffset = $(slideId).attr("data-scroll-offset") || 0,
			slideScrollDur = parseInt($(slideId).attr("data-scroll-dur")) || 700,
			scrollPos = slidePos-( (wHeight/2)-((slideHeight/2)+(slidePadding/2))-slideScrollOffset );
			if((slideHeight) > wHeight-200){ scrollPos = slidePos+(slidePadding/2); }
		
		if(slideId == "#top-opening"){ scrollPos = 0; }
		
		console.log(slidePos+"|"+scrollPos);
	    
	   if(htmlClasses.indexOf("skrollr-mobile") === -1 ){
		 	$('html, body').animate({
		        scrollTop: scrollPos
		    }, slideScrollDur);   
	    }else{
		    //do nothing...for now
	    }
		    return false;
	});
	
	//all done, refresh skrollr
	s.refresh();
	
	//quick email validation
	
	$("form").on('submit', function(e){
		e.preventDefault();
		var targetForm = $(this),
        formData = targetForm.serializeArray(),
        rx = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
        c = formData.length,
        i = 0;
			
			console.log(formData);
			
		$.each(formData, function(i,obj){
			i++
			if(obj.name == "EMAIL"){
				if (!rx.test(obj.value)) {
					//not valid
				    $("#"+targetForm.attr("id")+" .checkInput .button-content").fadeOut(200, function(){
					    $(this).html('Please provide a valid email')
						    	.css({"color":"#f26969","font-size":"14px","letter-spacing":"0.02em","height":"20px"})
						    	.fadeIn(200, function(){ 
				    		setTimeout(function(){ 
				    			$("#"+targetForm.attr("id")+" .checkInput .button-content").fadeOut(200, function(){
					    			$(this).html('subscribe')
									.css({"color":"#353535","font-size":"22px","letter-spacing":"0.08em","height":"auto"})
									.fadeIn(200);
				    			});
				    		}, 2000); 
				    	});
				    });
				    return false; //should throw an error here
				}else{
					//valid
				 	if(i >= c){
				 		console.log('each ended without errors, go ahead');
				 		$("#"+targetForm.attr("id")).off().submit();
				 	}
				}
			}else{return true;}
		});
		
	});
	
	//scrollTo button add .scrollTo class + data-scroll="[scroll position]"
	$(".scrollto").click(function(){
  	var scrollPos = $(this).data("scroll");
  	if((scrollPos-wHeight) > 0){
     scrollPos = scrollPos-(scrollPos-wHeight);
  	}
  	$("body,html").animate({
    	scrollTop: scrollPos
  	},1500, "swing");
	});
	
	//accordeon .accordeon for wrapper/list, child .content for to animated elements(can be more than one)
	$(".accordeon").children().each(function(){
  	var defaultH = $(".content",this).css("height","auto").height(),
  	    startH = 0,
  	    $itemContent = $(".content",this),
  	    itemOffset = $(".header",this).offset().top,
  	    itemTitle = $(".header .title",this).html();
  	    
  	    itemTitle = itemTitle.toLowerCase();
  	    cleanTitle = itemTitle.replace(/\s/g, '-');
    
    $(".header",this).attr("id",cleanTitle);
    
  	$itemContent.css("height",startH+"px");
  	$(".header",this).click(function(e){
    	
    	//close other children
    	$(".accordeon .content").css("height",startH+"px");    	
  	  $(".accordeon .arrow").css({
    	  "transform":"rotate(0deg)",
    	  "-webkit-transform":"rotate(0deg)"
  	  });
    	
    	if($itemContent.height() === startH){
      	$itemContent.css({
        	"height":defaultH
      	}).queue(function(){
        	setTimeout(function(){s.refresh();}, 800);
      	}).next();
      	$("body,html").delay(200).animate({
        	scrollTop: itemOffset
      	},800,"swing");
      	if($(".arrow",this)){
      	  $(".arrow",this).css({
        	  "transform":"rotate(180deg)",
        	  "-webkit-transform":"rotate(180deg)"
      	  });
      	}
    	}else{
      	$itemContent.css({
        	"height":startH
      	}).queue(function(){
        	setTimeout(function(){s.refresh();}, 900);
      	}).next();
      	if($(".arrow",this)){
      	  $(".arrow",this).css({
        	  "transform":"rotate(0deg)",
        	  "-webkit-transform":"rotate(0deg)"
      	  });
      	}
    	}
  	});
	});
	
	/* open specified element if hash is given */
var h = window.location.hash;
    h = h.toLowerCase();
var clean =  h.replace(/\s/g, '-');
    $hTarget = $(clean);
console.log($hTarget);
$hTarget.click();
	
	
});//doc ready