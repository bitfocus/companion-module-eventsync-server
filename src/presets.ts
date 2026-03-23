import { CompanionPresetDefinitions, combineRgb } from '@companion-module/base'
import { EventSyncState } from './state.js'

function sanitizeVariableName(name: string): string {
	return name.replace(/[^a-zA-Z0-9]/g, '_')
}

export function getPresets(state: EventSyncState): CompanionPresetDefinitions {
	const presets: CompanionPresetDefinitions = {
		// ========== Cue Stack (Focused) - Transport ==========
		focus_go: {
			type: 'button',
			category: 'Cue Stack (Focused)',
			name: 'GO',
			style: {
				text: 'GO',
				size: '24',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 136, 0),
			},
			steps: [
				{
					down: [{ actionId: 'focus_go', options: {} }],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'focus_playing',
					options: {},
					style: { bgcolor: combineRgb(0, 255, 0) },
				},
			],
		},
		focus_stop: {
			type: 'button',
			category: 'Cue Stack (Focused)',
			name: 'STOP',
			style: {
				text: 'STOP',
				size: '24',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(136, 0, 0),
			},
			steps: [
				{
					down: [{ actionId: 'focus_stop', options: {} }],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'focus_stopped',
					options: {},
					style: { bgcolor: combineRgb(255, 0, 0) },
				},
			],
		},
		focus_pause: {
			type: 'button',
			category: 'Cue Stack (Focused)',
			name: 'PAUSE',
			style: {
				text: 'PAUSE',
				size: '18',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(136, 100, 0),
			},
			steps: [
				{
					down: [{ actionId: 'focus_pause', options: {} }],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'focus_paused',
					options: {},
					style: { bgcolor: combineRgb(255, 165, 0) },
				},
			],
		},
		focus_resume: {
			type: 'button',
			category: 'Cue Stack (Focused)',
			name: 'RESUME',
			style: {
				text: 'RESUME',
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 100, 136),
			},
			steps: [
				{
					down: [{ actionId: 'focus_resume', options: {} }],
					up: [],
				},
			],
			feedbacks: [],
		},
		focus_prev: {
			type: 'button',
			category: 'Cue Stack (Focused)',
			name: 'PREV',
			style: {
				text: '\u23EE',
				size: '24',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(68, 68, 68),
			},
			steps: [
				{
					down: [{ actionId: 'focus_previous', options: {} }],
					up: [],
				},
			],
			feedbacks: [],
		},
		focus_next: {
			type: 'button',
			category: 'Cue Stack (Focused)',
			name: 'NEXT',
			style: {
				text: '\u23ED',
				size: '24',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(68, 68, 68),
			},
			steps: [
				{
					down: [{ actionId: 'focus_next', options: {} }],
					up: [],
				},
			],
			feedbacks: [],
		},

		// ========== Cue Stack (Focused) - Info ==========
		focus_standby_cue: {
			type: 'button',
			category: 'Cue Stack (Focused)',
			name: 'Standby Cue',
			style: {
				text: 'STANDBY\\n$(eventsync:focus_standby_cue)',
				size: '14',
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 165, 0),
			},
			steps: [],
			feedbacks: [],
		},
		focus_current_cue: {
			type: 'button',
			category: 'Cue Stack (Focused)',
			name: 'Running Cue',
			style: {
				text: 'RUNNING\\n$(eventsync:focus_current_cue)',
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 136, 0),
			},
			steps: [],
			feedbacks: [],
		},
		focus_video_time: {
			type: 'button',
			category: 'Cue Stack (Focused)',
			name: 'Video Time',
			style: {
				text: 'VIDEO\\n$(eventsync:focus_video_time)',
				size: '18',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(34, 34, 34),
			},
			steps: [],
			feedbacks: [],
		},
		focus_wait_time: {
			type: 'button',
			category: 'Cue Stack (Focused)',
			name: 'Wait Time',
			style: {
				text: 'WAIT\\n$(eventsync:focus_wait_time)',
				size: '18',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(34, 34, 34),
			},
			steps: [],
			feedbacks: [],
		},
		focus_stack_name: {
			type: 'button',
			category: 'Cue Stack (Focused)',
			name: 'Focused Stack',
			style: {
				text: 'FOCUS\\n$(eventsync:focused_stack)',
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(34, 34, 34),
			},
			steps: [],
			feedbacks: [],
		},
		focus_playback_state: {
			type: 'button',
			category: 'Cue Stack (Focused)',
			name: 'Playback State',
			style: {
				text: 'STATE\\n$(eventsync:focus_playback_state)',
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(34, 34, 34),
			},
			steps: [],
			feedbacks: [
				{
					feedbackId: 'focus_playing',
					options: {},
					style: { bgcolor: combineRgb(0, 255, 0), color: combineRgb(0, 0, 0) },
				},
				{
					feedbackId: 'focus_paused',
					options: {},
					style: { bgcolor: combineRgb(255, 165, 0), color: combineRgb(0, 0, 0) },
				},
				{
					feedbackId: 'focus_stopped',
					options: {},
					style: { bgcolor: combineRgb(255, 0, 0) },
				},
			],
		},

		// ========== Global ==========
		global_go: {
			type: 'button',
			category: 'Global',
			name: 'GLOBAL GO',
			style: {
				text: 'GLOBAL\\nGO',
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 100, 0),
			},
			steps: [
				{
					down: [{ actionId: 'global_go', options: {} }],
					up: [],
				},
			],
			feedbacks: [],
		},
		global_stop: {
			type: 'button',
			category: 'Global',
			name: 'GLOBAL STOP',
			style: {
				text: 'GLOBAL\\nSTOP',
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(100, 0, 0),
			},
			steps: [
				{
					down: [{ actionId: 'global_stop', options: {} }],
					up: [],
				},
			],
			feedbacks: [],
		},
		global_pause: {
			type: 'button',
			category: 'Global',
			name: 'GLOBAL PAUSE',
			style: {
				text: 'GLOBAL\\nPAUSE',
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(136, 100, 0),
			},
			steps: [
				{
					down: [{ actionId: 'global_pause', options: {} }],
					up: [],
				},
			],
			feedbacks: [],
		},
		global_resume: {
			type: 'button',
			category: 'Global',
			name: 'GLOBAL RESUME',
			style: {
				text: 'GLOBAL\\nRESUME',
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 100, 136),
			},
			steps: [
				{
					down: [{ actionId: 'global_resume', options: {} }],
					up: [],
				},
			],
			feedbacks: [],
		},
		global_prev: {
			type: 'button',
			category: 'Global',
			name: 'GLOBAL PREV',
			style: {
				text: 'GLOBAL\\n\u23EE',
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(68, 68, 68),
			},
			steps: [
				{
					down: [{ actionId: 'global_previous', options: {} }],
					up: [],
				},
			],
			feedbacks: [],
		},
		global_next: {
			type: 'button',
			category: 'Global',
			name: 'GLOBAL NEXT',
			style: {
				text: 'GLOBAL\\n\u23ED',
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(68, 68, 68),
			},
			steps: [
				{
					down: [{ actionId: 'global_next', options: {} }],
					up: [],
				},
			],
			feedbacks: [],
		},

		// (Cue Stack Specific presets are generated dynamically per stack below)

		// ========== Fire by Position/ContentOSC ==========
		focus_fire: {
			type: 'button',
			category: 'Cue Stack (Focused)',
			name: 'Go Cue Number',
			style: {
				text: 'GO\\nCUE #',
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 136, 0),
			},
			steps: [
				{
					down: [{ actionId: 'focus_fire', options: { position: 1 } }],
					up: [],
				},
			],
			feedbacks: [],
		},
		global_fire: {
			type: 'button',
			category: 'Global',
			name: 'Go Cue Number',
			style: {
				text: 'GLOBAL\\nGO CUE #',
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 100, 0),
			},
			steps: [
				{
					down: [{ actionId: 'global_fire', options: { position: 1 } }],
					up: [],
				},
			],
			feedbacks: [],
		},
		global_fire_contentosc: {
			type: 'button',
			category: 'Global',
			name: 'FIRE ContentOSC',
			style: {
				text: 'FIRE\\nOSC ID',
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 100, 0),
			},
			steps: [
				{
					down: [{ actionId: 'global_fire_contentosc_manual', options: { id: 1000 } }],
					up: [],
				},
			],
			feedbacks: [],
		},

		// ========== Cue Stack Focus Lock ==========
		focus_lock: {
			type: 'button',
			category: 'Cue Stack Focus Lock',
			name: 'Lock Focus',
			style: {
				text: 'LOCK\\nFOCUS',
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(136, 100, 0),
			},
			steps: [
				{
					down: [{ actionId: 'lock_transport', options: { stack: '' } }],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'transport_locked',
					options: {},
					style: { bgcolor: combineRgb(255, 136, 0) },
				},
			],
		},
		focus_unlock: {
			type: 'button',
			category: 'Cue Stack Focus Lock',
			name: 'Unlock Focus',
			style: {
				text: 'UNLOCK\\nFOCUS',
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(68, 68, 68),
			},
			steps: [
				{
					down: [{ actionId: 'unlock_transport', options: {} }],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'transport_locked',
					options: {},
					style: { bgcolor: combineRgb(255, 136, 0) },
				},
			],
		},
		focus_select: {
			type: 'button',
			category: 'Cue Stack Focus Lock',
			name: 'Select Cue Stack',
			style: {
				text: 'SELECT\\nSTACK',
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(68, 68, 68),
			},
			steps: [
				{
					down: [{ actionId: 'select_stack', options: { stack: '' } }],
					up: [],
				},
			],
			feedbacks: [],
		},
		focus_lock_mode: {
			type: 'button',
			category: 'Cue Stack Focus Lock',
			name: 'Focus Mode',
			style: {
				text: '$(eventsync:transport_mode)',
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(34, 34, 34),
			},
			steps: [],
			feedbacks: [
				{
					feedbackId: 'transport_locked',
					options: {},
					style: { bgcolor: combineRgb(255, 136, 0) },
				},
			],
		},

		// ========== System Status ==========
		status_devices: {
			type: 'button',
			category: 'System Status',
			name: 'Devices',
			style: {
				text: 'DEVICES\\n$(eventsync:connected_devices)',
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(34, 34, 34),
			},
			steps: [],
			feedbacks: [],
		},
		status_licenses: {
			type: 'button',
			category: 'System Status',
			name: 'Licenses',
			style: {
				text: 'LICENSES\\n$(eventsync:licenses_display)',
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(34, 34, 34),
			},
			steps: [],
			feedbacks: [
				{
					feedbackId: 'license_warning',
					options: {},
					style: { bgcolor: combineRgb(255, 0, 0) },
				},
			],
		},
		status_server: {
			type: 'button',
			category: 'System Status',
			name: 'Server',
			style: {
				text: 'SERVER\\n$(eventsync:server_status)',
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(34, 34, 34),
			},
			steps: [],
			feedbacks: [
				{
					feedbackId: 'server_connected',
					options: {},
					style: { bgcolor: combineRgb(0, 255, 0), color: combineRgb(0, 0, 0) },
				},
			],
		},
		status_transcode: {
			type: 'button',
			category: 'System Status',
			name: 'Transcode Queue',
			style: {
				text: 'TRANSCODE\\n$(eventsync:transcode_queue)',
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(34, 34, 34),
			},
			steps: [],
			feedbacks: [
				{
					feedbackId: 'transcode_queue_not_empty',
					options: {},
					style: { bgcolor: combineRgb(255, 165, 0), color: combineRgb(0, 0, 0) },
				},
			],
		},
	}

	// ========== Cue Stack (Specific) - Per-Stack Presets ==========
	for (const stack of state.stacks) {
		const name = stack.name
		const key = sanitizeVariableName(name)
		const category = `Cue Stack: ${name}`

		// Transport buttons with feedbacks
		presets[`stack_${key}_go`] = {
			type: 'button',
			category,
			name: 'GO',
			style: {
				text: 'GO',
				size: '24',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 136, 0),
			},
			steps: [{ down: [{ actionId: 'stack_go', options: { stack: name } }], up: [] }],
			feedbacks: [
				{ feedbackId: 'stack_playing', options: { stack: name }, style: { bgcolor: combineRgb(0, 255, 0) } },
			],
		}
		presets[`stack_${key}_stop`] = {
			type: 'button',
			category,
			name: 'STOP',
			style: {
				text: 'STOP',
				size: '24',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(136, 0, 0),
			},
			steps: [{ down: [{ actionId: 'stack_stop', options: { stack: name } }], up: [] }],
			feedbacks: [
				{ feedbackId: 'stack_stopped', options: { stack: name }, style: { bgcolor: combineRgb(255, 0, 0) } },
			],
		}
		presets[`stack_${key}_pause`] = {
			type: 'button',
			category,
			name: 'PAUSE',
			style: {
				text: 'PAUSE',
				size: '18',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(136, 100, 0),
			},
			steps: [{ down: [{ actionId: 'stack_pause', options: { stack: name } }], up: [] }],
			feedbacks: [
				{ feedbackId: 'stack_paused', options: { stack: name }, style: { bgcolor: combineRgb(255, 165, 0) } },
			],
		}
		presets[`stack_${key}_resume`] = {
			type: 'button',
			category,
			name: 'RESUME',
			style: {
				text: 'RESUME',
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 100, 136),
			},
			steps: [{ down: [{ actionId: 'stack_resume', options: { stack: name } }], up: [] }],
			feedbacks: [],
		}
		presets[`stack_${key}_prev`] = {
			type: 'button',
			category,
			name: 'PREV',
			style: {
				text: '\u23EE',
				size: '24',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(68, 68, 68),
			},
			steps: [{ down: [{ actionId: 'stack_previous', options: { stack: name } }], up: [] }],
			feedbacks: [],
		}
		presets[`stack_${key}_next`] = {
			type: 'button',
			category,
			name: 'NEXT',
			style: {
				text: '\u23ED',
				size: '24',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(68, 68, 68),
			},
			steps: [{ down: [{ actionId: 'stack_next', options: { stack: name } }], up: [] }],
			feedbacks: [],
		}
		presets[`stack_${key}_fire`] = {
			type: 'button',
			category,
			name: 'Go Cue Number',
			style: {
				text: 'GO\\nCUE #',
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 136, 0),
			},
			steps: [{ down: [{ actionId: 'stack_fire', options: { stack: name, position: 1 } }], up: [] }],
			feedbacks: [],
		}

		// Info display buttons
		presets[`stack_${key}_standby_cue`] = {
			type: 'button',
			category,
			name: 'Standby Cue',
			style: {
				text: `STANDBY\\n$(eventsync:stack_${key}_standby_cue)`,
				size: '14',
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 165, 0),
			},
			steps: [],
			feedbacks: [],
		}
		presets[`stack_${key}_current_cue`] = {
			type: 'button',
			category,
			name: 'Running Cue',
			style: {
				text: `RUNNING\\n$(eventsync:stack_${key}_current_cue)`,
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 136, 0),
			},
			steps: [],
			feedbacks: [],
		}
		presets[`stack_${key}_video_time`] = {
			type: 'button',
			category,
			name: 'Video Time',
			style: {
				text: `VIDEO\\n$(eventsync:stack_${key}_video_time)`,
				size: '18',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(34, 34, 34),
			},
			steps: [],
			feedbacks: [],
		}
		presets[`stack_${key}_wait_time`] = {
			type: 'button',
			category,
			name: 'Wait Time',
			style: {
				text: `WAIT\\n$(eventsync:stack_${key}_wait_time)`,
				size: '18',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(34, 34, 34),
			},
			steps: [],
			feedbacks: [],
		}
		presets[`stack_${key}_playback_state`] = {
			type: 'button',
			category,
			name: 'Playback State',
			style: {
				text: `STATE\\n$(eventsync:stack_${key}_playback_state)`,
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(34, 34, 34),
			},
			steps: [],
			feedbacks: [
				{
					feedbackId: 'stack_playing',
					options: { stack: name },
					style: { bgcolor: combineRgb(0, 255, 0), color: combineRgb(0, 0, 0) },
				},
				{
					feedbackId: 'stack_paused',
					options: { stack: name },
					style: { bgcolor: combineRgb(255, 165, 0), color: combineRgb(0, 0, 0) },
				},
				{ feedbackId: 'stack_stopped', options: { stack: name }, style: { bgcolor: combineRgb(255, 0, 0) } },
			],
		}
	}

	return presets
}
