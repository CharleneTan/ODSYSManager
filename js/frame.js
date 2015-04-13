$(window).ready(function(){ 
	initPage();
	$("#orderMsg").hide();
	/************************************/
	$("#settle").click(function(){ 
		$("#orderMsg").hide();
		$("#isSure").show();
	});
	
	/*************************************/
	$("#close").click(function(){ 
		$("#orderMsg").hide();
	})
	listener();
	$("#clearTable").click(clearTable);

	addOrderEvent();
});

function listener(){ 
	setInterval(function(){ 
		$.ajax({                          //发送手机号
   				type: "POST",
   				url: "",
   				data: "",
   				success: function(msg){
    				dealNewOrder(msg);
  				 }
		});
	},20000);
	
}

function createOrders(dname,dprice,dcount){ 
	var divOrder = document.createElement("div");
	$(divOrder).addClass("orders");

	var orderName = document.createElement("span")
	$(orderName).addClass("orderName").text(dname);

	var price = document.createElement("span");
	$(price).addClass("price").text(dprice+"份");

	var count = document.createElement("span");
	$(count).addClass("count").text(dcount+"元");

	divOrder.appendChild(orderName);
	divOrder.appendChild(price);
	divOrder.appendChild(count);
	document.getElementById("orderMess").appendChild(divOrder);
}
var clickTableId = "";
function createComputer(status,tableId){ 
	var divObj = document.createElement("li");

	var img = document.createElement("img");
	$(img).attr("tableId",tableId);
	if(status===0){ 
		img.src="./image/white.png";
	}else if(status===1){ 
		img.src="./image/green.png"
	}else{ 
		img.src="./image/red.png"
	}
	$(img).click(function(){ 
		if(status==2 || status==1){ 
			img.src="./image/green.png";
			computerClick(tableId);
			//清除数据
			clearData(tableId);
		}else{ 
			clickTableId=tableId;
			$("#addNullTableOrder").show();
			clearTableStatus();
		}
		
	});
	var spanTable = document.createElement("span");
	$(spanTable).addClass("number").text(tableId>10?tableId:"0 "+tableId);

	divObj.appendChild(img);
	divObj.appendChild(spanTable);

	document.getElementById("computers").appendChild(divObj);;
}
/**********************************************************************/
function  createAddOrderMsg(name,count,price){
	var divObj = document.createElement("div");
	$(divObj).addClass("ordersMsg");

	var span1= document.createElement("span");
	$(span1).addClass("ordername").text(name);
	
	var span2 = document.createElement("span");
	$(span2).addClass("orderCount");
	var label1 = document.createElement("label");
	$(label1).text('-');
	$(label1).click(function(){ 
		for(var i=0;i<addOrderJson.length;i++){
			if(addOrderJson[i]['name']==name){     
				if(addOrderJson[i]['count']-1==0){ // <<<<<<<<<<<<<<<<<<
					addOrderJson.splice(i,1);

					//取消该菜品的背景色和状态
					var a = $('.dishesName');
					for(var i=0;i<a.length;i++){
						if($(a[i]).text()==name){
							$(a[i]).parent().css('background','white');
						}
					}
				}else{
					addOrderJson[i]['count']--;            //<<<<<<<<<<<<<<<<<<
				}

			}
		}
		addRightOrder();
	});

	var label2 = document.createElement("label");
	$(label2).text(count+"份");
	var label3 = document.createElement("label");
	$(label3).text('+');
	$(label3).click(function(){ 
		for(var i=0;i<addOrderJson.length;i++){
			if(addOrderJson[i]['name']==name){
				addOrderJson[i]['count']++;            //<<<<<<<<<<<<<<<<<<
			}
		}
		addRightOrder();
	});

	span2.appendChild(label1);
	span2.appendChild(label2);
	span2.appendChild(label3);
	var span3 = document.createElement("span");
	$(span3).addClass("ordersPrice").text(price);

	divObj.appendChild(span1);
	divObj.appendChild(span2);
	divObj.appendChild(span3);

	document.getElementById("tableOrders").appendChild(divObj);
}
//<div id="orderPriceTotal">共计:<span style="color:#6A74F5">111元</span></div>
function createOrderTotal(total){
	var divObj = document.createElement('div');
	$(divObj).addClass("orderPriceTotal").text("共计:");
	var span = document.createElement("span");
	$(span).css("color",'#6A74F5').text(total+"元");
	divObj.appendChild(span);
	document.getElementById("tableOrders").appendChild(divObj);
}
var  addOrderJson = [];
function addOrderEvent(){ 
	addEventKeyUp(addInput);
	$("div[dishesSort]").hide();
	$("div[dishesSort=hot]").show();
	$("#closeAddTableOrder").click(function(){ 
		$("#addNullTableOrder").hide();
	});
	$(".tableDishesMsg li").click(function(){ 
		var dishesId=$(this).children(".dishesNumber").text();
		var name = $(this).children(".dishesName").text();
		var price = $(this).children(".dishesPrice").text();
		if($(this).attr('flog')==1){
			var dNumber = $('.tableDishesMsg li');
		    for(var i=0;i<dNumber.length;i++){
		    	if($(dNumber[i]).children(".dishesNumber").text()==dishesId){      // <<<<<<<<<<<<<<<<<<
		    		$(dNumber[i]).css("background",'#62B2E5').attr('flog','0');
		    	}
		    }
			var json = {
				'name':name,
				'count':1,      //  <<<<<<<<<<<<<<<<<<
				'price':price
			}
			
			
			addOrderJson.push(json);
			addRightOrder();
		}else{ 
			var dNumber = $('.tableDishesMsg li');
		    for(var i=0;i<dNumber.length;i++){
		    	if($(dNumber[i]).children(".dishesNumber").text()==dishesId){    //<<<<<<<<<<<<<<<<<<
		    		$(dNumber[i]).css("background",'white').attr('flog','1');
		    	}
		    }
			for(var i=0;i<addOrderJson.length;i++){ 
				if(addOrderJson[i]['name']===name){
					addOrderJson.splice(i,1);
				}
			}
			addRightOrder();
		}
	});
	$("#tableSort li").click(function(){ 
		var sort = $(this).attr('in');
		$("div[dishesSort]").hide();
		$("div[dishesSort="+sort+"]").show();
		$('.checkTableSort').removeClass('checkTableSort');
		$(this).children("span").addClass('checkTableSort');
	});
	$("#dishesSearch").focus(function(){
		$(this).val("");
		$("div [dishesSort]").hide();
		$("div [dishesSort=other]").show();
	});
	$("#addOrderOK").click(function(){
		if(addOrderJson.length==0){
			return ;
		}
		var totals=0;          //<<<<<<<<<<<<<<<<<
		for(var i=0;i<addOrderJson.length;i++){//<<<<<<<<<<<<<<<<<
			var pri = addOrderJson[i]["price"];//<<<<<<<<<<<<<<<<<
			addOrderJson[i]["price"]=pri.substring(2,pri.length-1);//<<<<<<<<<<<<<<<<<
			totals+=parseFloat(addOrderJson[i]["price"]);//<<<<<<<<<<<<<<<<<
		}//<<<<<<<<<<<<<<<<<

		json={
			"total":totals,//《《《《《《《《《《《《《《《《《《《《《《《《《《《《
			"tableId":clickTableId,
			"content":addOrderJson
		}
		console.log(JSON.stringify(json));
		$.ajax({                          
   				type: "POST",
   				url: "",
   				data: json,
   				success: function(msg){
    				$('#addNullTableOrder').hide();
  				 }
		});
	});
}

