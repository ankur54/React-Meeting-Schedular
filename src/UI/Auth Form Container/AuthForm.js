import { Fragment, useState } from 'react'

import classes from './AuthForm.module.css'

const AuthForm = props => {
    const [active, setActive] = useState(0);
    const { sections } = props

    const onTabClickHandler = (idx) => {
        setActive(idx)
    }
    
    
    const formTabs = sections.map((tab, idx) => (
        <div 
            key={tab.title}
            className={`${classes['form-tab']} ${active === idx && classes.active}`}
            onClick={onTabClickHandler.bind(this, idx)}
        >{ tab.title }
        </div>
    ))

    const pages = sections.map(page => {
        const form = (
            page.left.inputList.map(input => (
                <input 
                    key={input.name}
                    required={input.required}
                    type={input.type}
                    name={input.name}
                    value={input.value}
                    onChange={input.onChangeHandler}
                    placeholder={input.placeholder}
                />
            ))
        )

        return (
            <Fragment>
                <div className={classes['left-panel']}>
                    <form 
                        key={page.title}
                        className={classes['auth-form']}
                        action=''
                        method='POST'
                    >
                        { form }
                        <button 
                            type='submit'
                            onClick={page.submitHandler}
                            className={classes['form-submit']}
                        >{ page.title }
                        </button>
                    </form>
                </div> 
                <div className={classes['right-panel']}>
                    <div className={classes['form-image']}>
                        <img src={page.right.image} alt='form image'/>
                    </div> 
                </div>
            </Fragment>
        )
    })

    return (
        <div className={classes['auth-form-container']}>
            <div className={classes['form-header']}>
                <div className={classes['form-tab-group']}>
                    { formTabs }
                </div>
            </div>
            <div className={classes['form-content']}>
                { pages[active] }
            </div>
        </div>
    )
}

export default AuthForm