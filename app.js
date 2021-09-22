const express= require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/", function(req,res){
  res.sendFile(__dirname +"/signup.html");
});



app.post("/",function(req,res){
  const f_name= req.body.fname;
  const l_name= req.body.lname;
  const e_mail= req.body.email;
  //console.log(f_name, l_name, e_mail);
  const data={
    members:[
      {
      email_address:e_mail,
      status:"subscribed",
      merge_fields:{
        FNAME:f_name,
        LNAME:l_name
      }
    }
    ]
  };
  const jsondata=JSON.stringify(data);


    const url="https://us4.api.mailchimp.com/3.0/lists/0159a8566c";
    const option={
        method: "POST",
        auth: "ssuman:cbfc8cf0f89bf241bc45aa82c4b6ba76-us5"
    }
  const request= https.request(url,option,function(response){

    if (response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    }
    else{
        res.sendFile(__dirname+"/failure.html");
    }

        // if (response.statusCode===200){
        //   res.send("Successfully subscribed!");
        // }
        // else{
        //   res.send("Error!");
        // }
        response.on("data",function(data){
          console.log(JSON.parse(data));
        });
      });
      request.write(jsondata);
      request.end();
  });

  app.post("/failure", function(req,res){
      res.redirect("/");
  });


app.listen(process.env.PORT || 3000,function(req,res){
  console.log("listening...");
});

//API key
//cbfc8cf0f89bf241bc45aa82c4b6ba76-us5

//uniuqe ID
//0159a8566c
