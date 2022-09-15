import classes from './LoadingOverlay.module.scss';

function LoadingOverlay({ className }) {
    return (
        <div className={`${classes.backdrop} ${className}`}>
            <div className={classes.loadingEllipsis}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default LoadingOverlay;
