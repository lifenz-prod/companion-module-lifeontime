import type {
	CompanionActionDefinitions,
	CompanionFeedbackDefinitions,
	CompanionPresetDefinitions,
	CompanionVariableDefinition,
} from '@companion-module/base'
import { OnTimeInstance, type OntimeClient } from './index.js'

import { connect, disconnectSocket } from './connection.js'
import type { CustomFields, OntimeBaseEvent, OntimeEvent, ServiceProfiles } from './ontime-types.js'
import { stateobj } from './state.js'

import { actions } from './actions/index.js'
import { feedbacks } from './feedbacks/index.js'
import { variables } from './variables.js'
import { variableId } from './enums.js'
import { presets } from './presets.js'

export class OntimeV3 implements OntimeClient {
	instance: OnTimeInstance
	public events: OntimeEvent[] = []
	/** the unfiltered rundown, needed to place events relative to the service boundary block */
	public rundownEntries: OntimeBaseEvent[] = []
	public customFields: CustomFields = {}
	public serviceProfiles: ServiceProfiles = { boundaryBlockId: null, services: [] }
	public state = stateobj

	constructor(instance: OnTimeInstance) {
		this.instance = instance
	}

	connect(): void {
		connect(this.instance, this)
	}

	disconnectSocket(): void {
		disconnectSocket()
	}

	getVariables(includeCustom: boolean = false): CompanionVariableDefinition[] {
		// one variable per known rundown source, so a recall button can label itself
		const sourceVariables = this.state.rundownSources.sources.map(({ index, name }) => ({
			name: `Rundown source ${index} name (${name})`,
			variableId: `${variableId.SourceName}-${index}`,
		}))

		if (includeCustom) {
			const customVariables = Object.entries(this.customFields).map((value) => {
				const name = value[1].label
				const variableId = value[0]
				return [
					{ name: `Custom "${name}" value of previous event`, variableId: `${variableId}_CustomPrevious` },
					{ name: `Custom "${name}" value of current event`, variableId: `${variableId}_CustomNow` },
					{ name: `Custom "${name}" value of next event`, variableId: `${variableId}_CustomNext` },
				]
			})

			return variables().concat(sourceVariables, ...customVariables)
		}
		return variables().concat(sourceVariables)
	}

	getActions(): CompanionActionDefinitions {
		return actions(this)
	}

	getFeedbacks(): CompanionFeedbackDefinitions {
		return feedbacks(this)
	}

	getPresets(): CompanionPresetDefinitions {
		return presets()
	}
}
