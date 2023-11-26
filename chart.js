// count of correct answered questions
// count of wrong answered questions
// we have 16 questions ==> 7 correct answered questions + 9 wrong answered questions


const ctx = document.getElementById('myChart');
let divCorrectAnswer = document.getElementById("result");
let question = JSON.parse(localStorage.getItem("quiz_questions"));
let countCorrect = 0;
let countWrongs = 0;

for (let i = 0; i < question.length; i++) {
    let correctAnswer = question[i].correct_answer;
    let questionNumber = i + 1;
    let selectedAnswer = localStorage.getItem(`answer${questionNumber}`);

    if (correctAnswer === selectedAnswer) {
        countCorrect++;
    } else {
        countWrongs++;
    }
}
divCorrectAnswer.innerHTML = `<p>Correct answere questions: ${countCorrect}</p><p>Wrong answer questions: ${countWrongs}</p>`;


let data = {
    labels: ["Correct Answers", "Wrong Answers"],
    datasets: [
        {
            backgroundColor: ['green','red'],
            data: [countCorrect, countWrongs],

        }
    ]
};
new Chart(ctx, {
    type: 'pie',
    data: data,
});