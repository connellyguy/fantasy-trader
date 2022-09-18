import classes from './Dropdown.module.scss';

function Dropdown(props) {
    const {
        options = [],
        labelKey = 'label',
        valueKey = 'value',
        value,
        onNewValue = () => {},
    } = props;

    const handleChange = (event) => {
        onNewValue(event.target.value);
    };

    return (
        <div className={classes.select}>
            <select value={value} onChange={handleChange}>
                {options.map((opt) => {
                    return (
                        <option key={opt[valueKey]} value={opt[valueKey]}>
                            {opt[labelKey]}
                        </option>
                    );
                })}
            </select>
            <div className={classes.arrowWrapper}>
                <div className={classes.arrow} />
            </div>
        </div>
    );
}

export default Dropdown;
