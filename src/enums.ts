/**
 * maximum allowed time 23:59:59 as seconds
 */
export const MAX_TIME_SECONDS = 23 * 60 * 60 + 59 * 60 + 59

export enum ActionId {
	Start = 'start',
	StartNext = 'start-next',
	Load = 'load',
	Pause = 'pause',
	Stop = 'stop',
	Reload = 'reload',
	Roll = 'roll',

	Add = 'add',

	Change = 'change',

	TimerBlackout = 'TimerBlackout',
	TimerBlink = 'TimerBlink',
	MessageVisibility = 'setMessageVisibility',
	MessageVisibilityAndText = 'setMessageVisibilityAndText',
	MessageSecondarySource = 'setMessageSecondarySource',
	MessageText = 'setMessage',

	AuxTimerDuration = 'auxTimerDuration',
	AuxTimerPlayState = 'auxTimerPlayState',
	AuxTimerDirection = 'auxTimerDirection',
	AuxTimerAdd = 'auxTimerAdd',

	GlobalDelay = 'globalDelay',
	OffsetMode = 'offsetMode',

	LoadSource = 'loadSource',
	RefreshSources = 'refreshSources',
}

export enum deprecatedActionId {
	Next = 'next',
	Previous = 'previous',
	SetOnAir = 'setOnAir',
	SetTimerMessageVisibility = 'setTimerMessageVisibility',
	SetTimerMessage = 'setTimerMessage',
	SetPublicMessageVisibility = 'setPublicMessageVisibility',
	SetPublicMessage = 'setPublicMessage',
	SetLowerMessageVisibility = 'setLowerMessageVisibility',
	SetLowerMessage = 'setLowerMessage',
	StartId = 'startId',
	StartSelect = 'startSelect',
	StartIndex = 'startIndex',
	StartNext = 'startNext',
	StartCue = 'startCue',
	LoadId = 'loadId',
	LoadSelect = 'loadSelect',
	LoadIndex = 'loadIndex',
	LoadCue = 'loadCue',
	SetTimerBlackout = 'setTimerBlackout',
	SetTimerBlink = 'setTimerBlink',
}

export enum feedbackId {
	ColorPlayback = 'colorPlayback',
	ColorAddRemove = 'state_color_add_remove',
	OnAir = 'onAir',

	MessageVisible = 'messageVisible',
	MessageSecondarySourceVisible = 'messageSecondarySourceVisible',
	TimerBlink = 'timerBlink',
	TimerBlackout = 'timerBlackout',
	TimerPhase = 'timerPhase',

	TimerProgressBar = 'timerProgressBar',
	TimerProgressBarMulti = 'timerProgressBarMulti',

	RundownOffset = 'rundownOffset',

	CustomFieldsValue = 'customFieldsValue',

	AuxTimerPlayback = 'auxTimerPlayback',
	AuxTimerNegative = 'auxTimerNegativePlayback',

	QlabConnection = 'qlabConnection',
	QlabPaused = 'qlabPaused',
	QlabPhase = 'qlabPhase',
	QlabProgressBar = 'qlabProgressBar',

	RundownSourceLoaded = 'rundownSourceLoaded',
	RundownSourceBusy = 'rundownSourceBusy',
	RundownSourceError = 'rundownSourceError',
	RecallBlocked = 'rundownSourceRecallBlocked',

	ServiceSection = 'serviceSection',
}

export enum deprecatedFeedbackId {
	ThisMessageVisible = 'thisMessageVisible',
	TimerMessageVisible = 'timerMessageVisible',
	ThisTimerMessageVisible = 'thisTimerMessageVisible',
	PublicMessageVisible = 'publicMessageVisible',
	LowerMessageVisible = 'lowerMessageVisible',
	ColorRunning = 'state_color_running',
	ColorPaused = 'state_color_paused',
	ColorStopped = 'state_color_stopped',
	ColorRoll = 'state_color_roll',
	ColorNegative = 'timer_negative',
	TimerZone = 'timerZone',
}

export enum variableId {
	PlayState = 'playState',

