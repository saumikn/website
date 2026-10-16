class Theme {
	current = $state<'dark' | 'light'>('dark');
	initialize = () => {
		this.current =
			getComputedStyle(document.documentElement).colorScheme === 'light' ? 'light' : 'dark';
	};
	toggle = () => {
		this.current = this.current === 'dark' ? 'light' : 'dark';
		document.documentElement.setAttribute('color-scheme', this.current);
		try {
			localStorage.setItem('color-scheme', this.current);
		} catch {
			/* Storage is optional. */
		}
	};
}
export const theme = new Theme();
