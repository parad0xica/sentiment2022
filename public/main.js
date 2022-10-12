
const feedback = document.getElementById("feedbacktext"); 
const wholeContainer = document.querySelector(".feedback"); 
const resultContainer = document.querySelector(".results"); 

const submit_button = document.getElementById("submit"); 
const closeButton = document.querySelector(".close"); 

const emoji = document.querySelector(".emoji"); 
const sentiment = document.querySelector(".sentiment"); 

submit_button.addEventListener("click",()=>{ 
    console.log("Feedback: ",feedback.value); 
    const options = { 
        method : "POST", 
        body : JSON.stringify({ 
            feedback : feedback.value 
        }), 
        headers : new Headers({ 
            'Content-Type' : "application/json"
        }) 
    } 
    fetch("/feedback",options) 
        .then(res=>res.json()) 
        .then((response)=>{ 
            const score = response.sentiment_score; 
            console.log(response.sentiment_score); 
      
            const image1 = document.getElementById("img1"); //selecting images (including bg) and giving them shortcuts
            const image2 = document.getElementById("img2");
            const image3 = document.getElementById("img3");
            const bg = document.getElementById("image");    

            if(score > 0){                                  //in case of positive score taken from backend, bg disappears and smiling
                image1.style.display = "block";             //face shows up.  
                bg.style.display = "none";

                image2.style.display = "none";
                image3.style.display = "none";              //In case any other emojy was shown previously, these lines cancel them
            }

                else if(score === 0){ 

                image2.style.display = "block";;
                bg.style.display = "none";

                image1.style.display = "none";
                image3.style.display = "none";
            }
            else{ 

                image3.style.display = "block";
                bg.style.display = "none";

                image1.style.display = "none";
                image2.style.display = "none";
            } 
        }) 

        .catch(err=>console.error("Error: ",err)); 

    feedback.value = "";                                    //clear any user input after submitting to ease further typing
}); 
