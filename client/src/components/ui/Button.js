import classes from './Button.module.scss';

function Button(props) {
    const { type, size, solid, onClick } = props;
    function clickHandler(event) {
        event.preventDefault();
        onClick();
    }

    return (
        <button
            className={`${classes.button} ${classes[type]} ${
                size === 'large' ? classes.large : ''
            } ${solid ? classes.solid : ''}`}
            onClick={clickHandler}>
            {props.children}
        </button>
    );
}

export default Button;
