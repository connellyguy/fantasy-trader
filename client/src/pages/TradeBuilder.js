import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { get } from 'lodash';
import PlayerSourceBox from 'components/layout/PlayerSourceBox';
import classes from './TradeBuilder.module.scss';
import PlayerCardContainer from 'components/ui/playerCards/PlayerCardContainer';
import Card from 'components/ui/Card';

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
        <React.Fragment>
            <section className={classes.section}>
                <PlayerSourceBox players={playerList} />
                <div className={classes.tradeBoxes}>
                    <Card>
                        <PlayerCardContainer width="30rem" players={[]} />
                    </Card>
                    <Card>
                        <PlayerCardContainer width="30rem" players={[]} />
                    </Card>
                </div>
            </section>
        </React.Fragment>
    );
}

export default TradeBuilderPage;
