
   var socket=io.connect();
   $(function(){
   		var nickname=$("#nickname");
   		var setForm=$("#nickForm");
   		var messageForm=$("#send-message");
   		var message=$("#message");
   		var messages=$("#messages");
   		setForm.submit(function(){
   			event.preventDefault();
   			socket.emit('nickname',nickname.val(),function(data){
   				if(data){
   					setForm.hide();
   					$("#send-message").show();
   				}else{
   					setForm.prepend('<p>sorry</p>');
   				}
   			});
   		});
   		messageForm.submit(function(){
   			event.preventDefault();
   			socket.emit('user message',message.val());
   			message.val('').focus();
   		});
   		socket.on('nicknames',function(data){
   			var html='';
   			for(var i=0;i<data.length;i++){
   				html+='<li>'+data[i]+'</li>';
   			}
   			$("#nicknames ul").empty().append(html);
   		});
   		socket.on('user message',function(data){
   			$("#messages").append('<p><strong>'+data.nick+'</strong>'+data.message+'</p>');
   		});
   });
