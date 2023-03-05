
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));


const https = require('https');



var path = require('path');
const { json } = require('body-parser');
app.use(express.static(path.join(__dirname,'/public')));


app.listen(80, function(){
    console.log('the server is started at port:'+80);
});


app.get('/', function(req, res){

    res.sendFile(__dirname+'/sign-up.html');

});



app.post('/failure', function(req, res){
    res.redirect('/');
});



app.post('/form-data',function(req, res){

    const fname = req.body.fname;
    const lname = req.body.lname;
    const emailId = req.body.emailId;

    const userData ={

        members : [
            {
                email_address :emailId,
                status:"subscribed",
                merge_fields : {
                    FNAME:fname,
                    LNAME:lname
                }
            }
        ]


    }

    const dataToPost = JSON.stringify(userData);


    const url = 'https://us12.api.mailchimp.com/3.0/lists/4f002e923b';

    const options = {

            method:"POST",
            auth:"hemanthreddy:77df04f8d2c263042297a40d5249a3be-us12",
    }
    

   const requests =  https.request(url, options, function(response){

        if (response.statusCode ===200){
            res.sendFile(__dirname+'/success.html')
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
    });

    requests.write(dataToPost);
   
    requests.end();

    


});