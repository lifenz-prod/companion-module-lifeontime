import type { CompanionActionDefinition, CompanionActionEvent } from '@companion-module/base'
import { socketSendJson } from '../connection.js'
import { ActionId } from '../enums.js'
import { OntimeV3 } from '../ontimev3.js'
import { ActionCommand } from './commands.js'
import { OffsetMode } from '../ontime-types.js'

/**
 * Runtime level actions added in ontime v4: the rundown wide delay and the
 * offset mode which decides whether the reported offset is absolute or relative.
 */
export function createRuntimeActions(ontime: OntimeV3): { [id: string]: CompanionActionDefinition } {
	function globalDelay(action: CompanionActionEvent): void {
		const { addremove, hours, minutes, seconds } = action.options

		if (addremove === 'reset') {
			socketSendJson(ActionCommand.GlobalDelay, 'reset')
			return
		}

		const val = (Number(hours) * 60 + Number(minutes)) * 60 + Number(seconds)
		if (val === 0) {
			return
		}
		socketSendJson(ActionCommand.GlobalDelay, addremove === 'remove' ? { remove: val } : { add: val })
	}

	function offsetMode(action: CompanionActionEvent): void {
		const { mode } = action.options

		if (mode === 'toggle') {
			const next = ontime.state.runtime.offsetMode === OffsetMode.Absolute ? OffsetMode.Relative : OffsetMode.Absolute
			socketSendJson(ActionCommand.OffsetMode, next)
			return
		}

		socketSendJson(ActionCommand.OffsetMode, mode)
	}

	return {
		[ActionId.GlobalDelay]: {
			name: 'Add / remove rundown delay',
			description: 'Shifts the whole rundown. Ontime rejects a single change larger than one hour.',
			options: [
				{
					id: 'addremove',
					type: 'dropdown',
					choices: [
						{ id: 'add', label: 'Add Time' },
						{ id: 'remove', label: 'Remove Time' },
						{ id: 'reset', label: 'Reset to none' },
					],
					label: 'Add, Remove or Reset',
					default: 'add',
				},
				{
					type: 'number',
					id: 'hours',
					label: 'Hours',
					default: 0,
					step: 1,
					min: 0,
					max: 1,
					required: true,
					isVisible: (opts) => opts.addremove !== 'reset',
				},
				{
					type: 'number',
					id: 'minutes',
					label: 'Minutes',
					default: 1,
					step: 1,
					min: 0,
					max: 60,
					required: true,
					isVisible: (opts) => opts.addremove !== 'reset',
				},
				{
					type: 'number',
					id: 'seconds',
					label: 'Seconds',
					default: 0,
					step: 1,
					min: 0,
					max: 59,
					required: true,
					isVisible: (opts) => opts.addremove !== 'reset',
				},
			],
			callback: globalDelay,
		},
		[ActionId.OffsetMode]: {
			name: 'Set the rundown offset mode',
			options: [
				{
					type: 'dropdown',
					id: 'mode',
					label: 'Mode',
					choices: [
						{ id: OffsetMode.Absolute, label: 'Absolute' },
						{ id: OffsetMode.Relative, label: 'Relative' },
						{ id: 'toggle', label: 'Toggle' },
					],
					default: OffsetMode.Absolute,
				},
			],
			callback: offsetMode,
		},
	}
}
