import { useDrop } from 'react-dnd';
import PlayerCard from './PlayerCard';
import FeatherIcon from 'feather-icons-react';
import classes from './PlayerCardContainer.module.scss';
import { ITEMTYPES } from 'constants/item-types';

function PlayerCardContainer(props) {
    const {
        onDrop = () => {},
        onTrash = () => {},
        showTrashCan = false,
        players = [],
        height = '40rem',
        width = '80rem',
        showPlaceholder = true,
        className = '',
    } = props;

    // eslint-disable-next-line no-unused-vars
    const [{ getDraggedPlayer }, drop] = useDrop({
        accept: ITEMTYPES.playerCard,
        drop(_item, monitor) {
            const didDrop = monitor.didDrop();
            if (didDrop) {
                return;
            }
            onDrop(_item, monitor);
        },
        collect: (monitor) => ({
            getDraggedPlayer: monitor.getItem(),
        }),
    });

    const playerInContainer = players.some((player) => {
        if (!getDraggedPlayer) return false;
        return player.id === getDraggedPlayer.id;
    });

    const [{ isOverTrash }, dropTrash] = useDrop({
        accept: ITEMTYPES.playerCard,
        drop: onTrash,
        collect: (monitor) => ({
            isOverTrash: monitor.isOver(),
        }),
    });

    return (
        <div
            style={{
                height,
                width,
            }}
            className={`${classes.containerWrapper} ${className}`}>
            <div ref={drop} className={classes.container}>
                {showPlaceholder && !players.length && <PlayerCard player={{}} placeholder />}
                {players.map((player) => {
                    return <PlayerCard key={player.id} player={player} />;
                })}
                {showTrashCan && (
                    <div
                        ref={dropTrash}
                        className={`${classes.trashcanContainer} 
                        ${playerInContainer ? classes.visible : ''} 
                        ${isOverTrash ? classes.hovered : ''}`}>
                        <div className={classes.trashcan}>
                            <FeatherIcon
                                icon="trash-2"
                                stroke="#A9A9A9"
                                width="2.5rem"
                                height="2.5rem"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PlayerCardContainer;
