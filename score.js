/*
// Get the user score and show it in score.html page

score = (number of questions answered correctly / number of all questions) * 100
for ex (3 / 5) * 100 = 60 ==> Your score is 60 %

 */
class Score
{
    numberOfCorrectAnsweredQuestions = parseInt(localStorage.getItem("score"));
    allQuestions = JSON.parse(localStorage.getItem("quiz_questions"));

    getScore()
    {
        let numberOfAllQuestions = this.allQuestions.length
        let finalScore = 0
        if( isNaN(this.numberOfCorrectAnsweredQuestions)){
           finalScore = 0
        }else {
            finalScore =  (this.numberOfCorrectAnsweredQuestions / numberOfAllQuestions ) * 100;

        }
        document.getElementById("score").innerHTML = `<p>Your score is ${finalScore.toFixed(2)}%</p>`;
    }

}
 let score = new Score();
score.getScore()






