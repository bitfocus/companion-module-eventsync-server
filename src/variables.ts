import { CompanionVariableDefinition, InstanceBase } from '@companion-module/base'
import { EventSyncState } from './state.js'
import type { EventSyncConfig } from './config.js'

export function getVariables(state: EventSyncState): CompanionVariableDefinition[] {
	const variables: CompanionVariableDefinition[] = [
		// Global
		{ variableId: 'playback_state', name: 'Playback State' },
		{ variableId: 'focused_stack', name: 'Focused Stack' },
		{ variableId: 'transport_mode', name: 'Transport Mode' },

		// Focus (currently focused/locked stack)
		{ variableId: 'focus_current_cue', name: 'Focus: Running Cue' },
		{ variableId: 'focus_current_cue_index', name: 'Focus: Running Cue Index' },
		{ variableId: 'focus_standby_cue', name: 'Focus: Standby Cue' },
		{ variableId: 'focus_standby_index', name: 'Focus: Standby Index' },
		{ variableId: 'focus_next_cue', name: 'Focus: Next Cue' },
		{ variableId: 'focus_video_time', name: 'Focus: Video Time Remaining' },
		{ variableId: 'focus_video_time_s', name: 'Focus: Video Time Remaining (seconds)' },
		{ variableId: 'focus_wait_time', name: 'Focus: Wait Time Remaining' },
		{ variableId: 'focus_wait_time_s', name: 'Focus: Wait Time Remaining (seconds)' },
		{ variableId: 'focus_playback_state', name: 'Focus: Playback State' },

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
			{ variableId: `${prefix}_current_cue`, name: `${stack.name} Running Cue` },
			{ variableId: `${prefix}_current_cue_index`, name: `${stack.name} Running Cue Index` },
			{ variableId: `${prefix}_standby_cue`, name: `${stack.name} Standby Cue` },
			{ variableId: `${prefix}_standby_index`, name: `${stack.name} Standby Index` },
			{ variableId: `${prefix}_next_cue`, name: `${stack.name} Next Cue` },
			{ variableId: `${prefix}_video_time`, name: `${stack.name} Video Time Remaining` },
			{ variableId: `${prefix}_video_time_s`, name: `${stack.name} Video Time Remaining (seconds)` },
			{ variableId: `${prefix}_wait_time`, name: `${stack.name} Wait Time Remaining` },
			{ variableId: `${prefix}_wait_time_s`, name: `${stack.name} Wait Time Remaining (seconds)` },
			{ variableId: `${prefix}_playback_state`, name: `${stack.name} Playback State` },
		)
	}

	return variables
}

export function updateVariables(instance: InstanceBase<EventSyncConfig>, state: EventSyncState): void {
	// Get the focused stack (locked target takes priority, then focused, then first stack)
	const focusedStackName = state.transportTarget || state.focusedStack || state.stacks[0]?.name || null
	const focusedStack = focusedStackName ? state.stacks.find((s) => s.name === focusedStackName) : null

	const values: { [key: string]: string | number | undefined } = {
		// Global
		playback_state: getGlobalPlaybackState(state),
		focused_stack: focusedStackName || '',
		transport_mode: state.transportMode === 'locked' ? `locked: ${state.transportTarget}` : 'following',

		// Focus (currently focused/locked stack)
		focus_current_cue: focusedStack?.currentCue || '',
		focus_current_cue_index: focusedStack?.currentCueIndex || 0,
		focus_standby_cue: focusedStack?.standbyCue || '',
		focus_standby_index: focusedStack?.standbyIndex || 0,
		focus_next_cue: focusedStack?.nextCue || '',
		focus_video_time: formatTime(focusedStack?.videoTimeRemaining ?? null),
		focus_video_time_s: focusedStack?.videoTimeRemaining || 0,
		focus_wait_time: formatTime(focusedStack?.waitTimeRemaining ?? null),
		focus_wait_time_s: focusedStack?.waitTimeRemaining || 0,
		focus_playback_state: focusedStack?.playbackState || 'stopped',

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
		values[`${prefix}_current_cue_index`] = stack.currentCueIndex || 0
		values[`${prefix}_standby_cue`] = stack.standbyCue || ''
		values[`${prefix}_standby_index`] = stack.standbyIndex || 0
		values[`${prefix}_next_cue`] = stack.nextCue || ''
		values[`${prefix}_video_time`] = formatTime(stack.videoTimeRemaining)
		values[`${prefix}_video_time_s`] = stack.videoTimeRemaining || 0
		values[`${prefix}_wait_time`] = formatTime(stack.waitTimeRemaining)
		values[`${prefix}_wait_time_s`] = stack.waitTimeRemaining || 0
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

function formatTime(seconds: number | null | undefined): string {
	if (seconds === null || seconds === undefined) return '--:--'

	const mins = Math.floor(seconds / 60)
	const secs = Math.floor(seconds % 60)
	return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

function sanitizeVariableName(name: string): string {
	// Replace spaces and special characters with underscores
	return name.replace(/[^a-zA-Z0-9]/g, '_')
}
