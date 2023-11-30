// count of correct answered questions
// count of wrong answered questions
// we have 16 questions ==> 7 correct answered questions + 9 wrong answered questions


    const ctx = document.getElementById('myChart');
    let divCorrectAnswer = document.getElementById("result");
    let question = JSON.parse(localStorage.getItem("quiz_questions"));
    let countCorrect = 0;
    let countWrongs = 0;
    let countUnanswered = 0;

    for (let i = 0; i < question.length; i++) {
        let correctAnswer = question[i].correct_answer;
        let questionNumber = i + 1;
        let selectedAnswer = localStorage.getItem(`answer${questionNumber}`);

        if (correctAnswer === selectedAnswer) {
            countCorrect++;
        } else if(selectedAnswer === null) {
            countUnanswered++;
        } else {
            countWrongs++;
        }
    }
    divCorrectAnswer.innerHTML = `
    <p>Correct answered questions: ${countCorrect}</p>
    <p>Wrong answered questions: ${countWrongs}</p>
    <p>Not answered questions: ${countUnanswered}</p>
    `;


    let data = {
        labels: ["Correct", "Wrong", "Not answered"],
        datasets: [
            {
                backgroundColor: ['green','red', 'orange'],
                data: [countCorrect, countWrongs, countUnanswered],

            }
        ]
    };
    new Chart(ctx, {
        type: 'pie',
        data: data,
    });