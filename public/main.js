const feedback = document.getElementById("feedbacktext"); 
const submit_button = document.getElementById("submit"); 

submit_button.addEventListener("click",()=>{ 
    console.log("Feedback: ",feedback.value); 
    const options = { 
        method : "POST", 
        body : JSON.stringify({                      //convert to JSON
            feedback : feedback.value 
        }), 
        headers : new Headers({                          //append
            'Content-Type' : "application/json"          //appending json
        }) 
    } 
    fetch("/feedback",options) 
        .then(res=>res.json())                             //promiss funcrion (on fullfilled)
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
    feedback.value = "";                                    //clear any user input after submitting to ease further typing
}); 
