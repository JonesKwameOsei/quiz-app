import './style.css';
import { Quiz } from './src/quiz';
import { Timer } from './src/timer';
import { ThemeManager } from './src/theme';

// Initialise the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
	// DOM Elements
	//Screens
	const startScreen = document.getElementById('start-screen');
	const questionScreen = document.getElementById('questions-screen');
	const resultScreen = document.getElementById('results-screen');
	const timeoutScreen = document.getElementById('timeout-screen');

	//Buttons
	const startBtn = document.getElementById('start-btn');
	const submitBtn = document.getElementById('submit-btn');
	const restartBtn = document.getElementById('restart-btn');
	const timeoutRestartBtn = document.getElementById('timeout-restart-btn');
	const themeToggleBtn = document.getElementById('theme-toggle-btn');

	// Display elements
	const questionText = document.getElementById('question-text');
	const optionsContainer = document.getElementById('options-container');
	const progressBar = document.querySelector('.progress');
	const progressText = document.querySelector('.progress-text');
	const minutesElement = document.getElementById('minutes');
	const secondsElement = document.getElementById('seconds');
	const scoreValue = document.getElementById('score-value');
	const timeoutScoreValue = document.getElementById('timeout-score-value');
	const scoreFeedback = document.getElementById('score-feedback');
	const timeoutScoreFeedback = document.getElementById(
		'timeout-score-feedback'
	);
	const loadingContainer = document.getElementById('loading-container');
	const scoreContainer = document.getElementById('score-container');
	const themeIcon = document.getElementById('theme-icon');
	const themeText = document.getElementById('theme-text');

	// Initialise quiz objects
	const quiz = new Quiz();
	const timer = new Timer(minutesElement, secondsElement, handleTimeout);
	const themeManager = new ThemeManager(themeToggleBtn, themeIcon, themeText);

	// Initialise theme
	themeManager.init();

	// Event listeners
	startBtn.addEventListener('click', startQuiz);
	submitBtn.addEventListener('click', submitAnswer);
	restartBtn.addEventListener('click', restartQuiz);
	timeoutRestartBtn.addEventListener('click', restartQuiz);

	// Functions
	function startQuiz() {
		showScreen(questionScreen);
		loadQuestion();
		timer.start();
		updateProgress();
	}

	// Load the current question
	function loadQuestion() {
		const currentQuestion = quiz.getCurrentQuestion();
		questionText.textContent = currentQuestion.question;

		// Clear previous options
		optionsContainer.innerHTML = '';

		// Create option elements
		currentQuestion.options.forEach((option, index) => {
			const optionElement = document.createElement('div');
			optionElement.className = 'option';
			optionElement.textContent = option;
			optionElement.dataset.index = index;

			//  Add click event listener to each option
			optionElement.addEventListener('click', () => {
				// remove selected class from all options
				document.querySelectorAll('.option').forEach((opt) => {
					opt.classList.remove('selected');
				});

				// Add selected class to the clicked option
				optionElement.classList.add('selected');

				// Enable submit button
				submitBtn.disabled = false;
			});
			// Add option element to the options container
			optionsContainer.appendChild(optionElement);
		});

		// Reset the submit button to disable state
		submitBtn.disabled = true;
	}

	// Handle answer submission
	function submitAnswer() {
		// Get the selected option
		const selectedOption = document.querySelector('.option.selected');

		if (!selectedOption) return; // safety check

		// Get the index of the selected option
		const answerIndex = parseInt(selectedOption.dataset.index);
		const result = quiz.submitAnswer(answerIndex);

		// Highlight correct and incorrect answers
		document.querySelectorAll('.option').forEach((option, index) => {
			option.classList.remove('selected');

			if (index === result.correctAnswerIndex) {
				option.classList.add('correct');
			} else if (index === answerIndex && !result.isCorrect) {
				option.classList.add('incorrect');
			}

			// Disable option clicks during feedback
			option.style.pointerEvents = 'none';
		});

		// Disable submit button during feedback
		submitBtn.disabled = true;

		// update progress
		updateProgress();

		// Move to the next question after a delay for feedback
		setTimeout(() => {
			const hasNextQuestion = quiz.nextQuestion();

			if (hasNextQuestion) {
				loadQuestion();
			} else {
				// Quiz is complete
				finishQuiz();
			}
		}, 1500); // 1500ms = 1.5 seconds, 1.5 seconds delay to show the feedback
	}

	// Update progress bar text
	function updateProgress() {
		const progress = quiz.getProgress();
		progressBar.style.width = `${progress}%`;
		progressText.textContent = `${quiz.answered}/${quiz.getTotalQuestions()}`;
	}

	// Handle quiz timeout
	function handleTimeout() {
		showScreen(timeoutScreen);
		timeoutScoreValue.textContent = quiz.score;
		timeoutScoreFeedback.textContent = quiz.getFeedback();
	}

	// Finish the quiz
	function finishQuiz() {
		timer.stop();
		showScreen(resultScreen);

		// Ensure clean initial state - hide score, show loading
		scoreContainer.style.display = 'none';
		loadingContainer.style.display = 'flex';

		// Simulate loading time for score calculation
		setTimeout(() => {
			// Hide loading and show score
			loadingContainer.style.display = 'none';
			scoreContainer.style.display = 'block';

			// Update score display
			scoreValue.textContent = quiz.score;
			scoreFeedback.textContent = quiz.getFeedback();
		}, 2000); // 2 seconds loading animation
	}

	// Restart the quiz
	function restartQuiz() {
		quiz.reset();
		timer.reset();
		showScreen(startScreen);
		updateProgress();

		// Reset both containers to initial hidden state using style.display
		loadingContainer.style.display = 'none';
		scoreContainer.style.display = 'none';
	}

	// Helper function to switch between screens
	function showScreen(screenToShow) {
		// Hide all screens
		const screens = document.querySelectorAll('.quiz-screen');
		screens.forEach((screen) => {
			screen.classList.remove('active');
		});

		// Show the requested screen
		screenToShow.classList.add('active');
	}
});

