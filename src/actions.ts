import { CompanionActionDefinitions, CompanionActionEvent, DropdownChoice } from '@companion-module/base'
import type { EventSyncModule } from './main.js'
import { EventSyncState } from './state.js'

export function getActions(instance: EventSyncModule, state: EventSyncState): CompanionActionDefinitions {
	const stackChoices: DropdownChoice[] = state.getStackChoices()
	const contentOSCChoices: DropdownChoice[] = state.getContentOSCChoices()
	const moduleChoices: DropdownChoice[] = state.getModuleChoices()

	// Resolve a dropdown option against the current choices. If the value is missing
	// or no longer present (e.g. configured before any state was received from the
	// server, or stack was deleted), log a warning and return null so the caller
	// can skip the send.
	const resolveChoice = (label: string, value: unknown, choices: DropdownChoice[]): string | null => {
		const stringValue = typeof value === 'string' || typeof value === 'number' ? String(value) : ''
		if (!stringValue) {
			instance.log('warn', `${label} action has no ${label.toLowerCase()} selected; ignoring`)
			return null
		}
		if (!choices.some((c) => String(c.id) === stringValue)) {
			instance.log('warn', `${label} "${stringValue}" is not currently known to the server; ignoring action`)
			return null
		}
		return stringValue
	}

	return {
		// ========== Global Cue Control ==========
		global_go: {
			name: 'Global Go',
			description: 'Fire next cue on all stacks',
			options: [],
			callback: async () => {
				instance.getConnection()?.globalGo()
			},
		},
		global_stop: {
			name: 'Global Stop',
			description: 'Stop playback on all stacks',
			options: [],
			callback: async () => {
				instance.getConnection()?.globalStop()
			},
		},
		global_pause: {
			name: 'Global Pause',
			description: 'Pause playback on all stacks',
			options: [],
			callback: async () => {
				instance.getConnection()?.globalPause()
			},
		},
		global_resume: {
			name: 'Global Resume',
			description: 'Resume playback on all stacks',
			options: [],
			callback: async () => {
				instance.getConnection()?.globalResume()
			},
		},
		global_next: {
			name: 'Global Next',
			description: 'Select next cue on all stacks (without firing)',
			options: [],
			callback: async () => {
				instance.getConnection()?.globalNext()
			},
		},
		global_previous: {
			name: 'Global Previous',
			description: 'Select previous cue on all stacks (without firing)',
			options: [],
			callback: async () => {
				instance.getConnection()?.globalPrevious()
			},
		},
		global_fire: {
			name: 'Global Go Cue Number',
			description: 'Go to cue number on all stacks',
			options: [
				{
					type: 'number',
					id: 'position',
					label: 'Cue Number',
					default: 1,
					min: 1,
					max: 999,
				},
			],
			callback: async (action: CompanionActionEvent) => {
				const position = Number(action.options.position)
				instance.getConnection()?.globalFire(position)
			},
		},
		global_fire_contentosc: {
			name: 'Global Fire ContentOSC',
			description: 'Fire cue by ContentOSC ID (static addressing)',
			options: [
				{
					type: 'dropdown',
					id: 'id',
					label: 'Cue',
					choices: contentOSCChoices,
					default: contentOSCChoices[0]?.id || '',
				},
			],
			callback: async (action: CompanionActionEvent) => {
				const resolved = resolveChoice('Cue', action.options.id, contentOSCChoices)
				if (resolved === null) return
				instance.getConnection()?.globalFireContentOSC(Number(resolved))
			},
		},
		global_fire_contentosc_manual: {
			name: 'Global Fire ContentOSC (Manual)',
			description: 'Fire cue by ContentOSC ID (manual entry)',
			options: [
				{
					type: 'number',
					id: 'id',
					label: 'ContentOSC ID',
					default: 1000,
					min: 1000,
					max: 9999,
				},
			],
			callback: async (action: CompanionActionEvent) => {
				const id = Number(action.options.id)
				instance.getConnection()?.globalFireContentOSC(id)
			},
		},

		// ========== Cue Stack Control ==========
		stack_go: {
			name: 'Cue Stack Go',
			description: 'Fire next cue on specific cue stack',
			options: [
				{
					type: 'dropdown',
					id: 'stack',
					label: 'Stack',
					choices: stackChoices,
					default: stackChoices[0]?.id || '',
				},
			],
			callback: async (action: CompanionActionEvent) => {
				const stack = resolveChoice('Stack', action.options.stack, stackChoices)
				if (stack === null) return
				instance.getConnection()?.stackGo(stack)
			},
		},
		stack_stop: {
			name: 'Cue Stack Stop',
			description: 'Stop playback on specific cue stack',
			options: [
				{
					type: 'dropdown',
					id: 'stack',
					label: 'Stack',
					choices: stackChoices,
					default: stackChoices[0]?.id || '',
				},
			],
			callback: async (action: CompanionActionEvent) => {
				const stack = resolveChoice('Stack', action.options.stack, stackChoices)
				if (stack === null) return
				instance.getConnection()?.stackStop(stack)
			},
		},
		stack_pause: {
			name: 'Cue Stack Pause',
			description: 'Pause playback on specific cue stack',
			options: [
				{
					type: 'dropdown',
					id: 'stack',
					label: 'Stack',
					choices: stackChoices,
					default: stackChoices[0]?.id || '',
				},
			],
			callback: async (action: CompanionActionEvent) => {
				const stack = resolveChoice('Stack', action.options.stack, stackChoices)
				if (stack === null) return
				instance.getConnection()?.stackPause(stack)
			},
		},
		stack_resume: {
			name: 'Cue Stack Resume',
			description: 'Resume playback on specific cue stack',
			options: [
				{
					type: 'dropdown',
					id: 'stack',
					label: 'Stack',
					choices: stackChoices,
					default: stackChoices[0]?.id || '',
				},
			],
			callback: async (action: CompanionActionEvent) => {
				const stack = resolveChoice('Stack', action.options.stack, stackChoices)
				if (stack === null) return
				instance.getConnection()?.stackResume(stack)
			},
		},
		stack_next: {
			name: 'Cue Stack Next',
			description: 'Select next cue on specific cue stack',
			options: [
				{
					type: 'dropdown',
					id: 'stack',
					label: 'Stack',
					choices: stackChoices,
					default: stackChoices[0]?.id || '',
				},
			],
			callback: async (action: CompanionActionEvent) => {
				const stack = resolveChoice('Stack', action.options.stack, stackChoices)
				if (stack === null) return
				instance.getConnection()?.stackNext(stack)
			},
		},
		stack_previous: {
			name: 'Cue Stack Previous',
			description: 'Select previous cue on specific cue stack',
			options: [
				{
					type: 'dropdown',
					id: 'stack',
					label: 'Stack',
					choices: stackChoices,
					default: stackChoices[0]?.id || '',
				},
			],
			callback: async (action: CompanionActionEvent) => {
				const stack = resolveChoice('Stack', action.options.stack, stackChoices)
				if (stack === null) return
				instance.getConnection()?.stackPrevious(stack)
			},
		},
		stack_fire: {
			name: 'Cue Stack Go Cue Number',
			description: 'Go to cue number on specific cue stack',
			options: [
				{
					type: 'dropdown',
					id: 'stack',
					label: 'Stack',
					choices: stackChoices,
					default: stackChoices[0]?.id || '',
				},
				{
					type: 'number',
					id: 'position',
					label: 'Cue Number',
					default: 1,
					min: 1,
					max: 999,
				},
			],
			callback: async (action: CompanionActionEvent) => {
				const stack = resolveChoice('Stack', action.options.stack, stackChoices)
				if (stack === null) return
				const position = Number(action.options.position)
				instance.getConnection()?.stackFire(stack, position)
			},
		},

		// ========== Focus Cue Control ==========
		focus_go: {
			name: 'Focus Go',
			description: 'Fire next cue on currently focused stack',
			options: [],
			callback: async () => {
				instance.getConnection()?.focusGo()
			},
		},
		focus_stop: {
			name: 'Focus Stop',
			description: 'Stop playback on currently focused stack',
			options: [],
			callback: async () => {
				instance.getConnection()?.focusStop()
			},
		},
		focus_pause: {
			name: 'Focus Pause',
			description: 'Pause playback on currently focused stack',
			options: [],
			callback: async () => {
				instance.getConnection()?.focusPause()
			},
		},
		focus_resume: {
			name: 'Focus Resume',
			description: 'Resume playback on currently focused stack',
			options: [],
			callback: async () => {
				instance.getConnection()?.focusResume()
			},
		},
		focus_next: {
			name: 'Focus Next',
			description: 'Select next cue on currently focused stack',
			options: [],
			callback: async () => {
				instance.getConnection()?.focusNext()
			},
		},
		focus_previous: {
			name: 'Focus Previous',
			description: 'Select previous cue on currently focused stack',
			options: [],
			callback: async () => {
				instance.getConnection()?.focusPrevious()
			},
		},
		focus_fire: {
			name: 'Focus Go Cue Number',
			description: 'Go to cue number on currently focused stack',
			options: [
				{
					type: 'number',
					id: 'position',
					label: 'Cue Number',
					default: 1,
					min: 1,
					max: 999,
				},
			],
			callback: async (action: CompanionActionEvent) => {
				const position = Number(action.options.position)
				instance.getConnection()?.focusFire(position)
			},
		},

		// ========== Cue Stack Focus Lock ==========
		lock_transport: {
			name: 'Cue Stack Focus Lock',
			description: 'Lock focus controls to a specific cue stack',
			options: [
				{
					type: 'dropdown',
					id: 'stack',
					label: 'Stack',
					choices: stackChoices,
					default: stackChoices[0]?.id || '',
				},
			],
			callback: async (action: CompanionActionEvent) => {
				const stack = resolveChoice('Stack', action.options.stack, stackChoices)
				if (stack === null) return
				instance.getConnection()?.lockTransport(stack)
			},
		},
		unlock_transport: {
			name: 'Cue Stack Focus Unlock',
			description: 'Unlock focus to follow selected cue stack',
			options: [],
			callback: async () => {
				instance.getConnection()?.unlockTransport()
			},
		},
		select_stack: {
			name: 'Select Cue Stack',
			description: 'Change the focused cue stack',
			options: [
				{
					type: 'dropdown',
					id: 'stack',
					label: 'Stack',
					choices: stackChoices,
					default: stackChoices[0]?.id || '',
				},
			],
			callback: async (action: CompanionActionEvent) => {
				const stack = resolveChoice('Stack', action.options.stack, stackChoices)
				if (stack === null) return
				instance.getConnection()?.selectStack(stack)
			},
		},

		// ========== Modules ==========
		module_enable: {
			name: 'Module Enable',
			description: 'Enable a module',
			options: [
				{
					type: 'dropdown',
					id: 'module',
					label: 'Module',
					choices: moduleChoices,
					default: moduleChoices[0]?.id || '',
				},
			],
			callback: async (action: CompanionActionEvent) => {
				const module = resolveChoice('Module', action.options.module, moduleChoices)
				if (module === null) return
				instance.getConnection()?.moduleEnable(module)
			},
		},
		module_disable: {
			name: 'Module Disable',
			description: 'Disable a module',
			options: [
				{
					type: 'dropdown',
					id: 'module',
					label: 'Module',
					choices: moduleChoices,
					default: moduleChoices[0]?.id || '',
				},
			],
			callback: async (action: CompanionActionEvent) => {
				const module = resolveChoice('Module', action.options.module, moduleChoices)
				if (module === null) return
				instance.getConnection()?.moduleDisable(module)
			},
		},
		// ========== System Settings ==========
		set_transcode_limit: {
			name: 'Set Transcode Limit',
			description: 'Set the maximum concurrent transcodes',
			options: [
				{
					type: 'number',
					id: 'count',
					label: 'Count',
					default: 2,
					min: 1,
					max: 10,
				},
			],
			callback: async (action: CompanionActionEvent) => {
				instance.getConnection()?.setTranscodeLimit(Number(action.options.count))
			},
		},
		set_wave_size: {
			name: 'Set Wave Size',
			description: 'Set the distribution wave size',
			options: [
				{
					type: 'number',
					id: 'count',
					label: 'Count',
					default: 10,
					min: 1,
					max: 100,
				},
			],
			callback: async (action: CompanionActionEvent) => {
				instance.getConnection()?.setWaveSize(Number(action.options.count))
			},
		},
		set_global_buffer: {
			name: 'Set Global Buffer',
			description: 'Set the global sync buffer in milliseconds',
			options: [
				{
					type: 'number',
					id: 'ms',
					label: 'Milliseconds',
					default: 0,
					min: -1000,
					max: 1000,
				},
			],
			callback: async (action: CompanionActionEvent) => {
				instance.getConnection()?.setGlobalBuffer(Number(action.options.ms))
			},
		},
		set_auto_distribute: {
			name: 'Set Auto-Distribute',
			description: 'Enable or disable automatic content distribution',
			options: [
				{
					type: 'checkbox',
					id: 'enabled',
					label: 'Enabled',
					default: false,
				},
			],
			callback: async (action: CompanionActionEvent) => {
				instance.getConnection()?.setAutoDistribute(Boolean(action.options.enabled))
			},
		},
	}
}
