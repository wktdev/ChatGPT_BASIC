let express = require('express');
let app = express();
const PORT = process.env.PORT || 3030;
let { engine } = require("express-handlebars")
let bodyParser = require('body-parser');

//___________________________________________ChatGPT__

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.API
,
});
const openai = new OpenAIApi(configuration);
//_________________________________________________

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
});

app.post("/chat-submit", async (req, res) => {
     
	  const { prompt } = {prompt:req.body.userData};
	 

	  // Generate a response with ChatGPT
	  const completion = await openai.createCompletion({
	    model: "text-davinci-003",
	    prompt: prompt,
	    max_tokens:3000,
            temperature: 0.5
	  
	  });

	  answer = completion.data.choices[0].text


     res.redirect("/")
});



app.get("*",(req,res)=>{
	res.redirect("/")
})




app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

console.log("server running")


