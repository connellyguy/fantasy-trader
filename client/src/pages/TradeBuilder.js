import { useEffect, useState } from 'react';
import axios from 'axios';
import { get } from 'lodash';
import PlayerCard from '../components/ui/PlayerCard';

function TradeBuilderPage() {
    const [playerMap, setPlayerMap] = useState({});
    const playerList = Object.values(playerMap);
    const firstPlayer = playerList[0] || {};

    console.log('playerMap: ', playerMap);

    useEffect(() => {
        axios({
            url: '/api/v1/players',
            headers: {
                Accept: 'application/json',
            },
        })
            .then((resp) => {
                setPlayerMap(get(resp, 'data', {}));
            })
            .catch(console.error);
    }, []);

    return (
        <div>
            <PlayerCard player={firstPlayer} />
        </div>
    );
}

export default TradeBuilderPage;
