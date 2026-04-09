# EventSync Companion Module

Control EventSync from Bitfocus Companion and Stream Deck.

## Configuration

1. Enter the **Server IP** shown in EventSync Dashboard > Settings > Show Control
2. Enter the **Port** (default: 8001)
3. Enter the **Passcode** configured in EventSync

## Actions

### Cue Control

**Global** - Affects all cue stacks:

- Global Go/Stop/Pause/Resume/Next/Previous
- Global Fire Position (by cue position number)
- Global Fire ContentOSC (by static ID)

**Stack** - Affects a specific stack:

- Stack Go/Stop/Pause/Resume/Next/Previous
- Stack Fire Position

**Focus** - Affects the currently focused stack:

- Focus Go/Stop/Pause/Resume/Next/Previous
- Focus Fire Position

### Transport

- **Lock Transport** - Lock transport buttons to a specific stack
- **Unlock Transport** - Follow the focused stack
- **Select Stack** - Change the focused stack

### Modules

- Module Enable/Disable
- Module Page (Home/Results)

### System

- Set Transcode Limit
- Set Wave Size
- Set Global Buffer
- Set Auto-Distribute

## Variables

### Global

- `$(eventsync:playback_state)` - Current playback state (playing/paused/stopped)
- `$(eventsync:focused_stack)` - Currently focused stack name
- `$(eventsync:transport_mode)` - "locked: StackName" or "following"

### System

- `$(eventsync:licenses_used)` - Licenses in use
- `$(eventsync:licenses_available)` - Total licenses available
- `$(eventsync:licenses_display)` - Licenses as "used/available"
- `$(eventsync:connected_devices)` - Connected device count
- `$(eventsync:transcode_queue)` - Items in transcode queue
- `$(eventsync:server_status)` - "online" or "offline"

### Per-Stack Variables

Replace `StackName` with your actual stack name (spaces become underscores):

- `$(eventsync:stack_StackName_current_cue)`
- `$(eventsync:stack_StackName_next_cue)`
- `$(eventsync:stack_StackName_time_remaining)` - Formatted as MM:SS
- `$(eventsync:stack_StackName_time_remaining_s)` - Raw seconds
- `$(eventsync:stack_StackName_playback_state)`

## Feedbacks

- **Playback Playing** - True when any stack is playing
- **Playback Stopped** - True when all stacks are stopped
- **Playback Paused** - True when any stack is paused
- **Transport Locked** - True when transport is locked to a stack
- **Stack Focused** - True when specified stack is focused
- **Stack Playing** - True when specified stack is playing
- **Stack Stopped** - True when specified stack is stopped
- **Server Connected** - True when connected to EventSync
- **License Warning** - True when >90% of licenses are in use
- **Transcode Queue Not Empty** - True when transcoding is in progress

## ContentOSC

EventSync uses dual addressing for cues:

- **Position** (1-999): Cue position in stack, changes if cues are reordered
- **ContentOSC** (1000-9999): Static ID assigned at creation, never changes

Use ContentOSC for cues that may move around during show prep.
Use Position for sequences that run in order.

## Presets

Pre-configured button layouts are available in these categories:

- **Transport (Focus)** - GO, STOP, PAUSE, RESUME, PREV, NEXT
- **Transport (Global)** - GLOBAL GO, GLOBAL STOP
- **Cue Info** - Current cue, time remaining, focused stack, transport mode
- **System Status** - Devices, licenses, server status, transcode queue
- **Transport Lock** - Unlock transport

## Troubleshooting

### Connection Issues

1. Verify the Server IP is correct (check Dashboard > Settings > Show Control)
2. Ensure Companion is enabled in EventSync settings
3. Check the passcode matches exactly
4. Verify the EventSync server is running

### Variables Not Updating

- Ensure the connection status shows "OK" (green)
- Check that cue stacks exist in EventSync

### Feedbacks Not Working

- Verify the stack name matches exactly (case-sensitive)
- Check the connection status

## Support

For issues or feature requests:

- Website: https://eventsync.co.uk
- Email: support@eventsync.co.uk
