import classes from '../../styles/PlayerCard.module.scss';

function PlayerCard(props) {
    const { player } = props;

    return <div className={classes.card}>{player.displayName}</div>;
}

export default PlayerCard;
