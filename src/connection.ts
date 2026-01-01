import { InstanceStatus } from '@companion-module/base'
import { EventSyncState, ServerMessage, StateUpdateMessage } from './state.js'

type StateCallback = (state: EventSyncState) => void
type StatusCallback = (status: InstanceStatus) => void

export class EventSyncConnection {
	private ws: WebSocket | null = null
	private reconnectTimer: ReturnType<typeof setTimeout> | null = null
	private pingInterval: ReturnType<typeof setInterval> | null = null

	constructor(
		private host: string,
		private port: number,
		private passcode: string,
		private onState: StateCallback,
		private onStatus: StatusCallback
	) {}

	connect(): void {
		this.onStatus(InstanceStatus.Connecting)

		const url = `ws://${this.host}:${this.port}/control`

		try {
			this.ws = new WebSocket(url)

			this.ws.onopen = () => {
				// Send authentication
				this.send({ type: 'authenticate', passcode: this.passcode })
				// Start ping interval
				this.startPing()
			}

			this.ws.onmessage = (event: MessageEvent) => {
				try {
					const message = JSON.parse(String(event.data)) as ServerMessage
					this.handleMessage(message)
				} catch (e) {
					console.error('Failed to parse message:', e)
				}
			}

			this.ws.onclose = () => {
				this.onStatus(InstanceStatus.Disconnected)
				this.stopPing()
				this.scheduleReconnect()
			}

			this.ws.onerror = (err) => {
				console.error('WebSocket error:', err)
				this.onStatus(InstanceStatus.ConnectionFailure)
			}
		} catch (err) {
			console.error('Failed to create WebSocket:', err)
			this.onStatus(InstanceStatus.ConnectionFailure)
			this.scheduleReconnect()
		}
	}

	disconnect(): void {
		if (this.reconnectTimer) {
			clearTimeout(this.reconnectTimer)
			this.reconnectTimer = null
		}
		this.stopPing()
		this.ws?.close()
		this.ws = null
	}

	send(message: object): void {
		if (this.ws?.readyState === WebSocket.OPEN) {
			this.ws.send(JSON.stringify(message))
		}
	}

	private handleMessage(message: ServerMessage): void {
		switch (message.type) {
			case 'authSuccess':
				this.onStatus(InstanceStatus.Ok)
				break

			case 'authFailed':
				this.onStatus(InstanceStatus.BadConfig)
				this.disconnect()
				break

			case 'stateUpdate':
				const state = EventSyncState.fromJSON(message as StateUpdateMessage)
				this.onState(state)
				break

			case 'pong':
				// Keep-alive response received
				break
		}
	}

	private scheduleReconnect(): void {
		if (this.reconnectTimer) return

		this.reconnectTimer = setTimeout(() => {
			this.reconnectTimer = null
			this.connect()
		}, 5000)
	}

	private startPing(): void {
		this.pingInterval = setInterval(() => {
			this.send({ type: 'ping' })
		}, 30000)
	}

	private stopPing(): void {
		if (this.pingInterval) {
			clearInterval(this.pingInterval)
			this.pingInterval = null
		}
	}

	// Command methods - Global
	globalGo(): void {
		this.send({ type: 'globalGo' })
	}
	globalStop(): void {
		this.send({ type: 'globalStop' })
	}
	globalPause(): void {
		this.send({ type: 'globalPause' })
	}
	globalResume(): void {
		this.send({ type: 'globalResume' })
	}
	globalNext(): void {
		this.send({ type: 'globalNext' })
	}
	globalPrevious(): void {
		this.send({ type: 'globalPrevious' })
	}
	globalFire(position: number): void {
		this.send({ type: 'globalFire', position })
	}
	globalFireContentOSC(id: number): void {
		this.send({ type: 'globalFireContentOSC', id })
	}

	// Command methods - Stack specific
	stackGo(stack: string): void {
		this.send({ type: 'stackGo', stack })
	}
	stackStop(stack: string): void {
		this.send({ type: 'stackStop', stack })
	}
	stackPause(stack: string): void {
		this.send({ type: 'stackPause', stack })
	}
	stackResume(stack: string): void {
		this.send({ type: 'stackResume', stack })
	}
	stackNext(stack: string): void {
		this.send({ type: 'stackNext', stack })
	}
	stackPrevious(stack: string): void {
		this.send({ type: 'stackPrevious', stack })
	}
	stackFire(stack: string, position: number): void {
		this.send({ type: 'stackFire', stack, position })
	}
	stackFireContentOSC(stack: string, id: number): void {
		this.send({ type: 'stackFireContentOSC', stack, id })
	}

	// Command methods - Focus (currently focused stack)
	focusGo(): void {
		this.send({ type: 'focusGo' })
	}
	focusStop(): void {
		this.send({ type: 'focusStop' })
	}
	focusPause(): void {
		this.send({ type: 'focusPause' })
	}
	focusResume(): void {
		this.send({ type: 'focusResume' })
	}
	focusNext(): void {
		this.send({ type: 'focusNext' })
	}
	focusPrevious(): void {
		this.send({ type: 'focusPrevious' })
	}
	focusFire(position: number): void {
		this.send({ type: 'focusFire', position })
	}
	focusFireContentOSC(id: number): void {
		this.send({ type: 'focusFireContentOSC', id })
	}

	// Transport
	lockTransport(stack: string): void {
		this.send({ type: 'lockTransport', stack })
	}
	unlockTransport(): void {
		this.send({ type: 'unlockTransport' })
	}
	selectStack(stack: string): void {
		this.send({ type: 'selectStack', stack })
	}

	// Modules
	moduleEnable(module: string): void {
		this.send({ type: 'moduleEnable', module })
	}
	moduleDisable(module: string): void {
		this.send({ type: 'moduleDisable', module })
	}
	modulePage(module: string, page: string): void {
		this.send({ type: 'modulePage', module, page })
	}

	// System settings
	setTranscodeLimit(count: number): void {
		this.send({ type: 'setTranscodeLimit', count })
	}
	setWaveSize(count: number): void {
		this.send({ type: 'setWaveSize', count })
	}
	setGlobalBuffer(ms: number): void {
		this.send({ type: 'setGlobalBuffer', ms })
	}
	setAutoDistribute(enabled: boolean): void {
		this.send({ type: 'setAutoDistribute', enabled })
	}
	setOperatorMenu(enabled: boolean, passcode: boolean): void {
		this.send({ type: 'setOperatorMenu', enabled, passcode })
	}
}
