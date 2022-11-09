import { useEffect } from 'react';
import classes from './PlayerCard.module.scss';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { get } from 'lodash';
import { ITEMTYPES } from 'constants/item-types';
import React from 'react';
import TrendNumber from './TrendNumber';

function PlayerCard(props) {
    const { player, placeholder = false } = props;
    const name = get(player, 'displayName', '').toUpperCase();
    const position = get(player, 'position', '');
    const teamAbbreviation = get(player, 'teamAbbreviation', '');
    const firstName = name.split(' ')[0];
    const lastName = name.split(' ').slice(1).join(' ');
    const positionBorder = `border-${(player.position || '').toLowerCase()}`;

    const [{ isDragging }, drag, preview] = useDrag(
        () => ({
            type: ITEMTYPES.playerCard,
            canDrag: !placeholder,
            item: player,
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }),
        [player]
    );
    const opacity = isDragging ? 0.4 : 1;

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <div
                className={`${classes.card} ${classes[positionBorder]} 
                    ${classes.noSelect} 
                    ${!placeholder ? classes.grabbable : ''} 
                    ${placeholder ? classes.placeholder : ''}`}
                ref={drag}
                style={{ opacity }}>
                <div className={classes.mainRow}>
                    {placeholder ? (
                        <div className={classes.placeholderText}>Drag a player here</div>
                    ) : (
                        <React.Fragment>
                            <div className={`${classes.column} ${classes.headshotColumn}`}>
                                <div className={classes.headshotContainer}>
                                    <img
                                        draggable="false"
                                        src={player.headshotHref}
                                        alt={player.displayName}
                                    />
                                </div>
                            </div>
                            <div className={`${classes.column} ${classes.infoColumn}`}>
                                <span className={classes.firstName}>{firstName}</span>
                                <span className={classes.lastName}>{lastName}</span>
                                <span className={classes.teamName}>
                                    {position} | {teamAbbreviation}
                                </span>
                            </div>
                            <div className={`${classes.column} ${classes.valueColumn}`}>
                                <div className={classes.valueContainer}>
                                    <span className={classes.tradeValue}>
                                        <span>{player.value}</span>
                                        <TrendNumber value={player.trend} />
                                    </span>
                                </div>
                            </div>
                        </React.Fragment>
                    )}
                </div>
                <div className={`${classes.mobileValueContainer}`}>
                    <span className={classes.tradeValue}>
                        <span>{player.value}</span>
                        <TrendNumber value={player.trend} />
                    </span>
                </div>
            </div>
        </div>
    );
}

export default PlayerCard;
