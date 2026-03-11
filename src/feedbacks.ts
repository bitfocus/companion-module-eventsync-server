import { CompanionFeedbackDefinitions, combineRgb } from '@companion-module/base'
import type { EventSyncModule } from './main.js'
import { EventSyncState } from './state.js'

export function getFeedbacks(instance: EventSyncModule, state: EventSyncState): CompanionFeedbackDefinitions {
	const stackChoices = state.getStackChoices()

	return {
		// ========== Focused Stack Feedbacks ==========
		focus_playing: {
			type: 'boolean',
			name: 'Focused Cue Stack Playing',
			description: 'True when the focused cue stack is playing',
			defaultStyle: {
				bgcolor: combineRgb(0, 255, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [],
			callback: () => {
				const focusedName = state.transportTarget || state.focusedStack || state.stacks[0]?.name
				const stack = focusedName ? state.stacks.find((s) => s.name === focusedName) : null
				return stack?.playbackState === 'playing'
			},
		},

		focus_stopped: {
			type: 'boolean',
			name: 'Focused Cue Stack Stopped',
			description: 'True when the focused cue stack is stopped',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => {
				const focusedName = state.transportTarget || state.focusedStack || state.stacks[0]?.name
				const stack = focusedName ? state.stacks.find((s) => s.name === focusedName) : null
				return stack?.playbackState === 'stopped'
			},
		},

		focus_paused: {
			type: 'boolean',
			name: 'Focused Cue Stack Paused',
			description: 'True when the focused cue stack is paused',
			defaultStyle: {
				bgcolor: combineRgb(255, 165, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [],
			callback: () => {
				const focusedName = state.transportTarget || state.focusedStack || state.stacks[0]?.name
				const stack = focusedName ? state.stacks.find((s) => s.name === focusedName) : null
				return stack?.playbackState === 'paused'
			},
		},

		// ========== Global Feedbacks ==========
		playback_playing: {
			type: 'boolean',
			name: 'Any Cue Stack Playing',
			description: 'True when any cue stack is playing',
			defaultStyle: {
				bgcolor: combineRgb(0, 255, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [],
			callback: () => {
				return state.stacks.some((s) => s.playbackState === 'playing')
			},
		},

		playback_stopped: {
			type: 'boolean',
			name: 'All Cue Stacks Stopped',
			description: 'True when all cue stacks are stopped',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => {
				return state.stacks.every((s) => s.playbackState === 'stopped')
			},
		},

		playback_paused: {
			type: 'boolean',
			name: 'Any Cue Stack Paused',
			description: 'True when any cue stack is paused',
			defaultStyle: {
				bgcolor: combineRgb(255, 165, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [],
			callback: () => {
				return state.stacks.some((s) => s.playbackState === 'paused')
			},
		},

		// ========== Per-Stack Feedbacks ==========
		stack_focused: {
			type: 'boolean',
			name: 'Cue Stack Focused',
			description: 'True when specified cue stack is the focused stack',
			defaultStyle: {
				bgcolor: combineRgb(0, 255, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					type: 'dropdown',
					id: 'stack',
					label: 'Cue Stack',
					choices: stackChoices,
					default: stackChoices[0]?.id || '',
				},
			],
			callback: (feedback) => {
				return state.focusedStack === feedback.options.stack
			},
		},

		stack_playing: {
			type: 'boolean',
			name: 'Cue Stack Playing',
			description: 'True when specified cue stack is playing',
			defaultStyle: {
				bgcolor: combineRgb(0, 255, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					type: 'dropdown',
					id: 'stack',
					label: 'Cue Stack',
					choices: stackChoices,
					default: stackChoices[0]?.id || '',
				},
			],
			callback: (feedback) => {
				const stack = state.stacks.find((s) => s.name === feedback.options.stack)
				return stack?.playbackState === 'playing'
			},
		},

		stack_stopped: {
			type: 'boolean',
			name: 'Cue Stack Stopped',
			description: 'True when specified cue stack is stopped',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [
				{
					type: 'dropdown',
					id: 'stack',
					label: 'Cue Stack',
					choices: stackChoices,
					default: stackChoices[0]?.id || '',
				},
			],
			callback: (feedback) => {
				const stack = state.stacks.find((s) => s.name === feedback.options.stack)
				return stack?.playbackState === 'stopped'
			},
		},

		stack_paused: {
			type: 'boolean',
			name: 'Cue Stack Paused',
			description: 'True when specified cue stack is paused',
			defaultStyle: {
				bgcolor: combineRgb(255, 165, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					type: 'dropdown',
					id: 'stack',
					label: 'Cue Stack',
					choices: stackChoices,
					default: stackChoices[0]?.id || '',
				},
			],
			callback: (feedback) => {
				const stack = state.stacks.find((s) => s.name === feedback.options.stack)
				return stack?.playbackState === 'paused'
			},
		},

		// ========== Cue Stack Focus Lock ==========
		transport_locked: {
			type: 'boolean',
			name: 'Cue Stack Focus Locked',
			description: 'True when focus is locked to a cue stack',
			defaultStyle: {
				bgcolor: combineRgb(255, 136, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => {
				return state.transportMode === 'locked'
			},
		},

		// ========== System ==========
		server_connected: {
			type: 'boolean',
			name: 'Server Connected',
			description: 'True when connected to EventSync server',
			defaultStyle: {
				bgcolor: combineRgb(0, 255, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [],
			callback: () => {
				return instance.getIsConnected()
			},
		},

		license_warning: {
			type: 'boolean',
			name: 'License Warning (>90%)',
			description: 'True when more than 90% of licenses are in use',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => {
				if (state.licensesAvailable === 0) return false
				return state.licensesUsed / state.licensesAvailable > 0.9
			},
		},

		transcode_queue_not_empty: {
			type: 'boolean',
			name: 'Transcode Queue Not Empty',
			description: 'True when there are items in the transcode queue',
			defaultStyle: {
				bgcolor: combineRgb(255, 165, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [],
			callback: () => {
				return state.transcodeQueue > 0
			},
		},
	}
}
