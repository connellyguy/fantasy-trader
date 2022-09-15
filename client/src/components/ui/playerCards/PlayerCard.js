import classes from './PlayerCard.module.scss';
import { useDrag } from 'react-dnd';
import { get } from 'lodash';
import { ITEMTYPES } from 'constants/item-types';
import React from 'react';

function PlayerCard(props) {
    const { player, placeholder = false } = props;
    const name = get(player, 'name', '').toUpperCase();
    const position = get(player, 'position', '');
    const teamAbbreviation = get(player, 'teamAbbreviation', '');
    const firstName = name.split(' ')[0];
    const lastName = name.split(' ').slice(1).join(' ');
    const positionBorder = `border-${(player.position || '').toLowerCase()}`;

    const [{ isDragging }, drag] = useDrag(() => ({
        type: ITEMTYPES.playerCard,
        canDrag: !placeholder,
        item: player,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));
    const opacity = isDragging ? 0.4 : 1;

    return (
        <div>
            <div
                className={`${classes.card} ${classes[positionBorder]} 
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
                                    <span className={classes.tradeValue}>{player.value}</span>
                                </div>
                            </div>
                        </React.Fragment>
                    )}
                </div>
                <div className={`${classes.mobileValueContainer}`}>
                    <span className={classes.tradeValue}>{player.value}</span>
                </div>
            </div>
        </div>
    );
}

export default PlayerCard;
