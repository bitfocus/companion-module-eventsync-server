import { CompanionVariableDefinition, InstanceBase } from '@companion-module/base'
import { EventSyncState } from './state.js'
import type { EventSyncConfig } from './config.js'

export function getVariables(state: EventSyncState): CompanionVariableDefinition[] {
	const variables: CompanionVariableDefinition[] = [
		// Global
		{ variableId: 'playback_state', name: 'Playback State' },
		{ variableId: 'focused_stack', name: 'Focused Stack' },
		{ variableId: 'transport_mode', name: 'Transport Mode' },

		// System
		{ variableId: 'licenses_used', name: 'Licenses Used' },
		{ variableId: 'licenses_available', name: 'Licenses Available' },
		{ variableId: 'licenses_display', name: 'Licenses (Used/Available)' },
		{ variableId: 'connected_devices', name: 'Connected Devices' },
		{ variableId: 'transcode_queue', name: 'Transcode Queue' },
		{ variableId: 'server_status', name: 'Server Status' },
	]

	// Per-stack variables
	for (const stack of state.stacks) {
		const prefix = `stack_${sanitizeVariableName(stack.name)}`
		variables.push(
			{ variableId: `${prefix}_current_cue`, name: `${stack.name} Current Cue` },
			{ variableId: `${prefix}_next_cue`, name: `${stack.name} Next Cue` },
			{ variableId: `${prefix}_time_remaining`, name: `${stack.name} Time Remaining` },
			{ variableId: `${prefix}_time_remaining_s`, name: `${stack.name} Time Remaining (seconds)` },
			{ variableId: `${prefix}_playback_state`, name: `${stack.name} Playback State` }
		)
	}

	return variables
}

export function updateVariables(instance: InstanceBase<EventSyncConfig>, state: EventSyncState): void {
	const values: { [key: string]: string | number | undefined } = {
		// Global
		playback_state: getGlobalPlaybackState(state),
		focused_stack: state.focusedStack || '',
		transport_mode: state.transportMode === 'locked' ? `locked: ${state.transportTarget}` : 'following',

		// System
		licenses_used: state.licensesUsed,
		licenses_available: state.licensesAvailable,
		licenses_display: `${state.licensesUsed}/${state.licensesAvailable}`,
		connected_devices: state.connectedDevices,
		transcode_queue: state.transcodeQueue,
		server_status: state.serverStatus,
	}

	// Per-stack variables
	for (const stack of state.stacks) {
		const prefix = `stack_${sanitizeVariableName(stack.name)}`
		values[`${prefix}_current_cue`] = stack.currentCue || ''
		values[`${prefix}_next_cue`] = stack.nextCue || ''
		values[`${prefix}_time_remaining`] = formatTime(stack.timeRemaining)
		values[`${prefix}_time_remaining_s`] = stack.timeRemaining || 0
		values[`${prefix}_playback_state`] = stack.playbackState
	}

	instance.setVariableValues(values)
}

function getGlobalPlaybackState(state: EventSyncState): string {
	if (state.stacks.some((s) => s.playbackState === 'playing')) {
		return 'playing'
	}
	if (state.stacks.some((s) => s.playbackState === 'paused')) {
		return 'paused'
	}
	return 'stopped'
}

function formatTime(seconds: number | null): string {
	if (seconds === null) return '--:--'

	const mins = Math.floor(seconds / 60)
	const secs = Math.floor(seconds % 60)
	return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

function sanitizeVariableName(name: string): string {
	// Replace spaces and special characters with underscores
	return name.replace(/[^a-zA-Z0-9]/g, '_')
}
