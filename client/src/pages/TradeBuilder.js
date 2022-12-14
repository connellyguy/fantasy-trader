import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { cloneDeep, get } from 'lodash';
import PlayerSourceBox from 'components/trade-builder/PlayerSourceBox';
import classes from './TradeBuilder.module.scss';
import TradeBoxes from 'components/trade-builder/TradeBoxes';
import { useSelector } from 'react-redux';
import DragPreviewLayer from 'components/ui/DragPreviewLayer';
import Card from 'components/ui/Card';

function TradeBuilderPage() {
    const [playerMap, setPlayerMap] = useState({});
    const [playerList, setPlayerList] = useState([]);
    const [loadingPlayers, setLoadingPlayers] = useState(true);
    const scoringKey = useSelector((state) => state.players.scoringKey);

    function computePlayerValue(origPlayers, valueKey) {
        const newPlayers = Object.keys(origPlayers).reduce((players, playerId) => {
            const player = cloneDeep(origPlayers[playerId]);
            player.value = get(player, `values.${valueKey}`, '0.0');
            player.trend = get(player, `trends.${valueKey}`, '0');
            return { ...players, [playerId]: player };
        }, {});
        return newPlayers;
    }

    useEffect(() => {
        setPlayerMap(computePlayerValue(playerMap, scoringKey));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scoringKey]);

    useEffect(() => {
        setPlayerList(
            Object.values(playerMap).sort((a, b) => {
                return b.value - a.value;
            })
        );
    }, [playerMap]);

    useEffect(() => {
        axios({
            url: '/api/v1/players',
            headers: {
                Accept: 'application/json',
            },
        })
            .then((resp) => {
                const retrievedPlayers = get(resp, 'data', {});
                setPlayerMap(computePlayerValue(retrievedPlayers, scoringKey));
                setLoadingPlayers(false);
            })
            .catch((err) => {
                console.error(err);
                setLoadingPlayers(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className={classes.section}>
            <Card>
                <div className={classes.pageTitle}>
                    <h2>Market-Adjusted Trade Value Calculator</h2>
                    <h4>
                        Data provided by{' '}
                        <a href="https://peakedinhighskool.com/" target="_blank" rel="noreferrer">
                            PeakedInHighSkool
                        </a>
                    </h4>
                </div>
            </Card>
            <PlayerSourceBox players={playerList} loadingPlayers={loadingPlayers} />
            <TradeBoxes fullPlayerMap={playerMap} />
            <DragPreviewLayer />
        </section>
    );
}

export default TradeBuilderPage;
