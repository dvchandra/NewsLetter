const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
  });
app.post("/",function(req,res){
  const fname=req.body.fname;
  const lname=req.body.lname;
  const email=req.body.emailadd;
  const data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:fname,
          LNAME:lname
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);
  const url="https://us6.api.mailchimp.com/3.0/lists/7a00f62c41";
  const options={
    method:"POST",
    auth:"dvchandra:421b7a2fab733e564f05c5a0c73ba22d-us6"
  }
  const request=https.request(url, options,function(response){
    response.on("data",function(data){
      if(response.statusCode===200){
           res.sendFile(__dirname+"/sucess.html");
      } else{
        res.sendFile(__dirname+"/failure.html");
      }
    })
  })
  request.write(jsonData);
  request.end();
});
app.listen(process.env.PORT || 3000,function(){
  console.log("server started");
});
app.post("/failure",function(req,res){
  res.redirect("/");
})
//api key
//421b7a2fab733e564f05c5a0c73ba22d-us6
//list idea
//7a00f62c41
