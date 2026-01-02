import { CompanionPresetDefinitions, combineRgb } from '@companion-module/base'

export function getPresets(): CompanionPresetDefinitions {
	return {
		// ========== Transport (Focus) ==========
		transport_go: {
			type: 'button',
			category: 'Transport (Focus)',
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
					feedbackId: 'playback_playing',
					options: {},
					style: { bgcolor: combineRgb(0, 255, 0) },
				},
			],
		},
		transport_stop: {
			type: 'button',
			category: 'Transport (Focus)',
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
					feedbackId: 'playback_stopped',
					options: {},
					style: { bgcolor: combineRgb(255, 0, 0) },
				},
			],
		},
		transport_pause: {
			type: 'button',
			category: 'Transport (Focus)',
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
					feedbackId: 'playback_paused',
					options: {},
					style: { bgcolor: combineRgb(255, 165, 0) },
				},
			],
		},
		transport_resume: {
			type: 'button',
			category: 'Transport (Focus)',
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
		transport_prev: {
			type: 'button',
			category: 'Transport (Focus)',
			name: 'PREV',
			style: {
				text: '⏮',
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
		transport_next: {
			type: 'button',
			category: 'Transport (Focus)',
			name: 'NEXT',
			style: {
				text: '⏭',
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

		// ========== Transport (Global) ==========
		global_go: {
			type: 'button',
			category: 'Transport (Global)',
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
			category: 'Transport (Global)',
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

		// ========== Cue Info ==========
		info_standby_cue: {
			type: 'button',
			category: 'Cue Info',
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
		info_current_cue: {
			type: 'button',
			category: 'Cue Info',
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
		info_time: {
			type: 'button',
			category: 'Cue Info',
			name: 'Time Remaining',
			style: {
				text: 'TIME\\n$(eventsync:focus_time_remaining)',
				size: '18',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(34, 34, 34),
			},
			steps: [],
			feedbacks: [],
		},
		info_focused_stack: {
			type: 'button',
			category: 'Cue Info',
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
		info_transport_mode: {
			type: 'button',
			category: 'Cue Info',
			name: 'Transport Mode',
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

		// ========== Transport Lock ==========
		unlock_transport: {
			type: 'button',
			category: 'Transport Lock',
			name: 'Unlock Transport',
			style: {
				text: 'UNLOCK\\nTRANSPORT',
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
			feedbacks: [],
		},
	}
}
