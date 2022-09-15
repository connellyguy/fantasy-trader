import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { get } from 'lodash';
import PlayerSourceBox from 'components/trade-builder/PlayerSourceBox';
import classes from './TradeBuilder.module.scss';
import TradeBoxes from 'components/trade-builder/TradeBoxes';

function TradeBuilderPage() {
    const [playerMap, setPlayerMap] = useState({});
    const [loadingPlayers, setLoadingPlayers] = useState(true);
    const playerList = Object.values(playerMap);

    useEffect(() => {
        axios({
            url: '/api/v1/players',
            headers: {
                Accept: 'application/json',
            },
        })
            .then((resp) => {
                const retrievedPlayers = get(resp, 'data', {});
                Object.values(retrievedPlayers).forEach((player) => {
                    player.value = get(player, 'values.ppr', '0.0');
                });
                setPlayerMap(retrievedPlayers);
                console.log('playerMap: ', playerMap);
                setLoadingPlayers(false);
            })
            .catch((err) => {
                console.error(err);
                setLoadingPlayers(false);
            });
    }, []);

    return (
        <section className={classes.section}>
            <PlayerSourceBox players={playerList} loadingPlayers={loadingPlayers} />
            <TradeBoxes fullPlayerMap={playerMap} />
        </section>
    );
}

export default TradeBuilderPage;
