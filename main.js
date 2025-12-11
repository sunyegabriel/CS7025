// 依旧假设HTML里有 <p id="contact-feedback"></p> 

// 唯一在外面获取的可能就是这个按钮 The only thing that might be accessible externally is this button
var sendButton = document.getElementById('sendButton');

// Attention，这里本应去检查按钮是否存在，不过这里在代码中已经提前设了按钮，即id="sendButton"，注意这一点至关重要
// (如果页面上没有 'sendButton'，这行会在控制台报错)
// As demonstrated here, the button has already been defined in the code with id="sendButton". 
// It is crucial to note that if there is no ‘sendButton’ on the page, this line will throw an error in the console.
sendButton.onclick = function() {
  
  // -- 把所有获取元素的代码都塞到函数里面 Put all the code for retrieving elements into a function --
  // (这样每次点击按钮都会重新获取一次)
  var nameInput = document.getElementById('name');
  var emailInput = document.getElementById('email');
  var messageInput = document.getElementById('text');
  var feedback = document.getElementById('contact-feedback');

  // 这里将值取出来 Fetch
  var name = nameInput.value;
  var email = emailInput.value;
  var message = messageInput.value;

  // 在这里进行一个一个地检查 Check one by one
  if (name == "") {
    feedback.innerHTML = "name is empty";
    feedback.style.color = "red";
  } 
  else if (email == "") {
    feedback.innerHTML = "email is empty";
    feedback.style.color = "red";
  } 
  else if (message == "") {
    feedback.innerHTML = "message is empty";
    feedback.style.color = "red";
  }
  // 检查，注意不要忽略 @ (Important)
  else if (email.indexOf('@') == -1) {
    feedback.innerHTML = "email is invalid";
    feedback.style.color = "red";
  } 
  // 都通过了 All pass
  else {
    feedback.innerHTML = "Thank " + "you " + name + "!";
    feedback.style.color = "green";

    // 清空 Clear
    nameInput.value = "";
    emailInput.value = "";
    messageInput.value = "";
  }
};





// var carousel=document.querySelector('#carousel')
// var items = carousel.children
// var prevBtn = document.querySelector('#prev')
// var nextBtn =document.querySelector('#next')
// var index=0
// nextBtn.addEventListener('click', function() {
//   items[index].className =''
//   if(index === items.length -1) {
//     index=-1
//   }
// index++
// items[index].className = 'active'
// })

// var timer = setInterval(function () {
//   console.log('间隔2s输出一次')
// }, 2000)

// setTimeout(function () {
//   clearInterval(timer)
// }, 6000)

// setInterval(function() {
//   items[index].className =''
//   if(index === items.length -1) {
//     index=-1
//   }
// index++
// items[index].className = 'active'
// }, 1500);

