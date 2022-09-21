import { useEffect, useState } from 'react';
import Card from 'components/ui/Card';
import PlayerCardContainer from 'components/trade-builder/playerCards/PlayerCardContainer';
import EditableText from 'components/ui/EditableText';
import classes from './TradeBox.module.scss';
import FeatherIcon from 'feather-icons-react';
import { isEmpty } from 'lodash';

function TradeBox(props) {
    const { onDrop, onNameChange, onTrash, onClear, team = {}, width = 29, height = 40 } = props;
    const { name = 'Team Name', players = {} } = team;
    const [playerList, setPlayerList] = useState([]);
    const [tmpName, setTmpName] = useState('');
    const [showClearAll, setShowClearAll] = useState(false);

    useEffect(() => {
        const playerList = Object.values(players)
            .filter((player) => {
                return !isEmpty(player);
            })
            .sort((a, b) => b.value - a.value);
        setPlayerList(playerList);
        setShowClearAll(!!playerList.length);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [players]);

    useEffect(() => {
        setTmpName(name);
    }, [name]);

    return (
        <Card
            className={classes['trade-box']}
            header={
                <div
                    className={classes.header}
                    style={{ width: `${width}rem`, paddingBottom: '1.5rem' }}>
                    <div className={classes.editName}>
                        <EditableText
                            value={tmpName}
                            onChange={(e) => {
                                setTmpName(e.target.value);
                            }}
                            onBlur={() => {
                                onNameChange(tmpName);
                            }}
                        />
                    </div>
                    <div className={classes.trashcan}>
                        <FeatherIcon
                            key={showClearAll}
                            onClick={onClear}
                            className={`${classes.trashcanIcon} ${
                                showClearAll ? classes.visible : ''
                            }`}
                            icon="trash-2"
                            stroke="currentColor"
                            width="2rem"
                            height="2rem"
                        />
                    </div>
                </div>
            }>
            <PlayerCardContainer
                onDrop={(player) => onDrop(player)}
                onTrash={(player) => onTrash(player)}
                width={`${width}rem`}
                height={`${height}rem`}
                players={playerList}
                showTrashCan
            />
        </Card>
    );
}

export default TradeBox;
