export interface StackInfo {
	name: string
	currentCue: string | null
	nextCue: string | null
	timeRemaining: number | null
	playbackState: 'playing' | 'stopped' | 'paused'
	cues: CueInfo[]
}

export interface CueInfo {
	position: number
	name: string
	contentOSC: number
	type: string
}

export interface ModuleInfo {
	name: string
	enabled: boolean
}

export class EventSyncState {
	stacks: StackInfo[] = []
	modules: ModuleInfo[] = []
	licensesUsed: number = 0
	licensesAvailable: number = 0
	connectedDevices: number = 0
	transcodeQueue: number = 0
	serverStatus: string = 'offline'
	transportMode: 'locked' | 'following' = 'following'
	transportTarget: string | null = null
	focusedStack: string | null = null

	static fromJSON(json: StateUpdateMessage): EventSyncState {
		const state = new EventSyncState()

		state.stacks = json.stacks || []
		state.modules = json.modules || []
		state.licensesUsed = json.system?.licensesUsed || 0
		state.licensesAvailable = json.system?.licensesAvailable || 0
		state.connectedDevices = json.system?.connectedDevices || 0
		state.transcodeQueue = json.system?.transcodeQueue || 0
		state.serverStatus = json.system?.serverStatus || 'offline'
		state.transportMode = json.transport?.mode || 'following'
		state.transportTarget = json.transport?.target || null
		state.focusedStack = state.transportTarget

		return state
	}

	getStackChoices(): { id: string; label: string }[] {
		return this.stacks.map((s) => ({ id: s.name, label: s.name }))
	}

	getCueChoices(stackName: string): { id: string; label: string }[] {
		const stack = this.stacks.find((s) => s.name === stackName)
		if (!stack) return []

		return stack.cues.map((c) => ({
			id: String(c.position),
			label: `Q${c.position}: ${c.name}`,
		}))
	}

	getContentOSCChoices(): { id: string; label: string }[] {
		const choices: { id: string; label: string }[] = []

		for (const stack of this.stacks) {
			for (const cue of stack.cues) {
				choices.push({
					id: String(cue.contentOSC),
					label: `${cue.contentOSC}: ${cue.name}`,
				})
			}
		}

		return choices
	}

	getModuleChoices(): { id: string; label: string }[] {
		return this.modules.map((m) => ({ id: m.name, label: m.name }))
	}
}

// Message types from server
export interface StateUpdateMessage {
	type: 'stateUpdate'
	stacks: StackInfo[]
	modules: ModuleInfo[]
	system: {
		licensesUsed: number
		licensesAvailable: number
		connectedDevices: number
		transcodeQueue: number
		serverStatus: string
	}
	transport: {
		mode: 'locked' | 'following'
		target: string | null
	}
}

export interface ServerMessage {
	type: string
	[key: string]: unknown
}
