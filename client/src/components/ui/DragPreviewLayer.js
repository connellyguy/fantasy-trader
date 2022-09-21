import { useDragLayer } from 'react-dnd';
import { ITEMTYPES } from 'constants/item-types';
import PlayerCard from '../trade-builder/playerCards/PlayerCard';

const layerStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
};

function getItemStyles(initialOffset, currentOffset) {
    if (!initialOffset || !currentOffset) {
        return {
            display: 'none',
        };
    }
    let { x, y } = currentOffset;

    const transform = `translate(${x}px, ${y}px)`;
    return {
        transform,
        WebkitTransform: transform,
    };
}

function DragPreviewLayer(props) {
    const { itemType, isDragging, item, initialOffset, currentOffset } = useDragLayer(
        (monitor) => ({
            item: monitor.getItem(),
            itemType: monitor.getItemType(),
            initialOffset: monitor.getInitialSourceClientOffset(),
            currentOffset: monitor.getSourceClientOffset(),
            isDragging: monitor.isDragging(),
        })
    );
    function renderItem() {
        switch (itemType) {
            case ITEMTYPES.playerCard:
                return <PlayerCard player={item} />;
            default:
                return null;
        }
    }
    if (!isDragging) {
        return null;
    }
    return (
        <div style={layerStyles}>
            <div style={getItemStyles(initialOffset, currentOffset)}>{renderItem()}</div>
        </div>
    );
}

export default DragPreviewLayer;
