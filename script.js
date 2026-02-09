const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const resultElement = document.getElementById('result')

let shuffledQuestions, currentQuestionIndex, wrongCount

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  if (nextButton.dataset.action === 'show-score') {
    showScore()
    return
  }
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  wrongCount = 0
  questionContainerElement.classList.remove('hide')
  questionElement.classList.remove('hide')
  resultElement.classList.add('hide')
  answerButtonsElement.classList.remove('hide')
  nextButton.dataset.action = ''
  nextButton.innerText = 'Next'
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  nextButton.dataset.action = ''
  nextButton.innerText = 'Next'
  questionContainerElement.dataset.answered = 'false'
  questionElement.classList.remove('hide')
  resultElement.classList.add('hide')
  answerButtonsElement.classList.remove('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  if (questionContainerElement.dataset.answered === 'true') return
  questionContainerElement.dataset.answered = 'true'
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct === 'true'
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (!correct) {
    wrongCount++
  }
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    nextButton.dataset.action = 'show-score'
    nextButton.innerText = 'Show Score'
    nextButton.classList.remove('hide')
  }
}

function showScore() {
  clearStatusClass(document.body)
  questionElement.classList.add('hide')
  answerButtonsElement.classList.add('hide')
  resultElement.innerText = `Score: ${shuffledQuestions.length - wrongCount} / ${shuffledQuestions.length}`
  resultElement.classList.remove('hide')
  if (wrongCount > 0) {
    setTimeout(() => {
      alert('Do dirty things to me baby 😘')
    }, 0)
  }
  startButton.innerText = 'Restart'
  startButton.classList.remove('hide')
  nextButton.classList.add('hide')
  nextButton.dataset.action = ''
  nextButton.innerText = 'Next'
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Do you like me?',
    answers: [
      { text: 'Yes', correct: true },
      { text: 'No', correct: false }
    ]
  },
  
  {
    question: 'Do I like you?',
    answers: [
      { text: 'Yes', correct: true },
      { text: 'No', correct: false },
    ]
  },

  {
    question: 'Should I buy you more snacks?',
    answers: [
      { text: 'YES!!!', correct: true },
      { text: 'Um no', correct: false },
    ]
  },

  {
    question: 'Are you going to cuddle me?',
    answers: [
      { text: 'NO!', correct: false },
      { text: 'Yes of course', correct: true }
    ]
  },

    {
    question: 'Do you love Nala?',
    answers: [
      { text: 'Nah', correct: false },
      { text: 'With all my heart', correct: true }
    ]
  },

    {
    question: 'Are you gonna kiss me?',
    answers: [
      { text: 'I would rather not', correct: false },
      { text: 'Always', correct: true }
    ]
  },

    {
    question: 'Will you send me money?',
    answers: [
      { text: 'NO!', correct: true },
      { text: 'Whatever you want baby', correct: false }
    ]
  }
]