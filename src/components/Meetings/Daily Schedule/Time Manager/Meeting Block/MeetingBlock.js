import classes from './MeetingBlock.module.css';

const MeetingBlock = props => {
    const { meetings, onEventClick } = props

    
    const meetingsList = meetings.map(meeting => {
        const {
            _id,
            title,
            description,
            startTime,
            endTime
        } = meeting
        const durationInMinutes = (() => {
            const [startHr, startMin] = startTime.split(':')
            const [endHr, endMin] = endTime.split(':')
            return ((parseInt(endHr) - parseInt(startHr)) * 60) + 
                    (parseInt(endMin) - parseInt(startMin))
        })()
        const meetingStartOffset = (() => {
            const startMin = startTime.split(':')[1]
            return startMin
        })()
        return (
            <div 
                key={_id}
                className={classes['meeting-range']}
                style={{
                        height: `calc((5em / 60) * ${durationInMinutes})`,
                        top: `calc(10px + (5em / 60) * ${meetingStartOffset})`
                    }}
                onClick={onEventClick}
            >
            </div>
        )
    })

    return (meetingsList)
}

export default MeetingBlock