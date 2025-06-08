// Main quiz module for handling quiz functionality
import { questions } from './question';

export class Quiz {
	constructor() {
		this.questions = [...questions]; // Clone the questions array
		this.currentQuestionIndex = 0;
		this.score = 0;
		this.userAnswers = new Array(this.questions.length).fill(null);
		this.answered = 0; // Track number of answered questions
	}

	// Get the current question
	getCurrentQuestion() {
		return this.questions[this.currentQuestionIndex];
	}

	// Get total number of questions
	getTotalQuestions() {
		return this.questions.length;
	}

	// Check if user has answered the current question
	hasAnsweredCurrent() {
		return this.userAnswers[this.currentQuestionIndex] !== null;
	}

	// Submit an answer for the current question
	submitAnswer(answerIndex) {
		const currentQuestion = this.getCurrentQuestion();

		// Store the user's answer
		if (this.userAnswers[this.currentQuestionIndex] === null) {
			this.answered++; // Increment only if this question wasn't answered before
		}

		this.userAnswers[this.currentQuestionIndex] = answerIndex;

		// Check if the answer is correct
		const isCorrect = answerIndex === currentQuestion.correctAnswer;

		// Update score if correct
		if (isCorrect) {
			this.score++;
		}

		return {
			isCorrect,
			correctAnswerIndex: currentQuestion.correctAnswer,
		};
	}

	// Move to the next question
	nextQuestion() {
		if (this.currentQuestionIndex < this.questions.length - 1) {
			this.currentQuestionIndex++;
			return true;
		}
		return false; // No more questions
	}

	// Reset the quiz
	reset() {
		this.currentQuestionIndex = 0;
		this.score = 0;
		this.userAnswers = new Array(this.questions.length).fill(null);
		this.answered = 0;
	}

	// Get progress as a percentage
	getProgress() {
		return (this.answered / this.questions.length) * 100;
	}

	// Check if all questions have been answered
	isComplete() {
		return this.answered === this.questions.length;
	}

	// Get feedback based on the score
	getFeedback() {
		const score = this.score;

		if (score === 20) {
			return 'Excellent! Perfect score!';
		} else if (score >= 15) {
			return 'Very good! Keep up the good work!';
		} else if (score >= 10) {
			return 'Average. You can do better!';
		} else if (score >= 5) {
			return 'Below average. Keep practicing!';
		} else {
			return "More room for improvement. Don't give up!";
		}
	}
}
