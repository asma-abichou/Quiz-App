// in this page, we put like that:
/*
Question1 : What is the collective noun for bears?
Answer selected by the user : 28
Correct Answer: 28

==> put every question/answer block in a <div>
 */

let dataDiv = document.getElementById("all-history");

let data =JSON.parse(localStorage.getItem("quiz_questions"));

for (let i = 0 ; i< data.length ; i++){

 let question = data[i].question ;
 let correctAnswers = data[i].correct_answer ;
 let questionNumber = i + 1;
 let selectedAnswer = localStorage.getItem(`answer${questionNumber}`);
if(selectedAnswer)
{
 dataDiv.innerHTML += `<div><p>Question  ${i+1} :${question}</p>
                           <p style="background-color: ${correctAnswers === selectedAnswer ? 'green' : 'red'} ">Your Answer : ${selectedAnswer}</p>
                            <p style="background-color: green; display : ${(correctAnswers === selectedAnswer) ? 'none' : 'block'}">Correct Answer : ${correctAnswers} </p>                      
                          </div>`
} else {
 dataDiv.innerHTML += `<div><p>Question  ${i + 1} :${question}</p>
                           <p style="background-color: #c53a06">Your Answer : Unanswered</p>
                            <p style="background-color: green">Correct Answer : ${correctAnswers} </p>                      
                          </div>`
}

}



