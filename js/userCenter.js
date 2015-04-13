$(window).ready(function(){ 
	addEvent();
});

function addEvent(){ 
	$("#whitePage").hide();
	$("input[name=userEmail]").blur(function(){ 
		var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
		if(!reg.test($(this).val())){ 
			$("#mailMsg").text("非法的邮箱");
		}else{ 
			$("#mailMsg").text("");
		}
	})
	$("input[name=phoneNumber]").blur(function(){ 
		var index = $(this).val().length;
		if(index!=11){ 
			$("#phoneMsg").text("非法的手机号");
		}else{ 
			$("#phoneMsg").text("");
		}
	})

	$("#saveOrEdit").click(function(){
		if($(this).text()=="编辑"){ 
			$(this).text("保存");
			$("input[name=userEmail]").removeAttr("disabled").css("background","white"); 
			$("input[name=phoneNumber]").removeAttr("disabled").css("background","white");
			$("input[name=address]").removeAttr("disabled").css("background","white");
			$("input[name=restName]").removeAttr("disabled").css("background","white");
			$("input[name=tableNumber]").removeAttr("disabled").css("background","white");
		}else{ 
			if($("#phoneMsg").text()=="" && $("#mailMsg").text()=="")
				document.modifyUserMsg.submit();
		} 
	});

	$("#modifyPass").click(function(){ 
		$("#whitePage").show();
		$("#saveOrEdit").attr("enable",'false');
	});
	$("input[name=nowPass]").click(function(){ 
		$("#passTips").text("");
	});
	$("input[name=password]").blur(function(){ 
		var val = $(this).val();
		var reVal = $("input[name=newPass]").val();
		if(val!=reVal){ 
			$("#passVali").text("确认失败");
		}else{ 
			$("#passVali").text("");
		}
	});

	$("#ok").click(function(){ 
		if($("#passVali").text()!="" || $("input[name=nowPass]").val()=="" ||
			$("input[name=password]").val()==""){ 
			return ;
		}
		var nowPass  = $("input[name=nowPass]").val();
		var newPass = $("input[name=password]").val();
		json = {
			"prevPass":nowPass,
			"newPass":newPass
		}
		$.ajax({      
  				type: "POST",
   				url: "",
   				data: json,
   				success: function(msg){		//发送1表示成功，否则将错误信息打印
    				if(msg==1){
    					$("#whitePage").hide();
    				}else{ 
    					$("#passTips").text(msg);
    				}
  				 }
		});
	});

	$("#cancel").click(function(){ 
		$("#whitePage").hide();
	});
}