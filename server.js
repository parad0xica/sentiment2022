const express = require("express"); 
const natural = require("natural"); 

const port = process.env.PORT || 5000

let app = express();          //express


  
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 
app.use("/",express.static(__dirname + "/public")); 

const convertTolowerCase = text => {      //converting text to lowerCase
    return text.toLowerCase(); 
} 

const removeNonAlpha = text => { 
    return text.replace(/[^a-zA-Z\s]+/g, '');  //cool stuff found on overflow to remove excessive characters
} 

////////////////////////////      Main function        ///////////////////////////////
app.post("/feedback", (request, response) => {                    

    console.log(request.body); 

    const lowerCaseData = convertTolowerCase(request.body.feedback); 
    console.log("LowerCase: ",lowerCaseData); 

    const onlyAlpha = removeNonAlpha(lowerCaseData);     //only letters will be accepted
    console.log("OnlyAlpha: ",onlyAlpha); 

    const tokenConstructor = new natural.WordTokenizer();         //new array to store words
    const tokenizedData = tokenConstructor.tokenize(onlyAlpha); 
    console.log("Tokenized: ",tokenizedData); 

    const Sentianalyzer = 
    new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');    //stemmer to assign value to each toke
    const analysis_score = Sentianalyzer.getSentiment(tokenizedData); 
    console.log("Sentiment Score: ",analysis_score); 

    response.status(200).json({ 
        message: "Data received", 
        sentiment_score: analysis_score
    }) 
}); 


app.listen(process.env.PORT || 5000, () => { 
    console.log('Running...'); 
});
