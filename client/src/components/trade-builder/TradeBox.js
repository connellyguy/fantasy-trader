import { useEffect, useState } from 'react';
import Card from 'components/ui/Card';
import PlayerCardContainer from 'components/ui/playerCards/PlayerCardContainer';
import EditableText from 'components/ui/EditableText';
import classes from './TradeBox.module.scss';
import { isEmpty } from 'lodash';

function TradeBox(props) {
    const { onDrop, onNameChange, onTrash, team = {}, width = 29, height = 40 } = props;
    const { name = 'Team Name', players = {} } = team;
    const [tmpName, setTmpName] = useState('');

    const playerList = Object.values(players)
        .filter((player) => {
            return !isEmpty(player);
        })
        .sort((a, b) => b.value - a.value);

    useEffect(() => {
        setTmpName(name);
    }, [name]);

    return (
        <Card
            className={classes['trade-box']}
            header={
                <div style={{ width: `${width - 3}rem`, paddingBottom: '1.5rem' }}>
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
