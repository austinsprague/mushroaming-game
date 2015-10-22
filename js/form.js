var submit = document.getElementById('submit');

var formUserInfo = function(event){
  event.preventDefault();
  var firstname = document.getElementById('firstname').value;
  var comment   = document.getElementById('commentTextArea').value;
  
  var user = new userDetails(firstname,comment);
  addInput(user);
};

submit.addEventListener('click', formUserInfo);

var InputList = [];  

var userDetails=function(firstname,comment){
    this.firstname=firstname;
    this.comment=comment;
};

var addInput = function(user){ 
      InputList.push(user); 
      saveInputListToBrowser();
      displayComments();
}; 

$(window).load(function() {
      FormInputFromBrowser();
});


var FormInputFromBrowser = function() {
  var getInput = localStorage.getItem('jsonInput');
  if (getInput != null) {
    InputList = JSON.parse(getInput);
  }
 displayComments();
}

var displayComments = function() {
  $("#commentAppend").empty();

  for (var i = 0; i < InputList.length; i++) {

    var commentHTML = '<p class="commentJS">"{{comment}}"</p><span class="username">-{{username}}</span><hr></br>';
    var commentData = InputList[i];
    commentHTML = commentHTML.replace("{{username}}", commentData.firstname);
    commentHTML = commentHTML.replace("{{comment}}", commentData.comment);
    
    $("#commentAppend").append(commentHTML);
  
    
  }  

}
//inputist Object converted into Strings;KeyValue
var saveInputListToBrowser = function(){
    var jsonObject = JSON.stringify(InputList);
    localStorage.setItem('jsonInput',jsonObject);
};




