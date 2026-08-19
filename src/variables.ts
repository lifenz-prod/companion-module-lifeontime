import type { CompanionVariableDefinition } from '@companion-module/base'
import { variableId } from './enums.js'

export function variables(): CompanionVariableDefinition[] {
	return [
		//clock
		{
			name: 'Clock (hh:mm:ss)',
			variableId: variableId.Clock,
		},
		//timer.addedTime
		{
			name: 'User added time to current event (hh:mm:ss)',
			variableId: variableId.TimerAdded,
		},
		{
			name: 'User added time to current event (smallest unit)',
			variableId: variableId.TimerAddedNice,
		},
		//timer.current
		{
			name: 'Current timer progress (Default/Warning/Danger/Overtime)',
			variableId: variableId.TimerPhase,
		},
		{
			name: 'Current timer (milliseconds)',
			variableId: variableId.TimerTotalMs,
		},
		{
			name: 'Current timer (hh:mm:ss)',
			variableId: variableId.Time,
		},
		{
			name: 'Current time of event (hh:mm)',
			variableId: variableId.TimeHM,
		},
		{
			name: 'Current event state Hours',
			variableId: variableId.TimeH,
		},
		{
			name: 'Current event state Minutes',
			variableId: variableId.TimeM,
		},
		{
			name: 'Current event state Seconds',
			variableId: variableId.TimeS,
		},
		{
			name: 'Current event timer Sign',
			variableId: variableId.TimeN,
		},
		//timer.duration
		//timer.elapsed
		//timer.expectedFinish
		{
			name: 'Expected finish of event (hh:mm:ss)',
			variableId: variableId.TimerFinish,
		},
		//timer.finishedAt
		//timer.playback
		{
			name: 'Playback state (Running, Paused, Stopped, Roll)',
			variableId: variableId.PlayState,
		},
		//timer.secondaryTimer
		//timer.startedAt
		{
			name: 'Start time of current timer (hh:mm:ss)',
			variableId: variableId.TimerStart,
		},
		//message.timer.text
		{
			name: 'Timer Message',
			variableId: variableId.TimerMessage,
		},
		//message.timer.visible
		{
			name: 'Timer Message Visible',
			variableId: variableId.TimerMessageVisible,
		},
		//message.timer.blackout
		{
			name: 'Timer Blackout',
			variableId: variableId.TimerBlackout,
		},
		//message.timer.blink
		{
			name: 'Timer Blinking',
			variableId: variableId.TimerBlink,
		},
		{
			name: 'External Message',
			variableId: variableId.ExternalMessage,
		},
		{
			name: 'Timer Message Secondary Source',
			variableId: variableId.TimerSecondarySource,
		},
		{
			name: 'Number of events',
			variableId: variableId.NumberOfEvents,
		},
		{
			name: 'Selected event index',
			variableId: variableId.SelectedEventIndex,
		},
		{
			name: 'Rundown offset (hh:mm:ss)',
			variableId: variableId.RundownOffset,
		},
		{
			name: 'Rundown relative offset (hh:mm:ss)',
			variableId: variableId.RelativeOffset,
		},
		{
			name: 'Rundown offset mode (absolute/relative)',
			variableId: variableId.OffsetMode,
		},
		{
			name: 'Rundown global delay (hh:mm:ss)',
			variableId: variableId.GlobalDelay,
		},
		{
			name: 'Rundown global delay (milliseconds)',
			variableId: variableId.GlobalDelayMs,
		},
		{
			name: 'Rundown planned start (hh:mm:ss)',
			variableId: variableId.PlannedStart,
		},
		{
			name: 'Rundown planned end (hh:mm:ss)',
			variableId: variableId.PlannedEnd,
		},
		{
			name: 'Rundown actual start (hh:mm:ss)',
			variableId: variableId.ActualStart,
		},
		{
			name: 'Rundown expected end (hh:mm:ss)',
			variableId: variableId.ExpectedEnd,
		},
		{
			name: 'Title of current block',
			variableId: variableId.CurrentBlockTitle,
		},
		{
			name: 'Start time of current block (hh:mm:ss)',
			variableId: variableId.CurrentBlockStartedAt,
		},
		{
			name: 'Start time of current block (milliseconds)',
			variableId: variableId.CurrentBlockStartedAtMs,
		},
		{
			name: 'ID of previous event',
			variableId: variableId.IdPrevious,
		},
		{
			name: 'Title of previous event',
			variableId: variableId.TitlePrevious,
		},
		{
			name: 'Note of previous event',
			variableId: variableId.NotePrevious,
		},
		{
			name: 'Cue of previous event',
			variableId: variableId.CuePrevious,
		},
		{
			name: 'ID of current event',
			variableId: variableId.IdNow,
		},
		//eventNow.title
		{
			name: 'Title of current event',
			variableId: variableId.TitleNow,
		},
		//eventNow.note
		{
			name: 'Note of current event',
			variableId: variableId.NoteNow,
		},
		//eventNow.cue
		{
			name: 'Cue of current event',
			variableId: variableId.CueNow,
		},
		//eventNext.di
		{
			name: 'ID of next event',
			variableId: variableId.IdNext,
		},
		//eventNext.title
		{
			name: 'Title of next event',
			variableId: variableId.TitleNext,
		},
		//eventNext.note
		{
			name: 'Note of next event',
			variableId: variableId.NoteNext,
		},
		//eventNext.cue
		{
			name: 'Cue of next event',
			variableId: variableId.CueNext,
		},
		//aux timer
		{
			name: 'Aux timer 1 duration (milliseconds)',
			variableId: variableId.AuxTimerDurationMs + '-1',
		},
		{
			name: 'Aux timer 1 current (milliseconds)',
			variableId: variableId.AuxTimerDurationMs + '-1',
		},
		{
			name: 'Aux timer 1 current (hh:mm:ss)',
			variableId: variableId.AuxTimerCurrent + '-1',
		},
		{
			name: 'Aux timer 1 playback',
			variableId: variableId.AuxTimerPlayback + '-1',
		},
		{
			name: 'Aux timer 1 direction (count-up/count-down)',
			variableId: variableId.AuxTimerDirection + '-1',
		},
		//service profiles
		{
			name: 'Service instance of current event',
			variableId: variableId.ServiceNow,
		},
		{
			name: 'Service section of current event (rehearsal/master/generated)',
			variableId: variableId.ServiceSectionNow,
		},
		{
			name: 'Service instance of next event',
			variableId: variableId.ServiceNext,
		},
		{
			name: 'Service section of next event (rehearsal/master/generated)',
			variableId: variableId.ServiceSectionNext,
		},
		//qlab
		{
			name: 'QLab integration enabled',
			variableId: variableId.QlabEnabled,
		},
		{
			name: 'QLab connected',
			variableId: variableId.QlabConnected,
		},
		{
			name: 'QLab cue name',
			variableId: variableId.QlabCueName,
		},
		{
			name: 'QLab cue number',
			variableId: variableId.QlabCueNumber,
		},
		{
			name: 'QLab cue duration (hh:mm:ss)',
			variableId: variableId.QlabDuration,
		},
		{
			name: 'QLab cue duration (milliseconds)',
			variableId: variableId.QlabDurationMs,
		},
		{
			name: 'QLab cue elapsed (hh:mm:ss)',
			variableId: variableId.QlabElapsed,
		},
		{
			name: 'QLab cue elapsed (milliseconds)',
			variableId: variableId.QlabElapsedMs,
		},
		{
			name: 'QLab cue remaining (hh:mm:ss)',
			variableId: variableId.QlabRemaining,
		},
		{
			name: 'QLab cue remaining (milliseconds)',
			variableId: variableId.QlabRemainingMs,
		},
		{
			name: 'QLab cue paused',
			variableId: variableId.QlabPaused,
		},
		{
			name: 'QLab cue phase (Default/Warning/Danger/Overtime)',
			variableId: variableId.QlabPhase,
		},
		//rundown sources
		{
			name: 'Rundown source provider',
			variableId: variableId.SourceProvider,
		},
		{
			name: 'Rundown source container id (eg. the sheet ID)',
			variableId: variableId.SourceContainerId,
		},
		{
			name: 'Number of available rundown sources',
			variableId: variableId.SourceCount,
		},
		{
			name: 'Name of the rundown source last recalled',
			variableId: variableId.SourceLoaded,
		},
		{
			name: 'Rundown source refresh or recall in flight',
			variableId: variableId.SourceLoading,
		},
		{
			name: 'Reason the last rundown source operation failed',
			variableId: variableId.SourceError,
		},
		{
			name: 'Rundown source list revision',
			variableId: variableId.SourceRevision,
		},
		{
			name: 'Available rundown sources (comma separated)',
			variableId: variableId.SourceList,
		},
	]
}
