/*
 *  Iphone unlock Animate menu version 0.1
 */

$(function(){	

	var selectedClass=".slideEffect";

	/*
	 * Increase that for faster animation
	 */
	var animationStep=1;

	/*
	 * Hold the dom and if is animating
	 */
	function animatingText(){	
		this.isAnimating;
		this.dom;
	}

	var itemArr= new Array();

	/*
	 * Where the animation actually happens 
	 */
	function animateOption(animatingText,progress,color){

		/*
		 * Animation reached to an end
		 */
		if(progress>50){		
			animatingText.isAnimating=false;
			return;
		}

		/*
		 * move the animation
		 */
		progress+=animationStep;
		$(animatingText.dom).children().first().css({
			"background-image": "-webkit-linear-gradient(left, " +color+ " " + parseInt(17+progress) +"%, rgba(0,0,0,0)  "+ parseInt(53+progress) + "%,  "+ color + " " + parseInt(80+progress) +"%)",
			"-webkit-background-clip": "text",
			"-webkit-text-fill-color": "transparent"
		});

		/*
		 * Run recursive at 60fps ... hopefully.
		 */
		setTimeout(function(){animateOption(animatingText,progress,color)}, 10);	
	}

	/*
	 *	On mouse enter toggle the effect
	 */
	$(selectedClass).mouseenter(function(){  	

		/*
		 * Get the id from data-id to identify the animation
		 */		
		var id = $(this).data('id');

		/*
		 * Create a new object or retreive it if already
		 * created
		 */
		var thisItem =itemArr[id];

		if(thisItem!=undefined){	

			/*
			 * if is already animating exit
			 */
			if(thisItem.isAnimating){
				return;	
			}
		}else{
			thisItem = new animatingText();				
			itemArr[id]=thisItem;	
			thisItem.dom=this;		
		}	

		/*
		 * Set that is animating
		 */
		thisItem.isAnimating=true;	

		/*
		 * Start animation
		 */
		animateOption(thisItem,-70,$(thisItem.dom).children().first().css('color'));		
	});

}); //EOF
