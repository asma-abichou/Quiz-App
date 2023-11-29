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
        let allAnswers = JSON.parse(JSON.stringify(incorrectAnswers));
        allAnswers.push(correctAnswer)
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
    {
        this.confirmButton.addEventListener('click', () => {
            let radioButtons = document.getElementsByClassName('answer');
            let selectedAnswerValue;
            // disable all radio answers
            for (let i = 0; i < radioButtons.length; i++) {
                if(radioButtons[i].checked)
                {
                    selectedAnswerValue = radioButtons[i].value;
                }
            }
            localStorage.setItem(`answer${questionNumber}`, selectedAnswerValue);
            this.submitUserAnswer(radioButtons, selectedAnswerValue)
        });
    }

    // On the refresh of the page execute this Fn to select the client answer, disable all answers, and show the result (correct or wrong)
    checkIfQuestionIsAnswered(questionNumber)
    {
        let selectedAnswer = localStorage.getItem(`answer${questionNumber}`);
        if(selectedAnswer)
        {
            let selectedRadio = document.querySelector(`input[value="${selectedAnswer}"]`);
            selectedRadio.setAttribute("checked", "checked")
            let radioButtons = document.getElementsByClassName('answer');
            this.submitUserAnswer(radioButtons, selectedAnswer)
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
    {
        for (let i = 0; i < radioButtons.length; i++) {
            radioButtons[i].disabled = true;
        }
    }

    compareResult(selectedAnswerValue, correctAnswer)
    {
        if(!localStorage.getItem("score")) {
            localStorage.setItem("score", "0");
        }
        let score = parseInt(localStorage.getItem("score"));
        if(selectedAnswerValue === correctAnswer)
        {
            this.displayResult('green', 'Correct!');
            score ++;
        }  else {
            this.displayResult('red', 'Wrong!')
        }
        localStorage.setItem("score", JSON.stringify(score));
    }

    displayResult(color, text)
    {
        this.resultDiv.innerHTML = `<p style="color: ${color}; font-weight: bolder; font-style: italic; text-align: center;">${text}</p>`;
    }

    enableButtonIfAnswerChecked()
    {
        let radioButtons = document.getElementsByClassName('answer');
        for (let i = 0; i < radioButtons.length; i++) {
            radioButtons[i].addEventListener('change', ()=> {
                this.confirmButton.removeAttribute("disabled")
            })
        }
    }

    moveToNextQuestion()
    {
        this.nextQuestionBtn.addEventListener('click', () => {
            let actualQuestionIndex = this.actualQuestionIndex;
            actualQuestionIndex++;
            localStorage.setItem("actual_question", JSON.stringify(actualQuestionIndex));
            location.reload()
        })
    }

    countDownTimer(count)
    {
        let countDiv = document.getElementById("timer")
        let radioButtons = document.getElementsByClassName('answer');
        let that = this;
        const timer = setInterval(function() {
            count--;
            if (  count !== 0) {
                countDiv.innerHTML ='0' +  count
            } else {
                clearInterval(timer);
                countDiv.innerText= "Time Is UP!"
                that.submitUserAnswer(radioButtons, null)
            }

        }, 1000);
    }
}