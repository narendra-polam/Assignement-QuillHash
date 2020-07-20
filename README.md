
# Assignement-QuillHash"   
 
 # Configure Ngnix  to Generate json Logs
**step1** :  Edit configuration file 
`vi /etc/nginx/nginx.conf`

  
**step2**:  Add below log format  
  

    log_format json_logs '{"@timestamp":"$time_iso8601","host":"$hostname",'
                                '"server_ip":"$server_addr","client_ip":"$remote_addr",'
                                '"xff":"$http_x_forwarded_for","domain":"$host",'
                                '"url":"$uri","referer":"$http_referer",'
                                '"args":"$args","upstreamtime":"$upstream_response_time",'
                                '"responsetime":"$request_time","request_method":"$request_method",'
                                '"status":"$status","size":"$body_bytes_sent",'
                                '"request_body":"$request_body","request_length":"$request_length",'
                                '"protocol":"$server_protocol","upstreamhost":"$upstream_addr",'
                                '"file_dir":"$request_filename","http_user_agent":"$http_user_agent"'
                                '}';
    access_log  /var/log/nginx/access_json.log  json_logs;

**step3**:  Restart Ngnix server
  
`nginx restart`

# Clone project from Git Hub  
**step1**: *Clone project* ::   
  
 git clone https://github.com/narendra-polam/Assignement-QuillHash.git
 
 *Note*: 
 1. Before run this command install Nodejs and git in your local.    
 2. Code should be started along with ngnix in same server. (Please provide log path in .env file)
 
    
**step2**: *Go To Project directory*   
 `cd Assignement-QuillHash`


**step3**: *Change Env Values*   

    log_path=/var/log/nginx/access_json.log
    APP_PORT=5000
**step4**: *Install node modules*   
`npm install`

**step5**: *Run Node server*   
`npm start`

# Task - 1 : API Explanation  

**1. POST: /api/login** : *Login in with aws cognito sdk*
Payload : 

    {
      "userName": "",
      "password": "",
      "poolId": "",
      "clientId": "",
      "region": ""
    }

**2. GET: /api/logs/list** : *List out nginx logs*
Sample Response: 

    [
      {
        "@timestamp": "2020-05-04T19:34:13+02:00",
        "host": "myhost.domain.com",
        "server_ip": "46.4.115.158",
        "domain": "46.4.115.158",
        "url": "/api/login",
        "referer": "-",
        "args": "-",
        "upstreamtime": "-",
        "responsetime": "0.000",
        "request_method": "POST",
        "status": "301",
        "size": "169",
        "request_body": "-",
        "request_length": "245",
        "protocol": "HTTP/1.1",
        "upstreamhost": "-",
        "file_dir": "/usr/share/nginx/html/",
        "http_user_agent": "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)"
      },
      {
        "@timestamp": "2020-05-04T19:52:06+02:00",
        "host": "myhost.domain.com",
        "server_ip": "46.4.115.158",
        "client_ip": "106.66.164.90",
        "xff": "-",
        "domain": "myhost.com",
        "url": "/api/logs/list",
        "referer": "-",
        "args": "-",
        "upstreamtime": "-",
        "responsetime": "0.000",
        "request_method": "GET",
        "status": "301",
        "size": "169",
        "request_body": "-",
        "request_length": "422",
        "protocol": "HTTP/1.1",
        "upstreamhost": "-",
        "file_dir": "/usr/share/nginx/html/",
        "http_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36"
      },
      {
        "@timestamp": "2020-05-04T19:52:19+02:00",
        "host": "myhost.domain.com",
        "server_ip": "46.4.115.158",
        "client_ip": "106.66.163.178",
        "xff": "-",
        "domain": "myhost.com",
        "url": "/api/logs/filter",
        "referer": "-",
        "args": "-",
        "upstreamtime": "-",
        "responsetime": "0.000",
        "request_method": "POST",
        "status": "301",
        "size": "169",
        "request_body": "-",
        "request_length": "422",
        "protocol": "HTTP/1.1",
        "upstreamhost": "-",
        "file_dir": "/usr/share/nginx/html/",
        "http_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36"
      }
    ]

**3. POST: /api/logs/filter** : *Filter nginx logs with time, ip address etc*
Payload:

     {
        "@timestamp": "2020-05-04T19:34:13+02:00",
        "host": "myhost.domain.com",
        "server_ip": "46.4.115.158",
        "domain": "46.4.115.158"
      }

# Task - 2 : 

**1. What problems will your application face when ELB(load balancer) is used to route requests?**

    1. Sticky session not possible (also known as session affinity)
    2. TCP/UDP not possible.
    3. Unable to authenticate from Backend server.
   
  **2. Suggest a scalable solution when ELB (Elastic load balancer) is used**

      Project SPLIT into multiple microservice and use `Auto Scaling Group` (scale up and scale down)
