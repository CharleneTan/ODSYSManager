$(window).ready(function(){ 
	$("#sortBtn").hide();
	$("#search").hide();
	$("#add").hide();
	$("#isSure").hide();
	$("#modify").hide();
	$("#suba").click(function(){
		var id = $("#id").val();
		var name = $("#name").val();
		var sort =   $("#selects").find("option:selected").text();
		var price = $("#price").val();
		var Signature = $("#Signature").is(':checked');
		var daily =$('#daily').is(':checked');
		var data = { 
			'id':dbid,
			'name':name,
			'sort':sort,
			'price':price,
			'Signature':Signature,
			'daily':daily
		}

			//修改菜品的Ajax处理

		$.ajax({
	        url: "",
	        type: "post",
	        data: data,
	        success: function(msg) {//  返回就表示成功
	     		$("#modify").hide();
	        },
	        cache: false,
	 	 });	
	});

	addEvent();
});
var did=""; 
var dbid="";
function addEvent(){ 
	var flog=1;
	var srea=1;
	var phone='';
	$("#sortBtnClick").click(function(){ 
		if(flog){
			$("#sortBtn").show();flog=0;
		}
		else{
			$("#sortBtn").hide();flog=1;
		}
	});
	$("div [in=0]").bind("click",function(){ 
		$("#sortBtnClick span").text("全部");
		$("#sortBtn").hide();flog=1;
		clearDiv(0);
	});
	$("div [in=1]").bind("click",function(){ 
		$("#sortBtnClick span").text("热菜");
		$("#sortBtn").hide();flog=1;
		clearDiv(1);
	});
	$("div [in=2]").bind("click",function(){
		$("#sortBtnClick span").text("凉菜"); 
		$("#sortBtn").hide();flog=1;
		clearDiv(2);
	});
	$("div [in=3]").bind("click",function(){ 
		$("#sortBtnClick span").text("汤羹");
		$("#sortBtn").hide();flog=1;
		clearDiv(3);
	});
	$("div [in=4]").bind("click",function(){ 
		$("#sortBtnClick span").text("主食");
		$("#sortBtn").hide();flog=1;
		clearDiv(4);
	});
	$("div [in=5]").bind("click",function(){ 
		$("#sortBtnClick span").text("酒水");
		$("#sortBtn").hide();flog=1;
		clearDiv(5);
	});
	$("div [in=6]").bind("click",function(){ 
		$("#sortBtnClick span").text("推荐");
		$("#sortBtn").hide();flog=1;
		clearDiv(6);
	});

	$("div [in=7]").bind("click",function(){ 
		$("#sortBtnClick span").text("招牌");
		$("#sortBtn").hide();flog=1;
		clearDiv(7);
	});


	$("#inputText").click(function(){ 
		$(this).val("");
	});
	$('#inputText').blur(function(){ 
		phone = $(this).val();

	});

	$('#search div[index=1]').click(function(){ 
		$("#search").hide();
		$("#asName").text("按名称");
	});

	$('#search div[index=2]').click(function(){ 
		$("#search").hide();
		$("#asName").text("按编号");
	});

	$('#asName').click(function(){ 
		$("#search").show();
	});	

	$("#serachBtn").click(function(){
		if(phone==""){ 
			return ;
		}
		var g = $("#asName").text();
		if(g=="按名称"){ 
			dealSerach(phone,true);			
		}else{ 
			dealSerach(phone,false);
		}

	});

	$("[op=2]").click(function(){ 
		//发送请求
		did= $(this).parent().parent().children(":first").text();
		dbid= $(this).parent().parent().children(":eq(4)").val();
		$("#isSure").show();
	});
	$("[op=1]").click(function(){ 
		//发送请求
		var id = $(this).parent().parent().children(":eq(0)").text();
		dbid= $(this).parent().parent().children(":eq(4)").val();
		var Signature = $(this).parent().parent().attr("Signature");
		var daily = $(this).parent().parent().attr("daily");
		var name = $(this).parent().parent().children(":eq(1)").text();
		var sort = $(this).parent().parent().attr("sort");
		var sortName = ["热菜","凉菜","汤羹","主食","酒水"]
		var  price= $(this).parent().parent().children(":eq(3)").text();
		modifyDishes(id,name,sortName[sort-1],price,Signature,daily);
	});

	
	$("#addDishes").click(function(){ 
		if($("#add").css("display")=="none")
			$("#add").show();
		else
			$("#add").hide();
	});

	$(".inputS").click(function(){ 
		$(this).val("");
	});
	$("#cancel").click(function(){ 
		$("#modify").hide();
	});
	$("#cancelAdd").click(function(){ 
		$("#add").hide();
	});
	$("#ok").click(function(){ 
		isSu();
	});
	$("#no").click(function(){ 
		$("#isSure").hide();
	})
}

function isSu(){         							  //删除菜品
	$.ajax({
	        url: "",
	        type: "post",
	        data: dbid,
	        success: function(msg) {//  返回就表示成功
	        	if(msg){
		           var obj = document.getElementsByTagName("div");
					for(var i=0;i<obj.length;i++)
					{
						if(obj[i].className == 'fTr bgColor2 id' ||obj[i].className == 'fTr bgColor1 id')//找出span标记中class=a的那个标记
						{
							var getObj = obj[i];
							value = getObj.innerHTML;//获得他的innerHTML
							
							if(value==did){ 
								$(obj[i]).parent().remove();
								$("#isSure").hide();
							}
						}
					}
				}
	        },
	        cache: false,
	 	 });
}

function modifyDishes(id,name,sort,price,Signature,daily){ 
	$("#modify").show();
	$("#id").val(id);
	$("#name").val(name);
	$("#selects").val(sort);
	$("#price").val(price);
	if(Signature==1){ 
		$("#Signature").attr("checked",true);
	}
	if(daily==1){
		$("#daily").attr("checked",true);	
	}
}

function dealSerach(phone,flog){
	if(flog){ 
		var obj = document.getElementsByTagName("div");
		$(".row").show();
		for(var i=0;i<obj.length;i++)
		{
			if(obj[i].className == 'fTr bgColor2 name' ||obj[i].className == 'fTr bgColor1 name')//找出span标记中class=a的那个标记
			{
				var getObj = obj[i];
				value = getObj.innerHTML;//获得他的innerHTML
				if(value.search(phone)==-1){ 
					$(obj[i]).parent().hide();
				}
			}
		}
	}else{ 
		var obj = document.getElementsByTagName("div");
		$(".row").show();
		for(var i=0;i<obj.length;i++)
		{
			if(obj[i].className == 'fTr bgColor2 id' ||obj[i].className == 'fTr bgColor1 id')//找出span标记中class=a的那个标记
			{
				var getObj = obj[i];
				value = getObj.innerHTML;//获得他的innerHTML
				console.log(value);
				if(value.search(phone)==-1){ 
					$(obj[i]).parent().hide();
				}
			}
		}
	}
}

function clearDiv(sort){
	if(sort==6){
		$("div .row").hide();
		$("#dishesList div[daily=1]").show();
	}else if(sort==7){ 
		$("div .row").hide();
		$("#dishesList div[Signature=1]").show();
	}else
	if(sort==0){
		$("#dishesList div[sort]").show();
	}else{
		for(var i=1;i<6;i++){ 
			if(i!=sort){
				$("#dishesList div[sort="+i+"]").hide();
			}else{ 
				$("#dishesList div[sort="+i+"]").show();
			}
		}
	}
}