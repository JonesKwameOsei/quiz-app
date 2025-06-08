export class Timer {
	constructor(minutesElement, secondsElement, onTimeout) {
		this.minutesElement = minutesElement;
		this.secondsElement = secondsElement;
		this.onTimeout = onTimeout;
		this.totalSeconds = 10 * 60; // 10 minutes in seconds
		this.remainingSeconds = this.totalSeconds;
		this.timerId = null; // Fixed: was timeId, should be timerId
	}

	// Start the countdown timer
	start() {
		// Clear any existing timer
		this.stop();

		// Start the initial timer
		this.updateDisplay();

		// Start the countdown
		this.timerId = setInterval(() => {
			this.remainingSeconds--;
			// Update the timer display
			this.updateDisplay();
			// check if timer is up
			if (this.remainingSeconds <= 0) {
				this.stop();
				this.onTimeout();
			}
		}, 1000);
	}

	// Stop the countdown timer
	stop() {
		if (this.timerId) {
			clearInterval(this.timerId);
			this.timerId = null; // Fixed: was timeId == null (comparison instead of assignment)
		}
	}

	// Reset the timer to initial value
	reset() {
		this.stop();
		this.remainingSeconds = this.totalSeconds;
		this.updateDisplay();
	}

	// Get Remaining time as percentage for progress calculation
	getRemainingPercentage() {
		return (this.remainingSeconds / this.totalSeconds) * 100;
	}

	// Update the timer display()
	updateDisplay() {
		const minutes = Math.floor(this.remainingSeconds / 60);
		const seconds = this.remainingSeconds % 60;

		// Format with leading zeros
		this.minutesElement.textContent = minutes.toString().padStart(2, '0');
		this.secondsElement.textContent = seconds.toString().padStart(2, '0');

		// Add warning color when less than 1 minutes remains
		if (this.remainingSeconds < 60) {
			this.minutesElement.parentElement.classList.add('warning');
		} else {
			this.minutesElement.parentElement.classList.remove('warning');
		}
	}
}
