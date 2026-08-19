import { OffsetMode, Playback, TimerPhase, SimpleDirection, SimplePlayback } from './ontime-types.js'
import type { RuntimeStore } from './ontime-types.js'

const stateobj: RuntimeStore = {
	clock: 0,
	timer: {
		current: null,
		elapsed: null,
		expectedFinish: null,
		addedTime: 0,
		startedAt: null,
		finishedAt: null,
		secondaryTimer: null,
		duration: null,
		phase: TimerPhase.None,
		playback: Playback.Stop,
	},
	onAir: false,
	message: {
		timer: { text: '', visible: false, blink: false, blackout: false, secondarySource: null },
		external: '',
	},
	runtime: {
		numEvents: 0,
		selectedEventIndex: 0,
		globalDelay: 0,
		offset: 0,
		relativeOffset: 0,
		plannedStart: 0,
		actualStart: 0,
		plannedEnd: 0,
		expectedEnd: 0,
		offsetMode: OffsetMode.Absolute,
	},
	eventNow: null,
	eventNext: null,
	currentBlock: { block: null, startedAt: null },
	auxtimer1: {
		duration: 0,
		current: 0,
		playback: SimplePlayback.Stop,
		direction: SimpleDirection.CountDown,
	},
	qlab: {
		enabled: false,
		connected: false,
		cueName: '',
		cueNumber: '',
		duration: 0,
		elapsed: 0,
		remaining: 0,
		isPaused: false,
		phase: TimerPhase.None,
	},
	rundownSources: {
		provider: null,
		containerId: null,
		sources: [],
		loaded: null,
		loading: false,
		error: null,
		revision: 0,
	},
}

export { stateobj }
