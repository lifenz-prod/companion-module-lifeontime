import type { CompanionFeedbackBooleanEvent, CompanionFeedbackDefinition } from '@companion-module/base'
import { OntimeV3 } from '../ontimev3.js'
import { feedbackId } from '../enums.js'
import { ServiceSection } from '../ontime-types.js'
import { ActiveBlue, White } from '../assets/colours.js'
import { getServiceInfo } from '../utilities.js'

/**
 * Dual service mode replicates the master service section for each configured profile,
 * so the same cue runs twice. These let a button show which instance is on.
 */
export function createServiceFeedbacks(ontime: OntimeV3): { [id: string]: CompanionFeedbackDefinition } {
	function matches(feedback: CompanionFeedbackBooleanEvent): boolean {
		const { target, match, section, name } = feedback.options
		const event = target === 'next' ? ontime.state.eventNext : ontime.state.eventNow
		const info = getServiceInfo(ontime, event)

		if (match === 'section') {
			return info.section === section
		}

		const wanted = String(name ?? '').trim()
		if (wanted === '' || info.name === '') {
			return false
		}
		return info.name.toLowerCase() === wanted.toLowerCase()
	}

	return {
		[feedbackId.ServiceSection]: {
			type: 'boolean',
			name: 'Service instance',
			description: 'Which service instance the current or next event belongs to',
			defaultStyle: {
				color: White,
				bgcolor: ActiveBlue,
			},
			options: [
				{
					type: 'dropdown',
					id: 'target',
					label: 'Event',
					choices: [
						{ id: 'now', label: 'Current' },
						{ id: 'next', label: 'Next' },
					],
					default: 'now',
				},
				{
					type: 'dropdown',
					id: 'match',
					label: 'Match by',
					choices: [
						{ id: 'name', label: 'Service name' },
						{ id: 'section', label: 'Section' },
					],
					default: 'name',
				},
				{
					type: 'textinput',
					id: 'name',
					label: 'Service name',
					default: '',
					tooltip: 'As named in the service profiles, eg. 11am. Matched case insensitively.',
					isVisible: (opts) => opts.match === 'name',
				},
				{
					type: 'dropdown',
					id: 'section',
					label: 'Section',
					choices: [
						{ id: ServiceSection.Rehearsal, label: 'Rehearsal' },
						{ id: ServiceSection.Master, label: 'Master service' },
						{ id: ServiceSection.Generated, label: 'Generated service' },
					],
					default: ServiceSection.Master,
					isVisible: (opts) => opts.match === 'section',
				},
			],
			callback: matches,
		},
	}
}
