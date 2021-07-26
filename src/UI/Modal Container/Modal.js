import classes from './Modal.module.css'

const Modal = props => {
    const { showModal, onToggleModal, children } = props
    const stopPropagation = e => e.stopPropagation()
    
    return (
        <div 
            className={`${classes['modal-container']} ${showModal && classes.show}`}
            onClick={onToggleModal}
        >
            <div 
                className={classes['modal']}
                onClick={stopPropagation}
            >
                { children }
            </div>
        </div>
    )
}

export default Modal