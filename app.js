let express = require('express');
let app = express();
let { engine } = require("express-handlebars")
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));

let answer = "";

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.get("/",(req,res)=>{

   res.render("home",{
   	variableFromServer:answer
   })
})

;

app.post("/chat-submit", function(req, res) {
answer = req.body.userData
    console.log(answer)
    res.redirect("/")
});



app.get("*",(req,res)=>{
	res.redirect("/")
})




app.listen(3000);

console.log("server running")