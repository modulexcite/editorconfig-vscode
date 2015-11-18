import { Disposable, window } from 'vscode';
import EditorConfig from './EditorConfig';

export default class EditorConfigController {

	private _editorConfig: EditorConfig;
	private _disposable: Disposable;

	constructor(editorConfig: EditorConfig) {
		this._editorConfig = editorConfig;

		const subscriptions: Disposable[] = [];
		window.onDidChangeActiveTextEditor(this._onEvent, this, subscriptions);

		this._editorConfig.applySettings();

		this._disposable = Disposable.from(...subscriptions);
	}

	dispose() {
		this._disposable.dispose();
	}

	private _onEvent() {
		this._editorConfig.applySettings();
	}

}
