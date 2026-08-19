import type {
	CompanionFeedbackAdvancedEvent,
	CompanionFeedbackBooleanEvent,
	CompanionFeedbackDefinition,
} from '@companion-module/base'
import { graphics } from 'companion-module-utils'
import { OntimeV3 } from '../ontimev3.js'
import { feedbackId } from '../enums.js'
import { TimerPhase } from '../ontime-types.js'
import { DangerRed, NormalGray, PauseOrange, PlaybackGreen, WarningOrange, White } from '../assets/colours.js'

/**
 * Ontime tracks the QLab cue it is following and publishes it as `ontime-qlab`.
 * This is read only: ontime exposes no integration commands for QLab.
 */
export function createQlabFeedbacks(ontime: OntimeV3): { [id: string]: CompanionFeedbackDefinition } {
	function connection(feedback: CompanionFeedbackBooleanEvent): boolean {
		const { enabled, connected } = ontime.state.qlab
		switch (feedback.options.state) {
			case 'connected':
				return connected
			case 'disconnected':
				return enabled && !connected
			case 'disabled':
				return !enabled
		}
		return false
	}

	function progressbar(feedback: CompanionFeedbackAdvancedEvent) {
		if (!feedback.image) {
			return {}
		}

		const { remaining, duration, phase } = ontime.state.qlab
		const { normal, warning, danger } = feedback.options as { [key: string]: number }
		const big = feedback.options.big as boolean

		const val = duration > 0 ? (1 - remaining / duration) * 100 : 0

		let colour = normal
		switch (phase) {
			case TimerPhase.Warning:
				colour = warning
				break
			case TimerPhase.Danger:
			case TimerPhase.Overtime:
				colour = danger
				break
		}

		const options: graphics.OptionsBar = {
			width: feedback.image.width,
			height: feedback.image.height,
			colors: [
				{
					size: 100,
					color: colour,
					background: colour,
					backgroundOpacity: 150,
				},
			],
			barLength: feedback.image.width,
			barWidth: big ? feedback.image.height - 40 : 10,
			value: val,
			type: 'horizontal',
			offsetX: 0,
			offsetY: big ? 20 : feedback.image.height - 10,
			opacity: 255,
		}

		return {
			imageBuffer: graphics.bar(options),
		}
	}

	return {
		[feedbackId.QlabConnection]: {
			type: 'boolean',
			name: 'QLab connection',
			description: 'Indicator colour for the state of ontime’s QLab connection',
			defaultStyle: {
				color: White,
				bgcolor: PlaybackGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'State',
					id: 'state',
					choices: [
						{ id: 'connected', label: 'Connected' },
						{ id: 'disconnected', label: 'Enabled but not connected' },
						{ id: 'disabled', label: 'Disabled' },
					],
					default: 'connected',
				},
			],
			callback: connection,
		},
		[feedbackId.QlabPaused]: {
			type: 'boolean',
			name: 'QLab cue paused',
			description: 'Indicator colour for a paused QLab cue',
			defaultStyle: {
				color: White,
				bgcolor: PauseOrange,
			},
			options: [],
			callback: () => ontime.state.qlab.isPaused,
		},
		[feedbackId.QlabPhase]: {
			type: 'boolean',
			name: 'QLab cue phase',
			description: 'Indicator colour for how far through the QLab cue is',
			defaultStyle: {
				color: White,
				bgcolor: DangerRed,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Phase',
					id: 'phase',
					choices: [
						{ id: TimerPhase.Default, label: 'Normal' },
						{ id: TimerPhase.Warning, label: 'Warning' },
						{ id: TimerPhase.Danger, label: 'Danger' },
						{ id: TimerPhase.Overtime, label: 'Overtime' },
						{ id: TimerPhase.None, label: 'None' },
					],
					default: TimerPhase.Warning,
				},
			],
			callback: (feedback) => ontime.state.qlab.phase === feedback.options.phase,
		},
		[feedbackId.QlabProgressBar]: {
			type: 'advanced',
			name: 'QLab Progressbar',
			description: 'Progressbar indicating the progression of the QLab cue ontime is following',
			options: [
				{ type: 'checkbox', id: 'big', label: 'Big graphic', default: false },
				{ type: 'colorpicker', id: 'normal', label: 'Normal', default: NormalGray },
				{ type: 'colorpicker', id: 'warning', label: 'Warning', default: WarningOrange },
				{ type: 'colorpicker', id: 'danger', label: 'Danger', default: DangerRed },
			],
			callback: (feedback) => progressbar(feedback),
		},
	}
}
