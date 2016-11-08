$(function(){
	var add=$("#tijiao");
	var input=$("#text");
	var ul=$(".todolist")
	var todos=[]
	var pos;
	var bianji=$(".bianji")
	var del=$('.del')
	
//	切换页面
//	bianji.on("touchend",function(){
//		$(".lis").css("display","none")
//		$(".lis2").css("display","block")
//	})
//	$(".lis-img").on("touchend",function(){
//		$(".lis").css("display","block")
//		$(".lis2").css("display","none")
//	})


	bianji.on("touchend",function(){
		$(".lis").addClass("lis-class");
		$(".lis2").addClass("lis-class");
		$(".lis").removeClass("lis2-class");
		$(".lis2").removeClass("lis2-class");
	})
	$(".lis-img").on("touchend",function(){
		$(".lis").removeClass("lis-class");
		$(".lis2").removeClass("lis-class");
		$(".lis").addClass("lis2-class");
		$(".lis2").addClass("lis2-class");
	})
	
//	删除提示
	ul.on("touchstart","li",function(e){
		pos=e.originalEvent.changedTouches[0].clientX;
	})
	ul.on("touchend","li",function(e){
		var p=e.originalEvent.changedTouches[0].clientX;
		if(p-pos>=40){
			$(this).addClass("shan");
			todos[$(this).index()].state=1;
			localStorage.todos=JSON.stringify(todos);
		}
		if(p-pos<-40){
			$(this).removeClass("shan");
			todos[$(this).index()].state=0;
			localStorage.todos=JSON.stringify(todos);
		}
	})
	
//	删除
	ul.on('touchend','.img-san',function(){
		var index=$(this).closest('li').index();
		todos.splice(index,1);
		localStorage.todos=JSON.stringify(todos);
		ul.find("li").eq(index).find(".guding").css("display","none");
		ul.find("li").eq(index).fadeOut(800)
		ul.find("li").eq(index).addClass('ani-delete');
		ul.find("li").eq(index).delay(800).queue(function(){
			$(this).dequeue();
		});
	});


//已完成，*变亮
	ul.on('touchend','.del',function(){
		var index=$(this).closest('li').index();
		$(this).closest('li').addClass('del2');
		todos[$(this).closest('li').index()].lei=true;
		localStorage.todos=JSON.stringify(todos);
		ul.find("li").eq(index).addClass('del2');
	});

//	搜索按钮的失去焦点
	$("#text1").blur(function(){
		$(this).val("请输入关键词...")
	})
	$("#text1").focus(function(){
		$(this).val("")
	})	


//	本地存储
	input.blur(function(){
		$(this).val("快来说点什么吧...")
	})
	input.focus(function(){
		$(this).val("")
	})	
	if(localStorage.todos){
		todos=JSON.parse(localStorage.todos);
		for(i=0;i<todos.length;i++){
			var c=(todos[i].lei) ? "del2":"";
			$("<li class="+c+"><img class='img-san' src='img/shan.png'/><img class='guding' src='img/65.png'><div class='content'>"+todos[i].name+"</div><div class='del'></div></li>").appendTo(ul)
			
		}
	}
	
	add.on("touchend",function(){
//		去掉字符串起始和结尾的空格
		var v=$.trim(input.val());
		if(!v){
			return;
		};		
		var todo={
			name:v,
			state:0,
			lei:false,
		}
		todos.push(todo);
		localStorage.todos=JSON.stringify(todos);
		$("<li><img class='img-san' src='img/shan.png'/><img class='guding' src='img/65.png/'><div class='content'>"+v+"</div><div class='del'></div></li>").appendTo(ul);
		
	})
	

	
//	
	var clearall=$('.clearall');
	clearall.on('touchend',function(){
		ul.find('.done').each(function(i){
			$(this).delay(i*80).queue(function(){
				$(this).addClass('ani-delete').dequeue();
			});
		});
		
		var d=800+ul.find('.done').length*80;
		ul.find('.done').delay(d).queue(function(){
			ul.find('.done').remove();
			$(this).dequeue();
		});
		
		
		
		var newarr=[];
		for(var i=0;i<todos.length;i++){
			if (todos[i].state===0){
				newarr.push(todos[i]);
			}
		}
		todos=newarr;
		localStorage.todos=JSON.stringify(todos)
	})
	
//	
	var divs=$(".footer div");
	divs.on("touchend",function(){
		divs.removeClass('active');
		$(this).addClass('active');
		ul.find('li').show();
		var role=$(this).attr('data-role');
		if(role==='re'){
			ul.find('.del2').hide();
		}else if(role==='com'){
			ul.find('li').hide()
			ul.find('.del2').show();
		}
	})
//	var all=$(".footer .all")
//	var complay=$(".footer .complay");
//	var remind=$(".footer .remind");
//	
//	
//	all.on("touchend",function(){
//		divs.removeClass("active")
//		$(this).addClass("active")
//		ul.find("li").show()
//	})
//	complay.on("touchend",function(){
//		divs.removeClass("active")
//		$(this).addClass("active")
//		ul.find("li").hide()
//		ul.find("li.del2").show();
//	})
//	remind.on("touchend",function(){
//		divs.removeClass("active")
//		$(this).addClass("active")
//		ul.find("li").hide()
//		ul.find("li:not(.del2)").show();
//	})
	
//	var n;
//	for(var i=100;i<1001;i++){
//		if(n%10)
//	}
//	
//	
	

//	n的n次幂
//	function mi(n){	
//		var sub=1;
//		for(var i=0;i<n;i++){
//		   	sub*=n;
//		   }	
//	  return sub;    
//	}
//console.log(mi(2))

// function min(n){
// 	if(n==0){
// 		return 1;
// 	}else{
// 		return n%mi(n-1)*min(n-1)
// 	}
// }
// console.log(min(6))

//查询功能
$("#text1").on('keyup',function(){
		var key = $(this).val().trim();
		ul.empty();
		todos=JSON.parse(localStorage.todos)
		$(todos).each(function(i,v){
			if(v.name.indexOf(key)!==-1){
       			if(v.name){
       			$("<li class="+c+"><img class='img-san' src='img/shan.png'/><img class='guding' src='img/65.png'><div class='content'>"+todos[i].name+"</div><div class='del'></div></li>").appendTo(ul)
       			}			
       		}
		})		
	})
   
	
	
	
	
})
