import {
	Disposable,
	StatusBarAlignment,
	StatusBarItem,
	TextEditor,
	TextEditorOptions,
	window
} from 'vscode';
const compact = require('lodash.compact');
const ec = require('editorconfig');

export default class EditorConfig {

	private _statusBar: StatusBarItem;
	private _editor: TextEditor;

	public applySettings() {
		const statusBar = this.initializeStatusBar();
		const editor = window.activeTextEditor;
		if (!editor) {
			statusBar.hide();
			return;
		}
		this._editor = editor;

		ec.parse(editor.document.fileName).then(config => {
			const { options } = editor;
			const messages = compact([
				this.applyIndentStyle(config.indent_style, options),
				this.applyTabWidth(config.tab_width, options)
			]);
			if (messages.length) {
				statusBar.text = messages.join(', ');
				statusBar.show();
			} else {
				statusBar.hide();
			}
		});
	}

	private initializeStatusBar() {
		if (!this._statusBar) {
			this._statusBar = window.createStatusBarItem(
				StatusBarAlignment.Left
			);
		}
		return this._statusBar;
	}

	private applyIndentStyle(value: string, options: TextEditorOptions) {
		switch (value) {
			case 'space':
				options.insertSpaces = true;
				return 'indent_style: space';
			case 'tab':
				options.insertSpaces = false;
				return 'indent_style: tab';
		}
	}

	private applyTabWidth(value: string, options: TextEditorOptions) {
		const tabWidth = parseInt(value, 10);
		if (!isNaN(tabWidth)) {
			options.tabSize = tabWidth;
			return `tab_width: ${tabWidth}`;
		}
	}

	dispose() {
		this._statusBar.dispose();
	}

}
