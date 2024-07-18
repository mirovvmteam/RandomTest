// Lấy ngẫu nhiên 100 câu hỏi từ cơ sở dữ liệu
var questionAmount = 100;
var questionScore = 1;
var randomQuestions = getRandomQuestions(questionAmount, questionsDatabase);

// Hiển thị câu hỏi trên trang web
var questionsContainer = document.getElementById("questions-container");
for (var i = 0; i < randomQuestions.length; i++) {
    var questionDiv = document.createElement("div");
    questionDiv.innerHTML = "<b> Câu hỏi " + (i + 1) + ": </b>" + randomQuestions[i].question;
	questionDiv.style.fontSize = "18px";

    var options = randomQuestions[i].options;
    for (var j = 0; j < options.length; j++) {
        var optionLabel = document.createElement("label");
        optionLabel.innerHTML = options[j];

        var optionInput = document.createElement("input");
        optionInput.type = "radio";
        optionInput.name = "question" + i;
        optionInput.value = j;

		questionDiv.appendChild(document.createElement("br"));
        questionDiv.appendChild(optionInput);
        questionDiv.appendChild(optionLabel);
    }

    questionsContainer.appendChild(questionDiv);
}

// Hàm chấm điểm đáp án và đưa ra điểm cuối cùng
function submitAnswers() {
  var score = 0;
  var answerInputs = document.getElementsByTagName("input");
  var answerLabels = document.getElementsByTagName("label");
  for (var i = 0; i < answerInputs.length; i++) {
    var questionIndex = answerInputs[i].name.replace("question", "");
    var selectedAnswer = answerInputs[i].value;
    var isCorrectAnswer = randomQuestions[questionIndex].correctAnswer === Number(selectedAnswer);
    var isAnswerSelected = answerInputs[i].checked;
	
    if (isCorrectAnswer) {
      // Thay đổi màu chữ thành xanh, dù cho câu trả lời đã được chọn hay chưa
      answerLabels[i].style.color = "green";
	  answerLabels[i].style.fontWeight = "bold";
    } else if (isAnswerSelected) {
      // Thay đổi màu chữ thành đỏ, dù cho câu trả lời đã được chọn hay chưa
      answerLabels[i].style.color = "red";
	  answerLabels[i].style.fontWeight = "bold";
    }
  }
  // Tính điểm của người dùng
  for (var i = 0; i < answerInputs.length; i++) {
    var questionIndex = answerInputs[i].name.replace("question", "");
    var selectedAnswer = parseInt(answerInputs[i].value);
    var isAnswerSelected = answerInputs[i].checked;

    if (isAnswerSelected) {
      var isCorrectAnswer = randomQuestions[questionIndex].correctAnswer === selectedAnswer;

      if (isCorrectAnswer) {
        score += questionScore;
      }
    }
}

  // Hiển thị điểm trên trang
  var scoreElement = document.getElementById("score");
  scoreElement.textContent = "Điểm của bạn là: " + score;
  var answerInputs = document.getElementsByTagName("input");
  for (var i = 0; i < answerInputs.length; i++) {
    answerInputs[i].disabled = true;
  }
}

// Hàm lấy ngẫu nhiên một số lượng câu hỏi từ cơ sở dữ liệu
function getRandomQuestions(quantity, database) {
    var randomQuestions = [];
    var selectedIndexes = [];

    while (randomQuestions.length < quantity) {
        var randomIndex = Math.floor(Math.random() * database.length);
        
        if (!selectedIndexes.includes(randomIndex)) {
            randomQuestions.push(database[randomIndex]);
            selectedIndexes.push(randomIndex);
        }
    }

    return randomQuestions;
}
