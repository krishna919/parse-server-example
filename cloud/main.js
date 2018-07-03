
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hii');
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

