// Theme module to handle dark/light mode functionality
export class ThemeManager {
	constructor(toggleButton, themeIcon, themeText) {
		this.toggleButton = toggleButton;
		this.themeIcon = themeIcon;
		this.themeText = themeText;
		this.darkMode = false;
		this.initialized = false;
	}

	// Initialise theme from local storage
	init() {
		// Check if the theme preference exits in local storage
		const savedTheme = localStorage.getItem('quizTheme'); // Fixed: was 'theme', should match what's saved

		if (savedTheme) {
			this.darkMode = savedTheme === 'dark';
			this.initialized = true;
			this.applyTheme();
		}

		// Set up event listener for theme toggle
		this.toggleButton.addEventListener('click', () => {
			this.toggleTheme();
		});
	}

	// Toggle between dark and light themes
	toggleTheme() {
		this.darkMode = !this.darkMode;
		this.initialized = true;
		this.applyTheme();

		// Save theme preference to local storage
		localStorage.setItem('quizTheme', this.darkMode ? 'dark' : 'light');
	}

	// Apply the current theme to UI
	applyTheme() {
		if (this.darkMode) {
			document.body.classList.add('dark-theme');
			this.themeIcon.className = 'fas fa-moon';
			if (this.initialized) {
				this.themeText.textContent = 'Dark Mode';
			}
		} else {
			document.body.classList.remove('dark-theme');
			this.themeIcon.className = 'fas fa-sun';
			if (this.initialized) {
				this.themeText.textContent = 'Light Mode';
			}
		}
	}
}
