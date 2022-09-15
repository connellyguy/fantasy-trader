import classes from './Switch.module.scss';

function Switch(props) {
    const { label, onChange, checked, ...otherProps } = props;
    return (
        <label className={classes.switch} {...otherProps}>
            <input type="checkbox" checked={checked} onChange={onChange} />
            <span className={classes.slider}></span>
            <div className={classes.label}>
                <span>{label}</span>
            </div>
        </label>
    );
}

export default Switch;
