let express = require('express');
let app = express();
const PORT = process.env.PORT || 3030;
let { engine } = require("express-handlebars")
let bodyParser = require('body-parser');

//___________________________________________ChatGPT__
console.log(process.env)
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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"
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
	  console.log(req.body)

	  // Generate a response with ChatGPT
	  const completion = await openai.createCompletion({
	    model: "text-davinci-002",
	    prompt: prompt,
	    max_tokens:2400
	  
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
