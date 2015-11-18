import { ExtensionContext } from 'vscode';
import EditorConfig from './EditorConfig';
import EditorConfigController from './EditorConfigController';

export function activate(context: ExtensionContext) {
	const editorConfig = new EditorConfig();
	const controller = new EditorConfigController(editorConfig);

	context.subscriptions.push(controller);
	context.subscriptions.push(editorConfig);
}
