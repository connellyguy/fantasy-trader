import Card from 'components/ui/Card';
import React from 'react';
import classes from './TradeEvaluator.module.scss';

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
        return (
            <React.Fragment>
                <div className={classes.row}>
                    <div className={`${classes.teamValue}`}>{value.total}</div>
                </div>
                {diffs.total !== 0 && (
                    <React.Fragment>
                        <div className={classes.row}>
                            <div
                                className={`${classes.bigValue} 
                                ${isWinner ? classes.winner : ''} 
                                ${isLoser ? classes.loser : ''}`}>
                                {diffs.total > 0 ? `+${diffs.total}` : diffs.total}
                            </div>
                            {isWinner && <div className={classes.arrowUp} />}
                            {isLoser && <div className={classes.arrowDown} />}
                        </div>
                    </React.Fragment>
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
                                        <span
                                            className={`
                                                ${diffs[diff] > 0 ? classes.winner : ''} 
                                                ${diffs[diff] < 0 ? classes.loser : ''}`}>
                                            {diffs[diff] > 0 && '+'}
                                            {diffs[diff]}
                                        </span>
                                        {diffs[diff] > 0 && (
                                            <i className={classes['arrowUp-small']} />
                                        )}
                                        {diffs[diff] < 0 && (
                                            <i className={classes['arrowDown-small']} />
                                        )}
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
