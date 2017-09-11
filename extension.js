

$(function(){
  var data = [1,2,3,4]; // the ids coming back from serviceA
  // 2. Declare an array of Deferred objects
  var processItemsDeferred = [];
  // 3. For each element of data, create a Deferred push push it to the array
  for(var i = 0; i < data.length; i++){
    processItemsDeferred.push(processItem(data[i]));
  }
  // 4. WHEN ALL Deferred objects in the array are resolved THEN call the function
  //    Note : same as $.when(processItemsDeferred[0], processItemsDeferred[1], ...).then(everythingDone);
  $.when.apply($, processItemsDeferred).then(everythingDone);
})
// 3.1. Function called by the loop to create a Deferred object (data is numeric)
function processItem(data) {
  // 3.1.1. Create the Deferred object and output some debug
  var dfd = $.Deferred();
  var theUrl = 'https://jsonplaceholder.typicode.com/comments';
  console.log('called processItem' +  data);
  var xmlHttp = new XMLHttpRequest();
   xmlHttp.onreadystatechange = function() {
       if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
           var element  = document.createElement("p");
           element.innerText = xmlHttp.responseText;
           var apiContent = JSON.parse(xmlHttp.responseText);
           console.log(apiContent.length);
           var bodyElement = document.getElementById('console');
           bodyElement.appendChild(element);
           dfd.resolve();
         }
   }
   xmlHttp.open("GET", theUrl, true); // true for asynchronous
   xmlHttp.send(null);
  // 3.1.2. After some timeout, resolve the current Deferred
  //in the real world, this would probably make an AJAX call.
  //setTimeout(function() { dfd.resolve() }, 4000);
  // 3.1.3. Return that Deferred (to be inserted into the array)
  return dfd.promise();
}
// 4.1. Function called when all deferred are resolved
function everythingDone(){
  // 4.1.1. Do some debug trace
  var element = document.createElement("h1");
  element.className = "myclass";
  element.innerText = "Finally completed all processes...";
  var bodyElement = document.getElementById('console');
  bodyElement.appendChild(element);
}
