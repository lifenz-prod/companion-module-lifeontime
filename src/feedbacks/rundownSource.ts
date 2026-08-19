import type { CompanionFeedbackBooleanEvent, CompanionFeedbackDefinition } from '@companion-module/base'
import { OntimeV3 } from '../ontimev3.js'
import { feedbackId } from '../enums.js'
import { Playback } from '../ontime-types.js'
import { ActiveBlue, DangerRed, NormalGray, PauseOrange, White } from '../assets/colours.js'

/**
 * Ontime replies to a recall immediately and reports the outcome through the
 * `rundownSources` store key. Websocket errors are logged server side only, so these
 * feedbacks are the only place an operator sees a refused or failed recall.
 */
export function createRundownSourceFeedbacks(ontime: OntimeV3): { [id: string]: CompanionFeedbackDefinition } {
	function isLoaded(feedback: CompanionFeedbackBooleanEvent): boolean {
		const { loaded } = ontime.state.rundownSources
		if (loaded === null) {
			return false
		}

		const { method, sourceName, sourceIndex } = feedback.options

		if (method === 'index') {
			const source = ontime.state.rundownSources.sources.find((s) => s.index === Number(sourceIndex))
			return source !== undefined && source.name === loaded
		}

		return (
			String(sourceName ?? '')
				.trim()
				.toLowerCase() === loaded.toLowerCase()
		)
	}

	function recallBlocked(): boolean {
		// mirrors playbackBlocksRecall in ontime: armed and stop are allowed
		const { playback } = ontime.state.timer
		return playback === Playback.Play || playback === Playback.Pause || playback === Playback.Roll
	}

	return {
		[feedbackId.RundownSourceLoaded]: {
			type: 'boolean',
			name: 'Rundown source is loaded',
			description: 'Highlights the source which was last recalled into the project',
			defaultStyle: {
				color: White,
				bgcolor: ActiveBlue,
			},
			options: [
				{
					type: 'dropdown',
					id: 'method',
					label: 'Match source by',
					choices: [
						{ id: 'name', label: 'Name' },
						{ id: 'index', label: 'Index' },
					],
					default: 'name',
				},
				{
					type: 'textinput',
					id: 'sourceName',
					label: 'Source name',
					default: '',
					tooltip: 'Matched case insensitively',
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
					isVisible: (opts) => opts.method === 'index',
				},
			],
			callback: isLoaded,
		},
		[feedbackId.RundownSourceBusy]: {
			type: 'boolean',
			name: 'Rundown source is busy',
			description: 'A refresh or a recall is in flight',
			defaultStyle: {
				color: White,
				bgcolor: PauseOrange,
			},
			options: [],
			callback: () => ontime.state.rundownSources.loading,
		},
		[feedbackId.RundownSourceError]: {
			type: 'boolean',
			name: 'Rundown source error',
			description: 'The last refresh or recall failed, the reason is in $(ontime:source_error)',
			defaultStyle: {
				color: White,
				bgcolor: DangerRed,
			},
			options: [],
			callback: () => ontime.state.rundownSources.error !== null,
		},
		[feedbackId.RecallBlocked]: {
			type: 'boolean',
			name: 'Recall blocked by playback',
			description: 'Ontime refuses a recall while the timer is running, paused or rolling',
			defaultStyle: {
				color: White,
				bgcolor: NormalGray,
			},
			options: [],
			callback: recallBlocked,
		},
	}
}
