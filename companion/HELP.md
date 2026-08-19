# Ontime Companion Module

This module gives control over Ontime leveraging its [WebSockets API](https://docs.getontime.no/api/protocols/websockets/)

## Requirements

- Ontime v3.6.0 or newer, or the Life On Time v4 fork
- The rundown source, QLab and service instance features below need the Life On Time fork

## Rundown sources

A rundown source is a rundown that lives outside the project file — today the worksheet
tabs of the Google Sheet linked in Ontime. A button can recall one without anyone opening
the settings panel.

- **Recall a rundown source** — by name from a list, by name from a variable, or by index.
  Recalling by name is recommended: indexes follow the tab order, so reordering tabs in
  Google Sheets reshuffles them.
- **Refresh the rundown source list** — re-reads the tabs from the sheet. Never interrupts
  playback.

A recall **replaces the rundown, custom fields and service profiles**, then arms the first
event so the operator only needs to press GO. Because that stops playback, Ontime refuses
a recall while the timer is running, paused or rolling — press STOP first. The _Recall
blocked by playback_ feedback greys the button out when that is the case.

Recalls run in the background: Ontime accepts the command immediately and reports the
outcome through its state. Use the _Rundown source busy_ and _Rundown source error_
feedbacks, and the `$(ontime:source_error)` variable, to see whether one actually
succeeded — a failed recall does not produce any other error.

Note: a recall reuses the column mapping from the last import made through Ontime's
settings panel. After changing the sheet's column layout, do one manual import so recalls
pick up the same mapping.

## QLab

When Ontime is following a QLab cue, the cue name, number and times are available as
variables, along with feedbacks for connection state, paused, cue phase and a progress
bar. This is read only — Ontime exposes no commands for QLab.

## Service instances (dual service mode)

In a rundown with generated service sections, `$(ontime:service_now)` and
`$(ontime:service_next)` give the name of the service instance an event belongs to (eg.
`11am`), and the _Service instance_ feedback lights a button for a given instance or for
the rehearsal / master / generated section.

## Rundown timing

Alongside the rundown offset, the module exposes Ontime v4's global delay and offset mode.
The _Rundown Offset_ feedback can follow whichever mode Ontime is in, or be pinned to the
absolute or relative value.

## Links

You can download ontime from the website [www.getontime.no](https://www.getontime.no/) \
Read the docs at [http://docs.getontime.no](https://docs.getontime.no/) \
Follow Ontime's development on [GitHub](https://github.com/cpvalente/ontime)
