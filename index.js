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

btn.addEventListener('click' , () => {
    localStorage.clear();
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
// in the index.html page :
/*
create an input where the user insert the number of questions
create a select dropdown where the user select the difficulty : easy or medium or hard
button generate quiz ==> when we click on it , we will have the number of questions inserted by the user and the selected difficulty
*/






