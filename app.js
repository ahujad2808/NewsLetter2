
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
//const client = require("@mailchimp/mailchimp_marketing");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
    const FName = req.body.Fname;
    const LName = req.body.Lname;
    const EMail = req.body.email;
    
    // client.setConfig({
    //     apiKey: "9be896a3fffde0e409c1ca7cdf891a7e",
    //     server: "us14",
    // });
    // const run = async () => {
    //     const response = await client.lists.addListMember("e8762957ed", {
    //       email_address: EMail,
    //       status: "subscribed",
    //       merge_fields: {
    //         FNAME: FName,
    //         LNAME: LName,
    //       }
    //     });
    //     console.log(response);
    //   };
    //   run();

    var data = {
       members: [
        {
            email_address: EMail,
            status: "subscribed",
            merge_fields :{
                FNAME: FName,
                LNAME: LName
            }
        }
       ]
    };

    var jsonData = JSON.stringify(data);
    const url = 'https://us14.api.mailchimp.com/3.0/lists/e8762957ed';
    const options = {
        method: "POST",
        auth: "deva1:ba5956e9779ea3e756221fd1c2ceea73-us14"
    }
    const request = https.request(url, options, function(response){

        if( response.statusCode === 200 ){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
});


app.post("/failure", function(req, res){
    res.redirect("/");
})


app.listen(process.env.PORT || 3000, function(req, res){
    console.log("Listening on 3000");
})

//9be896a3fffde0e409c1ca7cdf891a7e-us14
//e8762957ed