	Clock = 'clock',

	TimerStart = 'timer_start',
	TimerFinish = 'timer_finish',
	TimerAdded = 'timer_added',
	TimerAddedNice = 'timer_added_nice',
	TimerTotalMs = 'timer_total_ms',
	TimerPhase = 'timer_phase',
	Time = 'time',
	TimeHM = 'time_hm',
	TimeH = 'time_h',
	TimeM = 'time_m',
	TimeS = 'time_s',
	TimeN = 'time_sign',

	IdPrevious = 'idPrevious',
	TitlePrevious = 'titlePrevious',
	NotePrevious = 'notePrevious',
	CuePrevious = 'cuePrevious',

	IdNow = 'idNow',
	TitleNow = 'titleNow',
	NoteNow = 'noteNow',
	CueNow = 'cueNow',

	IdNext = 'idNext',
	TitleNext = 'titleNext',
	NoteNext = 'noteNext',
	CueNext = 'cueNext',

	CurrentBlockTitle = 'currentBlockTitle',
	CurrentBlockStartedAt = 'currentBlockStartedAt_hms',
	CurrentBlockStartedAtMs = 'currentBlockStartedAt_ms',

	TimerMessage = 'timerMessage',
	TimerMessageVisible = 'timerMessageVisible',
	TimerBlink = 'timerBlink',
	TimerBlackout = 'timerBlackout',
	ExternalMessage = 'externalMessage',
	TimerSecondarySource = 'timerSecondarySource',

	AuxTimerDurationMs = 'auxTimer_duration_ms',
	AuxTimerPlayback = 'auxTimer_playback',
	AuxTimerCurrentMs = 'auxTimer_current_ms',
	AuxTimerCurrent = 'auxTimer_current_hms',
	AuxTimerDirection = 'auxTimer_direction',

	QlabEnabled = 'qlab_enabled',
	QlabConnected = 'qlab_connected',
	QlabCueName = 'qlab_cue_name',
	QlabCueNumber = 'qlab_cue_number',
	QlabDurationMs = 'qlab_duration_ms',
	QlabElapsedMs = 'qlab_elapsed_ms',
	QlabRemainingMs = 'qlab_remaining_ms',
	QlabDuration = 'qlab_duration_hms',
	QlabElapsed = 'qlab_elapsed_hms',
	QlabRemaining = 'qlab_remaining_hms',
	QlabPaused = 'qlab_paused',
	QlabPhase = 'qlab_phase',

	SourceProvider = 'source_provider',
	SourceContainerId = 'source_container_id',
	SourceCount = 'source_count',
	SourceLoaded = 'source_loaded',
	SourceLoading = 'source_loading',
	SourceError = 'source_error',
	SourceRevision = 'source_revision',
	SourceList = 'source_list',
	/** suffixed with the 1 based source index, eg. source_name-1 */
	SourceName = 'source_name',

	ServiceNow = 'service_now',
	ServiceSectionNow = 'service_section_now',
	ServiceNext = 'service_next',
	ServiceSectionNext = 'service_section_next',

	NumberOfEvents = 'numEvents',
	SelectedEventIndex = 'selectedEventIndex',
	GlobalDelay = 'rundown_global_delay_hms',
	GlobalDelayMs = 'rundown_global_delay_ms',
	OffsetMode = 'rundown_offset_mode',
	RelativeOffset = 'rundown_relative_offset_hms',
	RundownOffset = 'rundown_offset_hms',
	PlannedStart = 'plannedStart_hms',
	ActualStart = 'actualStart_hms',
	PlannedEnd = 'plannedEnd_hms',
	ExpectedEnd = 'expectedEnd_hms',
}

export enum OffsetState {
	On = 'on',
	Behind = 'behind',
	Ahead = 'ahead',
	Both = 'both',
}

export enum deprecatedVariableId {
	SubtitleNow = 'subtitleNow',
	SpeakerNow = 'speakerNow',
	SubtitleNext = 'subtitleNext',
	SpeakerNext = 'speakerNext',
}
