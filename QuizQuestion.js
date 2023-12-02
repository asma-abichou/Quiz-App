export class QuizQuestion
{
    constructor(questionObjectNumber)
    {
        this.allQuestions = JSON.parse(localStorage.getItem("quiz_questions"));
        this.questionData = this.allQuestions[questionObjectNumber];

    }
    questionDiv = document.getElementById("question");
    answersDiv = document.getElementById("answers");
    resultDiv = document.getElementById("result");
    confirmButton = document.getElementById("confirmButton");
    nextQuestionBtn = document.getElementById("nextQuestionButton");
    getScoreBtn = document.getElementById("getScore");
    actualQuestionIndex = parseInt(localStorage.getItem("actual_question"));


    getQuestionData(questionNumber)
    {
        let question = this.questionData.question;
        let correctAnswer = this.questionData.correct_answer;
        let incorrectAnswers = this.questionData.incorrect_answers;
        //create a copies of incorrect Answers and  add the correct answer to create list of answers
        let allAnswers = JSON.parse(JSON.stringify(incorrectAnswers));
        allAnswers.push(correctAnswer)
        //generate map for answer option , create radio buttons for selection
        let answersHTML = "";
        allAnswers.map(
            (answer) => {
                answersHTML = answersHTML + `<input type="radio" name="answer" value="${answer}" class="answer form-check-input">${answer}<br>`;
            }
        )
        this.questionDiv.innerHTML = `<p> Question ${questionNumber}: ${question} </p>`;
        this.answersDiv.innerHTML = answersHTML
    }

    confirmButtonClickEvent(questionNumber)
    {  // Add a click event listener to the Confirm button
        this.confirmButton.addEventListener('click', () => {
            // Get all radio buttons representing the answer options
            let radioButtons = document.getElementsByClassName('answer');
            let selectedAnswerValue;
            // disable all radio answers
            for (let i = 0; i < radioButtons.length; i++) {
                if(radioButtons[i].checked)
                {
                    selectedAnswerValue = radioButtons[i].value;
                }
            }
            // Store the selected answer in local storage
            localStorage.setItem(`answer${questionNumber}`, selectedAnswerValue);
            // Submit the user's answer
            this.submitUserAnswer(radioButtons, selectedAnswerValue);
        });
    }

    // On the refresh of the page execute this Fn to select the client answer, disable all answers, and show the result (correct or wrong)
    checkIfQuestionIsAnswered(questionNumber)
    {
        let selectedAnswer = localStorage.getItem(`answer${questionNumber}`);
        if(selectedAnswer)
        {   //get the selected answer
            let selectedRadio = document.querySelector(`input[value="${selectedAnswer}"]`);
            // Set the "checked" attribute to display the selected answer
            selectedRadio.setAttribute("checked", "checked");
            let radioButtons = document.getElementsByClassName('answer');
            // Submit the user's answer for displaying the result (correct or wrong)
            this.submitUserAnswer(radioButtons, selectedAnswer);
        }
    }

    // function which allows disabling all the radio answers, show the result if correct or wrong and also hide 'confirm'
    // button and show either next question button or get score button depending on the question if it's the last one or not
    submitUserAnswer(radioButtons, selectedAnswerValue)
    {
        // disable all radios
        this.disableAllRadios(radioButtons)

        // compare between the user answer and the correct answer and show the result
        let correctAnswer = this.questionData.correct_answer;
        if(selectedAnswerValue) this.compareResult(selectedAnswerValue, correctAnswer)


        // to check if last question or not to show get score button or next question button
        this.confirmButton.style.display = 'none';
        let actualQuestionIndex = this.actualQuestionIndex;
        if(actualQuestionIndex === this.allQuestions.length - 1)
        {
            // Show get score button
            this.getScoreBtn.removeAttribute("style");
        } else {
            // Show next question button
            this.nextQuestionBtn.removeAttribute("style");
        }
    }

    disableAllRadios(radioButtons)
    { // Disable each radio button
        for (let i = 0; i < radioButtons.length; i++) {
            radioButtons[i].disabled = true;
        }
    }

    compareResult(selectedAnswerValue, correctAnswer)
    {// Initialize the user score if not already present in local storage
        if(!localStorage.getItem("score")) {
            localStorage.setItem("score", "0");
        }
        let score = parseInt(localStorage.getItem("score"));
        // Compare the selected answer with the correct answer
        if(selectedAnswerValue === correctAnswer)
        {
            this.displayResult('green', 'Correct!');
            score ++;
        }  else {
            this.displayResult('red', 'Wrong!')
        }
        // Update the user's score in local storage
        localStorage.setItem("score", JSON.stringify(score));
    }

    displayResult(color, text)
    {
        this.resultDiv.innerHTML = `<p style="color: ${color}; font-weight: bolder; font-style: italic; text-align: center;">${text}</p>`;
    }

    enableButtonIfAnswerChecked()
    {    // Get all radio buttons representing answer options
        let radioButtons = document.getElementsByClassName('answer');
        // Add a change event listener to each radio button
        for (let i = 0; i < radioButtons.length; i++) {
            radioButtons[i].addEventListener('change', ()=> {
                // Enable the "Confirm" button when an answer is selected
                this.confirmButton.removeAttribute("disabled")
            })
        }
    }
    //to move to the next question after click on the 'confirm' button
    moveToNextQuestion()
    {   //add an event to the nextQuestion button
        this.nextQuestionBtn.addEventListener('click', () => {
            //get the index of the actual question
            let actualQuestionIndex = this.actualQuestionIndex;
            //increment the index
            actualQuestionIndex++;
            //add it the local storage
            localStorage.setItem("actual_question", JSON.stringify(actualQuestionIndex));
            //reload the page
            location.reload()
        })
    }

    countDownTimer()
    {
        let count =  parseInt(localStorage.getItem('time_per_seconds'))

        //get the id og the div count
        let countDiv = document.getElementById("timer");
        //get the id of the answer
        let radioButtons = document.getElementsByClassName('answer');
        let that = this;
        const timer = setInterval(function() {
            // Check if the count is not zero
            if (  count !== 0) {

                // Update the display of the countdown
                countDiv.innerHTML = `time: ${count}`;
                // Decrease the count by 1 each time
                count--;
            } else {
                // If the count is zero, clear the interval
                clearInterval(timer);
                countDiv.innerText= "Time Is UP!";
                that.submitUserAnswer(radioButtons, null);
            }

        }, 1000);
    }
}