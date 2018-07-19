
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hii');
});

Parse.Cloud.afterSave('Com', function(request, response) {
//Parse.Cloud.useMasterKey();
  console.log("hi");
   //runs when Parse.Cloud.run("POSTfromCloud") on the client side is called
  Parse.Cloud.httpRequest({
    url: "http://laravel.notevault.com/reports/trigger.php",
    params: {
      text : "sheshu"
    },
    success: function(httpResponse) {
        response(httpResponse.text);
    },
    error: function(httpResponse) {
        response('Request failed with response code ' + httpResponse.status)
    }
});

  
});


Parse.Cloud.define('hellohi', function(req, res) {
  //res.success('Hiii');
  
  Parse.Cloud.httpRequest({
    url: 'http://laravel.notevault.com/notevault/sample.php'
  }).then(function(httpResponse) {
    res.success(httpResponse.data);
  }, function(httpResponse) {
    res.error('Request failed with response code ' + httpResponse.status);
  });
  
});

//Cloud job
Parse.Cloud.job('SendDailyReport', function(request, response) {
  
  Parse.Cloud.httpRequest({
    url: 'http://laravel.notevault.com/reports/trigger.php?text=hello'
  }).then(function(httpResponse) {
    response.success(httpResponse.data);
  }, function(httpResponse) {
    response.error('Request failed with response code ' + httpResponse.status);
  });
  
  //response.success({
   // status: 'Daily Report Sent to all successfully'
 // });
});

Parse.Cloud.job('SendDailyReportFailed', function(request, response) {
  response.error({
    status: 'Daily Report Sent failed'
  });
});

