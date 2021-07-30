import { useState } from 'react'
import classes from './Button.module.css'

const Button = props => {
    const { type, func, color, onClickHandler, children } = props
    const [hover, setHover] = useState(false)
    const onHoverHandler = () => {
        setHover(true)
    }

    const onNotHoverHandler = () => {
        setHover(false)
    }

    return (
        <button
            className={classes.button}
            onMouseEnter={onHoverHandler}
            onMouseLeave={onNotHoverHandler}
            onClick={onClickHandler}
            type={func}
            style={{
                color: ((type === 'primary' && !hover) || (type === 'secondary' && hover)) ? color : '#cdcdcd',
                backgroundColor: ((type === 'primary' && !hover) || (type === 'secondary' && hover)) ? 'transparent' : color,
                border: `1px solid ${color}`
            }}
        >
            { children }
        </button>
    )
}

export default Button