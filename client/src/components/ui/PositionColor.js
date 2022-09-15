import classes from './PositionColor.module.scss';

function PositionColor(props) {
    const { position, children } = props;
    return <div className={classes[position]}>{children}</div>;
}

export default PositionColor;
