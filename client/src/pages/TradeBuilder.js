import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { get } from 'lodash';
import PlayerSourceBox from 'components/trade-builder/PlayerSourceBox';
import classes from './TradeBuilder.module.scss';
import TradeBoxes from 'components/trade-builder/TradeBoxes';

function TradeBuilderPage() {
    const [playerMap, setPlayerMap] = useState({});
    const playerList = Object.values(playerMap);

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
        <section className={classes.section}>
            <PlayerSourceBox players={playerList} />
            <TradeBoxes fullPlayerMap={playerMap} />
        </section>
    );
}

export default TradeBuilderPage;
