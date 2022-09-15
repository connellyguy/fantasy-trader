import classes from './Card.module.scss';
import LoadingOverlay from './LoadingOverlay';

function Card(props) {
    const { isLoading = false, className = '', header, children, ...otherProps } = props;
    return (
        <div {...otherProps} className={`${classes.card} ${className}`}>
            {header && <div className={classes.header}>{header}</div>}
            <div className={classes.body}>
                {isLoading && <LoadingOverlay />}
                {children}
            </div>
        </div>
    );
}

export default Card;
