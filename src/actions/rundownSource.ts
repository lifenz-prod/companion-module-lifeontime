import type {
	CompanionActionContext,
	CompanionActionDefinition,
	CompanionActionEvent,
	DropdownChoice,
} from '@companion-module/base'
import { socketSendJson } from '../connection.js'
import { ActionId } from '../enums.js'
import { OntimeV3 } from '../ontimev3.js'
import { ActionCommand } from './commands.js'

/**
 * A rundown source is a rundown which lives outside the project file, today a worksheet
 * tab of the linked Google Sheet. Recalling one replaces the rundown and arms its first
 * event, so ontime refuses a recall while playback is play, pause or roll.
 *
 * The recall is long running: ontime replies immediately and reports the outcome through
 * the `rundownSources` store key, so the source feedbacks are the only way a failure shows.
 */
export function createRundownSourceActions(ontime: OntimeV3): { [id: string]: CompanionActionDefinition } {
	function sourceChoices(): DropdownChoice[] {
		const { sources } = ontime.state.rundownSources
		if (sources.length === 0) {
			return [{ id: '', label: 'No sources - check the sheet link and ontime version' }]
		}
		// the name is the id: indexes reshuffle when the sheet tabs are reordered
		return sources.map(({ index, name }) => ({ id: name, label: `${index} | ${name}` }))
	}

	async function loadSource(action: CompanionActionEvent, context: CompanionActionContext): Promise<void> {
		const { method, sourceList, sourceName, sourceIndex } = action.options

		switch (method) {
			case 'list': {
				if (!sourceList) {
					return
				}
				socketSendJson(ActionCommand.LoadSource, { name: String(sourceList) })
				break
			}
			case 'name': {
				const name = (await context.parseVariablesInString(String(sourceName ?? ''))).trim()
				if (name === '') {
					return
				}
				socketSendJson(ActionCommand.LoadSource, { name })
				break
			}
			case 'index': {
				socketSendJson(ActionCommand.LoadSource, { index: Number(sourceIndex) })
				break
			}
		}
	}

	return {
		[ActionId.LoadSource]: {
			name: 'Recall a rundown source',
			description:
				'Replaces the rundown with one of the linked sheet tabs and arms its first event. Refused while the timer is running, paused or rolling.',
			options: [
				{
					type: 'dropdown',
					id: 'method',
					label: 'Select source by',
					choices: [
						{ id: 'list', label: 'Name (from list)' },
						{ id: 'name', label: 'Name (from variable)' },
						{ id: 'index', label: 'Index' },
					],
					default: 'list',
				},
				{
					type: 'dropdown',
					id: 'sourceList',
					label: 'Source',
					choices: sourceChoices(),
					default: sourceChoices()[0].id,
					isVisible: (opts) => opts.method === 'list',
				},
				{
					type: 'textinput',
					id: 'sourceName',
					label: 'Source name',
					default: '',
					useVariables: true,
					tooltip: 'Matched case insensitively. A name made only of digits is read as an index.',
					isVisible: (opts) => opts.method === 'name',
				},
				{
					type: 'number',
					id: 'sourceIndex',
					label: 'Source index',
					default: 1,
					min: 1,
					max: 100,
					step: 1,
					tooltip: '1 based, follows the tab order in the sheet. Reordering tabs reshuffles the indexes.',
					isVisible: (opts) => opts.method === 'index',
				},
			],
			callback: loadSource,
		},
		[ActionId.RefreshSources]: {
			name: 'Refresh the rundown source list',
			description: 'Re-reads the list of available rundowns from the linked sheet. Never interrupts playback.',
			options: [],
			callback: () => socketSendJson(ActionCommand.RefreshSources),
		},
	}
}
