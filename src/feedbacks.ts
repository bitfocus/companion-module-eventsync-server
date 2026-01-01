import { CompanionFeedbackDefinitions, combineRgb } from '@companion-module/base'
import type { EventSyncModule } from './main.js'
import { EventSyncState } from './state.js'

export function getFeedbacks(instance: EventSyncModule, state: EventSyncState): CompanionFeedbackDefinitions {
	const stackChoices = state.getStackChoices()

	return {
		playback_playing: {
			type: 'boolean',
			name: 'Playback Playing',
			description: 'True when any stack is playing',
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
			name: 'Playback Stopped',
			description: 'True when all stacks are stopped',
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
			name: 'Playback Paused',
			description: 'True when any stack is paused',
			defaultStyle: {
				bgcolor: combineRgb(255, 165, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [],
			callback: () => {
				return state.stacks.some((s) => s.playbackState === 'paused')
			},
		},

		transport_locked: {
			type: 'boolean',
			name: 'Transport Locked',
			description: 'True when transport is locked to a stack',
			defaultStyle: {
				bgcolor: combineRgb(255, 136, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => {
				return state.transportMode === 'locked'
			},
		},

		stack_focused: {
			type: 'boolean',
			name: 'Stack Focused',
			description: 'True when specified stack is the focused stack',
			defaultStyle: {
				bgcolor: combineRgb(0, 255, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					type: 'dropdown',
					id: 'stack',
					label: 'Stack',
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
			name: 'Stack Playing',
			description: 'True when specified stack is playing',
			defaultStyle: {
				bgcolor: combineRgb(0, 255, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					type: 'dropdown',
					id: 'stack',
					label: 'Stack',
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
			name: 'Stack Stopped',
			description: 'True when specified stack is stopped',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [
				{
					type: 'dropdown',
					id: 'stack',
					label: 'Stack',
					choices: stackChoices,
					default: stackChoices[0]?.id || '',
				},
			],
			callback: (feedback) => {
				const stack = state.stacks.find((s) => s.name === feedback.options.stack)
				return stack?.playbackState === 'stopped'
			},
		},

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
				return state.serverStatus === 'online'
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
