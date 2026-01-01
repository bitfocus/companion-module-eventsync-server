import { SomeCompanionConfigField } from '@companion-module/base'

export interface EventSyncConfig {
	host: string
	port: number
	passcode: string
}

export function getConfigFields(): SomeCompanionConfigField[] {
	return [
		{
			type: 'textinput',
			id: 'host',
			label: 'Server IP',
			width: 8,
			default: '',
			tooltip: 'The IP address shown in EventSync Dashboard > Settings > Show Control',
		},
		{
			type: 'number',
			id: 'port',
			label: 'Port',
			width: 4,
			default: 8001,
			min: 1,
			max: 65535,
		},
		{
			type: 'textinput',
			id: 'passcode',
			label: 'Passcode',
			width: 12,
			default: '',
			tooltip: 'The passcode configured in EventSync Dashboard > Settings > Show Control',
		},
	]
}
