import { InstanceBase, runEntrypoint, InstanceStatus, SomeCompanionConfigField } from '@companion-module/base'
import { getConfigFields, EventSyncConfig } from './config.js'
import { getActions } from './actions.js'
import { getFeedbacks } from './feedbacks.js'
import { getVariables, updateVariables } from './variables.js'
import { getPresets } from './presets.js'
import { EventSyncConnection } from './connection.js'
import { EventSyncState } from './state.js'

export class EventSyncModule extends InstanceBase<EventSyncConfig> {
	private connection: EventSyncConnection | null = null
	private state: EventSyncState = new EventSyncState()
	private config: EventSyncConfig = { host: '', port: 8001, passcode: '' }

	async init(config: EventSyncConfig): Promise<void> {
		this.config = config
		this.updateStatus(InstanceStatus.Disconnected)
		await this.configUpdated(config)
	}

	async configUpdated(config: EventSyncConfig): Promise<void> {
		this.config = config

		// Close existing connection
		this.connection?.disconnect()
		this.connection = null

		// Reset state
		this.state = new EventSyncState()

		// Update definitions
		this.setActionDefinitions(getActions(this, this.state))
		this.setFeedbackDefinitions(getFeedbacks(this, this.state))
		this.setVariableDefinitions(getVariables(this.state))
		this.setPresetDefinitions(getPresets())

		// Initialize variable values
		updateVariables(this, this.state)

		// Connect if configured
		if (config.host && config.port && config.passcode) {
			this.connection = new EventSyncConnection(
				config.host,
				config.port,
				config.passcode,
				(state) => this.onStateUpdate(state),
				(status) => this.updateStatus(status)
			)
			this.connection.connect()
		} else {
			this.updateStatus(InstanceStatus.BadConfig)
		}
	}

	private onStateUpdate(newState: EventSyncState): void {
		const previousStackCount = this.state.stacks.length
		this.state = newState

		// Only rebuild definitions if stack/module count changed (avoids UI flicker)
		if (newState.stacks.length !== previousStackCount) {
			this.setActionDefinitions(getActions(this, this.state))
			this.setFeedbackDefinitions(getFeedbacks(this, this.state))
			this.setVariableDefinitions(getVariables(this.state))
		}

		// Update variable values
		updateVariables(this, this.state)

		// Trigger feedback checks
		this.checkFeedbacks()
	}

	getConfigFields(): SomeCompanionConfigField[] {
		return getConfigFields()
	}

	async destroy(): Promise<void> {
		this.connection?.disconnect()
		this.connection = null
	}

	// Expose connection for actions
	getConnection(): EventSyncConnection | null {
		return this.connection
	}

	// Expose state for feedbacks
	getState(): EventSyncState {
		return this.state
	}
}

runEntrypoint(EventSyncModule, [])
