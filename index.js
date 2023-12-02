/* On the load of this page, we get the response from the API, we need this data: the question and all the answers of that question
Then we add it to the html page like that:
Question:
${questionFromTheAPIResponse}
Possible Answers:
${answer 1}          radioButton
${answer 2}          radioButton
${answer 3}          radioButton
${answer 4}          radioButton

<button>Next Question</button>
*/
// 1- fetch from api and
// 2- save the response in the local storage
// 3- finally redirect to first.html using javascript

btn =  document.getElementById("btn");
errorMessage = document.getElementById("validation")
let lastTime;
btn.addEventListener('click' , () => {
    localStorage.clear();
     saveTime();
    generateQuizQuestions()

})


function generateQuizQuestions()
{   let questionsCount = document.getElementById("questionsCount").value;
    let difficulty = document.getElementById("difficulty").value;


    if (questionsCount === "" ||  difficulty === "" ){
        emptyFieldsError()
        return;
    }

    fetch(`https://opentdb.com/api.php?amount=${questionsCount}&category=27&difficulty=${difficulty}&type=multiple`)// ma tbadel ken l amount wel difficulty c tt

        .then((response) => {
            return response.json()
        })
        .then(data => {
            let result = data.results
            if(result.length !== parseInt(questionsCount))
            {
                throw new Error();
            }
            localStorage.setItem("quiz_questions", JSON.stringify(result));
            localStorage.setItem("actual_question", "0");
            // Redirect to the quiz page
            window.location.href = 'question.html'; // Change 'first.html'
        })
        .catch(error => {
            errorMessage.innerHTML = `<p style="color: red; font-weight: bolder; font-style: italic">Please choose a number of questions between 1 and 20!</p>`
        });


}
function emptyFieldsError()
{
    errorMessage.innerHTML = `<p style="color: #860606; font-weight: bolder; font-style: italic">Please fill all the fields and retry again!</p>`
}

function saveTime() {
    let countInput = document.getElementById("timerInput").value;

     if(countInput >99){
         emptyFieldsError()
     }
        lastTime = parseInt(localStorage.getItem("time_per_seconds")) || 60 ;

        localStorage.setItem("time_per_seconds", lastTime ) ;
}

function validationLength()
{
    let inputCounter = document.getElementById("timerInput");
    inputCounter.onkeyup = function () {
        let inpVal = inputCounter.value;
        if(inpVal.length > 2) {
            inputCounter.value = inpVal[0] + inpVal[1]
        }
    }
}




















// function  countDownTimer(count)
// {
//     //localStorage.setItem("quiz_questions", JSON.stringify(count));
//     //get the id og the div count
//     let countDiv = document.getElementById("timer")
//     //get the id of the answer
//     let radioButtons = document.getElementsByClassName('answer');
//     let that = this;
//
//     const timer = setInterval(function() {
//
//         // Check if the count is not zero
//         if ( count !== 0) {
//             count--;
//             countDiv.innerHTML ='0' +  count
//             // Decrease the count by 1 each time
//
//         } else {
//             // If the count is zero, clear the interval
//             clearInterval(timer);
//             countDiv.innerText= "Time Is UP!"
//             that.submitUserAnswer(radioButtons, null)
//         }
//
//     }, 1000);

// in the index.html page :
/*
create an input where the user insert the number of questions
create a select dropdown where the user select the difficulty : easy or medium or hard
button generate quiz ==> when we click on it , we will have the number of questions inserted by the user and the selected difficulty
*/






