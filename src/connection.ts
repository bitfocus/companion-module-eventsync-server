import { InstanceStatus } from '@companion-module/base'
import WebSocket from 'ws'
import { EventSyncState, ServerMessage, StateUpdateMessage } from './state.js'

type StateCallback = (state: EventSyncState) => void
type StatusCallback = (status: InstanceStatus) => void

const CONNECT_TIMEOUT_MS = 10000

export class EventSyncConnection {
	private ws: WebSocket | null = null
	private reconnectTimer: ReturnType<typeof setTimeout> | null = null
	private pingInterval: ReturnType<typeof setInterval> | null = null
	private connectTimeout: ReturnType<typeof setTimeout> | null = null
	private shouldReconnect: boolean = true

	constructor(
		private host: string,
		private port: number,
		private passcode: string,
		private onState: StateCallback,
		private onStatus: StatusCallback,
	) {}

	connect(): void {
		this.shouldReconnect = true
		this.onStatus(InstanceStatus.Connecting)

		const url = `ws://${this.host}:${this.port}/control`
		console.log(`EventSync: Connecting to ${url}`)

		try {
			const ws = new WebSocket(url)
			this.ws = ws

			this.connectTimeout = setTimeout(() => {
				if (ws.readyState === WebSocket.CONNECTING) {
					console.error(`EventSync: Connection attempt timed out after ${CONNECT_TIMEOUT_MS}ms`)
					this.onStatus(InstanceStatus.ConnectionFailure)
					ws.terminate()
				}
			}, CONNECT_TIMEOUT_MS)

			ws.on('open', () => {
				this.clearConnectTimeout()
				console.log('EventSync: WebSocket connected, sending authentication')
				// Send authentication
				this.send({ type: 'authenticate', passcode: this.passcode })
				// Start ping interval
				this.startPing()
			})

			ws.on('message', (data: WebSocket.RawData) => {
				try {
					const text = data instanceof ArrayBuffer ? Buffer.from(data).toString('utf-8') : data.toString('utf-8')
					const message = JSON.parse(text) as ServerMessage
					this.handleMessage(message)
				} catch (e) {
					console.error('Failed to parse message:', e)
				}
			})

			ws.on('close', () => {
				console.log('EventSync: WebSocket closed')
				this.clearConnectTimeout()
				this.onStatus(InstanceStatus.Disconnected)
				this.stopPing()
				this.scheduleReconnect()
			})

			ws.on('error', (err: Error) => {
				console.error('EventSync: WebSocket error:', err.message)
				this.onStatus(InstanceStatus.ConnectionFailure)
			})
		} catch (err) {
			console.error('Failed to create WebSocket:', err)
			this.onStatus(InstanceStatus.ConnectionFailure)
			this.scheduleReconnect()
		}
	}

	private clearConnectTimeout(): void {
		if (this.connectTimeout) {
			clearTimeout(this.connectTimeout)
			this.connectTimeout = null
		}
	}

	disconnect(permanent: boolean = false): void {
		if (permanent) this.shouldReconnect = false
		if (this.reconnectTimer) {
			clearTimeout(this.reconnectTimer)
			this.reconnectTimer = null
		}
		this.clearConnectTimeout()
		this.stopPing()
		if (this.ws) {
			this.ws.removeAllListeners()
			this.ws.close()
		}
		this.ws = null
	}

	send(message: object): void {
		if (this.ws?.readyState === WebSocket.OPEN) {
			this.ws.send(JSON.stringify(message))
		} else {
			console.warn('EventSync: send() called while socket is not open; message dropped:', message)
		}
	}

	private handleMessage(message: ServerMessage): void {
		switch (message.type) {
			case 'authSuccess':
				this.onStatus(InstanceStatus.Ok)
				break

			case 'authFailed':
				this.onStatus(InstanceStatus.BadConfig)
				this.disconnect(true)
				break

			case 'stateUpdate': {
				const stateMessage = message as unknown as StateUpdateMessage
				const state = EventSyncState.fromJSON(stateMessage)
				this.onState(state)
				break
			}

			case 'pong':
				// Keep-alive response received
				break
		}
	}

	private scheduleReconnect(): void {
		if (!this.shouldReconnect || this.reconnectTimer) return

		this.reconnectTimer = setTimeout(() => {
			this.reconnectTimer = null
			this.connect()
		}, 5000)
	}

	private startPing(): void {
		if (this.pingInterval) return
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