function addRightOrder(){ 
	$('#tableOrders').empty();
	var total=0;
	for(var i=0;i<addOrderJson.length;i++){
		createAddOrderMsg(addOrderJson[i]['name'],addOrderJson[i]['count'],addOrderJson[i]['price']);
		total+=addOrderJson[i]['count']*parseFloat(addOrderJson[i]['price'].replace('￥:',""));
	}
	createOrderTotal(total);
}

function clearTableStatus(){ 
	$(".tableDishesMsg li[flog=0]").attr('flog','1').css("background",'white');
	$("#tableOrders").empty();
	addOrderJson=[];
}


function addEventKeyUp(eventHandler){
    var inputs = document.getElementById('dishesSearch');
    if(inputs.addEventListener){
        inputs.addEventListener('keyup',eventHandler,true);
    }else{
        inputs.attachEvent('onkeyup',eventHandler);
    }
}
function addInput(e){
    var obj = e.target ? e.target : e.srcElement;
    var inputMsg = obj.value;
    var dNumber = $('.SS li');
    $("#serachMsg").empty();
    for(var i=0;i<dNumber.length;i++){
    	if($(dNumber[i]).children(":first").text().search(inputMsg)!= -1){
    		var number =$(dNumber[i]).children(".dishesNumber").text();
    		var name =$(dNumber[i]).children(".dishesName").text();
    		var price =$(dNumber[i]).children(".dishesPrice").text();
    		var bg = $(dNumber[i]).attr("flog");
    		createSearchOrder(name,number,price,bg);
    	}
    }
}
function createSearchOrder(name,number,price,bg){ 
	var li = document.createElement("li");
	$(li).attr("flog",bg);
	if(bg==0){
		$(li).css("background","#62B2E5")
	}
	var span1  =document.createElement("span");
	$(span1).addClass("dishesNumber").text(number);
	var span2  =document.createElement("span");
	$(span2).addClass("dishesName").text(name);
	var span3  =document.createElement("span");
	$(span3).addClass("dishesPrice").text(price);

	li.appendChild(span1);
	li.appendChild(span2);
	li.appendChild(span3);
	$(li).click(function(){ 
		var dishesId=$(this).children(".dishesNumber").text();
		var name = $(this).children(".dishesName").text();
		var price = $(this).children(".dishesPrice").text();
		if($(this).attr('flog')==1){
			var dNumber = $('.tableDishesMsg li');
		    for(var i=0;i<dNumber.length;i++){
		    	if($(dNumber[i]).children(".dishesNumber").text()==dishesId){      //<<<<<<<<<<<<<<<<<<
		    		$(dNumber[i]).css("background",'#62B2E5').attr('flog','0');
		    	}
		    }
			var json = {
				'name':name,
				'count':1,       // <<<<<<<<<<<<<<<<<<
				'price':price
			}
			addOrderJson.push(json);
			addRightOrder();
		}else{ 
			var dNumber = $('.tableDishesMsg li');
		    for(var i=0;i<dNumber.length;i++){
		    	if($(dNumber[i]).children(".dishesNumber").text()==dishesId){   //<<<<<<<<<<<<<<<<<<
		    		$(dNumber[i]).css("background",'white').attr('flog','1');
		    	}
		    }
			for(var i=0;i<addOrderJson.length;i++){ 
				if(addOrderJson[i]['name']===name){
					addOrderJson.splice(i,1);
				}
			}
			addRightOrder();
		}
	});
	document.getElementById("serachMsg").appendChild(li);
}