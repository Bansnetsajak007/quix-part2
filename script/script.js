const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const submitButton = document.getElementById("submit-btn");
const resetButton = document.getElementById("reset-btn");

//taking all the choice button reference
const cs = document.getElementById('cs');
const nepal = document.getElementById('nepal');
const sports = document.getElementById('sports');
const history = document.getElementById('history');

//function that randomly reorders array elements
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function displayQuiz() {
    let output = "";
    quizData.forEach((data, index) => {
      const optionsCopy = [...data.options]; // Create a copy to shuffle options without changing the original array
      shuffleArray(optionsCopy);
      output += `
          <div class="question">
              ${index + 1}. ${data.question}
          </div>
          <div class="options">
              ${optionsCopy.map(option => `
                  <label>
                      <input type="radio" name="question${index}" value="${option}">
                      ${option}
                  </label>
              `).join("")}
          </div>
      `;
    });
    quizContainer.innerHTML = output;
  }

function reset_quiz(){
    const options = document.querySelectorAll("input[type='radio']");
    options.forEach(option => option.checked = false);
    options.forEach(option => {
        option.parentElement.classList.remove("correct", "incorrect");
      });
      
    resultContainer.innerHTML = "";
    submitButton.disabled = false;
}

function sumbit_quiz() {
    let score = 0;
    let unanswered = 0;
    quizData.forEach((data, index) => {
      const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
      if (selectedOption) {
        if (selectedOption.value === data.answer) {
          score++;
          selectedOption.parentElement.classList.add("correct");
        } else {
          selectedOption.parentElement.classList.add("incorrect");
        }
      } else {
        unanswered++;
      }
    });
    show_result(score,unanswered);
    submitButton.disabled = true;
}




function show_result(score, unanswered) {
    resultContainer.innerHTML = `
      <p>Your score: ${score} out of ${quizData.length}</p>
      <p>Unanswered questions: ${unanswered}</p>
    `;
  }


submitButton.addEventListener("click", sumbit_quiz);
resetButton.addEventListener("click", reset_quiz);

//'script/nepal.json'
cs.addEventListener('click', () => {
  load_quiz_data('script/computer.json')
})

nepal.addEventListener('click', () => {
  load_quiz_data('script/nepal.json')
})
history.addEventListener('click', () => {
  load_quiz_data('script/history.json')
})
sports.addEventListener('click', () => {
  load_quiz_data('script/sports.json')
})

//main function that loads .json file data using async javascript model
async function load_quiz_data(path){
    try{
        const response = await fetch(path);
        const data = await response.json();
        quizData = data;
        displayQuiz() // calling the function to display data on the webpage
        
        }
        
        catch(error){
            console.error("Failed loading quiz date", error);
            }
        }
        

