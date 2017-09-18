
$(function(){
	var tests = [];
	var test1 = {test: 100, value: "current"};
	var test2 = {test: 200, value: "currents"};
	var test3 = {test: 100, value: "currentss"};
	var test4 = {test: 200, value: "currentsss"};
	var test5 = {test: 100, value: "currentssss"};
	var test6 = {test: 200, value: "currentsssss"};
	var test7 = {test: 100, value: "currentssssss"};
	var test8 = {test: 200, value: "currentsssssss"};
	tests.push(test1);
	tests.push(test2);
	tests.push(test3);
	tests.push(test4);
	tests.push(test5);
	tests.push(test6);
	tests.push(test7);
	tests.push(test8);
	
	doSomethingAfterAllRequests(tests).then(function() {
    console.log('all done');
    //console.log(JSON.parse(tests));
});
});

function doSomethingAfterAllRequests(test){
	 return test.reduce(function(promise, t) {
        return promise.then(function() {
           return callApi(t).then(function(res) {
                console.log(res);
            });
        });
    }, Promise.resolve());
}

function callApi(values){
	return new Promise(function(resolve, reject){
		if (values.test) {
		var xhttp = new XMLHttpRequest();
	    var theUrl = 'https://jsonplaceholder.typicode.com/comments';
	    xhttp.open("GET", theUrl, true);
	    xhttp.onload = function(){
	    	if(xhttp.status == 200){
	    		values.value = 'mohit';
	    		console.log(values.test);
	    		console.log(values.value);
	    		resolve(JSON.parse(xhttp.response));

	    	}
	    	else{
	    		reject(xhttp.statusText);
	    	}
	    };
	    xhttp.onerror = function(){
	    	reject(xhttp.statusText);
	    };
	    xhttp.send();
  		}
	});
}

