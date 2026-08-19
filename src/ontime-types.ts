//Playbeck

export enum Playback {
	Roll = 'roll',
	Play = 'play',
	Pause = 'pause',
	Stop = 'stop',
	Armed = 'armed',
}

// Message

export type Message = {
	text: string
	visible: boolean
}

// Event

export enum SupportedEvent {
	Event = 'event',
	Delay = 'delay',
	Block = 'block',
}

/**
 * {@link https://github.com/cpvalente/ontime/blob/8f249b9d515fb0d799514d3a67de6713f5029faf/packages/types/src/definitions/core/OntimeEvent.type.ts GitHub}.
 */
export type OntimeBaseEvent = {
	type: SupportedEvent
	id: string
	after?: string // used when creating an event to indicate its position in rundown
	/** ServiceProfile id this entry was generated for; absent on rehearsal and master-section entries */
	generatedFor?: string
	/** Id of the master entry this generated entry was cloned from */
	mirrorOf?: string
}

export enum EndAction {
	None = 'none',
	Stop = 'stop',
	LoadNext = 'load-next',
	PlayNext = 'play-next',
}

export enum TimerType {
	CountDown = 'count-down',
	CountUp = 'count-up',
	TimeToEnd = 'time-to-end',
	Clock = 'clock',
}

// Main runtime store

export type RuntimeStore = {
	// timer data
	clock: number
	timer: TimerState
	onAir: boolean

	// messages service
	message: MessageState

	// rundown data
	runtime: Runtime
	eventNow: OntimeEvent | null
	// publicEventNow: OntimeEvent | null
	eventNext: OntimeEvent | null
	// publicEventNext: OntimeEvent | null
	currentBlock: CurrentBlockState
	// extra timers
	auxtimer1: SimpleTimerState

	// external integrations
	qlab: QlabState

	// recallable rundown sources
	rundownSources: RundownSourcesState
}

/**
 * {@link https://github.com/cpvalente/ontime/blob/master/packages/types/src/definitions/runtime/TimerState.type.ts GitHub}
 */
export enum TimerPhase {
	None = 'none',
	Default = 'default',
	Warning = 'warning',
	Danger = 'danger',
	Overtime = 'overtime',
	Pending = 'pending', // used for waiting to roll
}

/**
 * {@link https://github.com/cpvalente/ontime/blob/master/packages/types/src/definitions/runtime/TimerState.type.ts GitHub}
 */
export type TimerState = {
	addedTime: number // time added by user, can be negative
	current: number | null // running countdown
	duration: number | null // normalised duration of current event
	elapsed: number | null // elapsed time in current timer
	expectedFinish: number | null // time we expect timer to finish
	finishedAt: number | null // only if timer has already finished
	phase: TimerPhase
	playback: Playback
	secondaryTimer: number | null // used for roll mode
	startedAt: number | null // only if timer has already started
}

/**
 * {@link https://github.com/cpvalente/ontime/blob/master/packages/types/src/definitions/runtime/Runtime.type.ts GitHub}
 */
export type Runtime = {
	numEvents: number
	selectedEventIndex: number | null
	globalDelay: number
	offset: number | null
	relativeOffset: number | null
	plannedStart: number | null
	actualStart: number | null
	plannedEnd: number | null
	expectedEnd: number | null
	offsetMode: OffsetMode
}

export enum OffsetMode {
	Absolute = 'absolute',
	Relative = 'relative',
}

// Event

export type OntimeEvent = OntimeBaseEvent & {
	type: SupportedEvent.Event
	cue: string
	title: string
	note: string
	endAction: EndAction
	timerType: TimerType
	linkStart: string | null // ID of event to link to
	timeStrategy: TimeStrategy
	timeStart: number
	timeEnd: number
	duration: number
	isPublic: boolean
	skip: boolean
	colour: string
	revision: number
	delay: number // calculated at runtime
	timeWarning: number
	timeDanger: number
	custom: EventCustomFields
}

export enum TimeStrategy {
	LockEnd = 'lock-end',
	LockDuration = 'lock-duration',
}

// Message

export type MessageState = {
	timer: TimerMessage
	external: string
}

export type TimerMessage = {
	text: string
	visible: boolean
	blink: boolean
	blackout: boolean
	secondarySource: 'aux' | 'external' | null
}

// Custom fields

export type CustomField = {
	type: 'string'
	colour: string
	label: string
}

export type CustomFields = Record<string, CustomField>
export type EventCustomFields = Record<string, string>

//Extra timer

export enum SimplePlayback {
	Start = 'start',
	Pause = 'pause',
	Stop = 'stop',
}

export enum SimpleDirection {
	CountUp = 'count-up',
	CountDown = 'count-down',
}

export type SimpleTimerState = {
	duration: number
	current: number
	playback: SimplePlayback
	direction: SimpleDirection
}

export type OntimeBlock = OntimeBaseEvent & {
	type: SupportedEvent.Block
	title: string
}

export type CurrentBlockState = {
	block: OntimeBlock | null
	startedAt: number | null
}

// QLab integration

/**
 * State of the QLab connection, published by ontime as `ontime-qlab`.
 * Read only, ontime exposes no integration commands for QLab.
 */
export type QlabState = {
	enabled: boolean
	connected: boolean
	cueName: string
	cueNumber: string
	duration: number // milliseconds
	elapsed: number // milliseconds
	remaining: number // milliseconds
	isPaused: boolean
	phase: TimerPhase
}

// Rundown sources

/** Where a recallable rundown comes from, currently only the linked Google Sheet */
export type RundownSourceProvider = 'gsheet'

/** A rundown which lives outside the project file and can be recalled into it */
export type RundownSource = {
	/** 1 based position in the list, this is the address used for recall */
	index: number
	name: string
}

export type RundownSourcesState = {
	provider: RundownSourceProvider | null
	containerId: string | null
	sources: RundownSource[]
	/** name of the source last recalled, null before the first recall */
	loaded: string | null
	/** a refresh or a recall is in flight */
	loading: boolean
	/** reason the last operation failed, cleared on success */
	error: string | null
	/** increments on every successful refresh */
	revision: number
}

// Service profiles (dual service mode)

export type ServiceProfile = {
	id: string
	name: string
	/** milliseconds added to the master section's times for this instance, the authored master is 0 */
	offset: number
}

export type ServiceProfiles = {
	/** block that begins the master service section, entries before it are rehearsal */
	boundaryBlockId: string | null
	/** ordered service instances, the first (offset 0) is the authored master */
	services: ServiceProfile[]
}

/** Which section of a dual service rundown an event belongs to */
export enum ServiceSection {
	None = '',
	Rehearsal = 'rehearsal',
	Master = 'master',
	Generated = 'generated',
}
