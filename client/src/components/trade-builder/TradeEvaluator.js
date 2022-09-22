import Card from 'components/ui/Card';
import React, { useRef, useReducer, useEffect, useState } from 'react';
import classes from './TradeEvaluator.module.scss';
import animateNumber from 'utils/animateNumber';
import DiffNumber from './DiffNumber';

function TradeEvaluator(props) {
    const { teams, height = '31rem', width = '40rem' } = props;

    const teamDiffs = teams.map((team, index) => {
        if (!team.value)
            return {
                value: team.value || {},
                isWinner: false,
                isLoser: false,
                diffs: {},
            };

        const otherTeam = teams[1 - index];

        const diffs = Object.keys(team.value).reduce((acc, key) => {
            return { ...acc, [key]: otherTeam.value[key] - team.value[key] };
        }, {});

        const isWinner = diffs.total > 0;
        const isLoser = diffs.total < 0;

        return {
            value: team.value,
            diffs,
            isWinner,
            isLoser,
        };
    });

    function GetValueDisplay({ isWinner, isLoser, value, diffs }) {
        const totalRef = useRef(null);
        const [displayTotal, setDisplayTotal] = useState(0);

        function displayValuesReducer(state, action) {
            switch (action.type) {
                case 'update':
                    animateNumber(setDisplayTotal, state.total, action.payload, 250);
                    return { total: action.payload };
                default:
                    throw new Error();
            }
        }

        const [, dispatchTotal] = useReducer(displayValuesReducer, { total: value.total });
        useEffect(() => {
            dispatchTotal({ type: 'update', payload: value.total });
        }, [value]);

        return (
            <React.Fragment>
                <div className={classes.row}>
                    <div ref={totalRef} className={`${classes.teamValue}`}>
                        {displayTotal}
                    </div>
                </div>
                {diffs.total !== 0 && (
                    <div className={`${classes.bigValueRow} ${classes.row}`}>
                        <DiffNumber size="big" value={diffs.total} />
                    </div>
                )}
                <div className={classes.diffBreakdown}>
                    {Object.keys(diffs)
                        .filter((diff) => diff !== 'total')
                        .map((diff) => {
                            return (
                                <div
                                    key={diff}
                                    className={`${classes.row} ${classes.smallValueRow}`}>
                                    <span style={{ fontWeight: '600' }}>{diff.toUpperCase()}:</span>
                                    <div className={classes.row}>
                                        <DiffNumber size="small" value={diffs[diff]} />
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </React.Fragment>
        );
    }

    return (
        <Card style={{ height, width }} header={<div className={classes.header}>Trade Value</div>}>
            <div className={classes.column}>
                <div className={`${classes.row} ${classes.valueRow}`}>
                    <div className={`${classes.column} ${classes.teamColumn}`}>
                        <div className={classes.teamName}>{teams[0].name}</div>
                        {GetValueDisplay(teamDiffs[0])}
                    </div>
                    <div className={`${classes.column} ${classes.teamColumn}`}>
                        <div className={classes.teamName}>{teams[1].name}</div>
                        {GetValueDisplay(teamDiffs[1])}
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default TradeEvaluator;
