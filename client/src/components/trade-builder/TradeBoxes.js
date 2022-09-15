import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TradeBox from './TradeBox';
import classes from './TradeBoxes.module.scss';
import { get, isEmpty } from 'lodash';
import TradeEvaluator from './TradeEvaluator';
import { POSITIONS } from 'constants/positions';

function TradeBoxes(props) {
    const { fullPlayerMap = {} } = props;
    const [teams, setTeams] = useState([
        { players: {}, name: 'Team 1' },
        { players: {}, name: 'Team 2' },
    ]);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const urlQuery = new URLSearchParams(location.search);

        teams.forEach((team, index) => {
            const savedName = urlQuery.get(`team${index + 1}name`);
            if (savedName) {
                team.name = savedName;
            }

            const savedPlayers = urlQuery.get(`team${index + 1}players`);
            if (savedPlayers) {
                const players = {};
                savedPlayers.split(' ').forEach((playerKey) => {
                    players[playerKey] = get(fullPlayerMap, playerKey, {});
                });
                team.players = players;
            }
        });
        setTeams([...teams]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fullPlayerMap]);

    useEffect(() => {
        const urlQuery = new URLSearchParams(location.search);
        teams.forEach((team, index) => {
            const { name, players } = team;

            if (isEmpty(name) || name === `Team ${index + 1}`) {
                urlQuery.delete(`team${index + 1}name`);
            } else {
                urlQuery.set(`team${index + 1}name`, name);
            }
            if (isEmpty(players)) {
                urlQuery.delete(`team${index + 1}players`);
            } else {
                const playerKeys = Object.keys(players).join(' ');
                urlQuery.set(`team${index + 1}players`, playerKeys);
            }
            navigate({ search: urlQuery.toString() }, { replace: true });

            const zeroValues = POSITIONS.reduce(
                (acc, position) => {
                    return { ...acc, [position]: 0 };
                },
                { total: 0 }
            );

            if (!isEmpty(fullPlayerMap)) {
                team.value = Object.values(players).reduce((acc, player) => {
                    const position = get(player, 'position', 'NA').toLowerCase();
                    const value = parseFloat(player.value);
                    return {
                        ...acc,
                        [position]: acc[position] + value,
                        total: acc.total + value,
                    };
                }, zeroValues);
            } else {
                team.value = zeroValues;
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [teams]);

    function handleDrop(index, player) {
        console.log(`add ${player.name} to ${index}`);
        const team = teams[index];
        const playerId = player.id;
        // remove player from other team if added previously
        teams.forEach((t, i) => {
            if (i !== index) {
                delete t.players[playerId];
            }
        });
        team.players[playerId] = player;
        setTeams([...teams]);
    }

    function handleTrash(index, player) {
        console.log(`delete ${player.name} from ${index}`);
        const team = teams[index];
        const playerId = player.id;
        delete team.players[playerId];
        setTeams([...teams]);
    }

    function handleNameChange(index, name) {
        const team = teams[index];
        if (isEmpty(name)) name = `Team ${index + 1}`;
        team.name = name;

        setTeams([...teams]);
    }

    return (
        <React.Fragment>
            <div className={classes.tradeBoxes}>
                <TradeBox
                    onDrop={(player) => handleDrop(0, player)}
                    onTrash={(player) => handleTrash(0, player)}
                    onNameChange={(name) => handleNameChange(0, name)}
                    width={29}
                    team={teams[0]}
                />
                <TradeEvaluator teams={teams} />
                <TradeBox
                    onDrop={(player) => handleDrop(1, player)}
                    onTrash={(player) => handleTrash(1, player)}
                    onNameChange={(name) => handleNameChange(1, name)}
                    width={29}
                    team={teams[1]}
                />
            </div>
            <div className={classes.mobileTradeBoxes}>
                <TradeBox
                    onDrop={(player) => handleDrop(0, player)}
                    onTrash={(player) => handleTrash(0, player)}
                    onNameChange={(name) => handleNameChange(0, name)}
                    width={18}
                    height={35}
                    team={teams[0]}
                />
                <TradeBox
                    onDrop={(player) => handleDrop(1, player)}
                    onTrash={(player) => handleTrash(1, player)}
                    onNameChange={(name) => handleNameChange(1, name)}
                    width={18}
                    height={35}
                    team={teams[1]}
                />
                <TradeEvaluator width="50rem" teams={teams} />
            </div>
        </React.Fragment>
    );
}

export default TradeBoxes;
