import React, { useEffect, useState } from 'react';
import PlayerCardContainer from 'components/ui/playerCards/PlayerCardContainer';
import classes from './PlayerSourceBox.module.scss';
import { POSITIONS } from '../../constants/positions';
import { get } from 'lodash';
import Card from 'components/ui/Card';
import FuzzySearch from 'fuzzy-search';
import Search from 'components/ui/Search';
import DualSlider from 'components/ui/DualSlider';
import useDebounce from 'utils/use-debounce';
import Switch from 'components/ui/Switch';
import PositionColor from 'components/ui/PositionColor';

function PlayerSourceBox(props) {
    const { players, loadingPlayers = false } = props;
    const [positionsFilter, setPositionsFilter] = useState({});
    const [availablePlayers, setAvailablePlayers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [valueFilter, setValueFilter] = useState([0, 100]);
    const debouncedValueFilter = useDebounce(valueFilter, 350);
    const [valueFilterLimits, setValueFilterLimits] = useState({ min: 0, max: 100 });

    useEffect(() => {
        const playerValues = players.map((p) => p.value);
        const min = Math.min(...playerValues);
        const max = Math.max(...playerValues);
        setValueFilterLimits({
            min,
            max,
        });
        setValueFilter([min, max]);
    }, [players]);

    const handleValueFilterChange = (event, newValue) => {
        setValueFilter(newValue);
    };

    useEffect(() => {
        const allPositionsOff = Object.values(positionsFilter).every((position) => !position);
        var filteredPlayers = players
            .filter((player) => {
                const value = get(player, 'value', 0);
                const [min, max] = debouncedValueFilter;
                return (
                    (allPositionsOff ||
                        positionsFilter[get(player, 'position', '').toLowerCase()]) &&
                    value >= min &&
                    value <= max
                );
            })
            .sort((a, b) => {
                return b.value - a.value;
            });

        if (searchTerm && filteredPlayers.length) {
            const searcher = new FuzzySearch(filteredPlayers, ['name'], {
                caseSensitive: false,
            });
            setAvailablePlayers(searcher.search(searchTerm));
        } else {
            setAvailablePlayers(filteredPlayers);
        }
    }, [searchTerm, positionsFilter, players, debouncedValueFilter]);

    useEffect(() => {
        const positionsMap = {};
        POSITIONS.forEach((position) => {
            positionsMap[position] = false;
        });
        setPositionsFilter(positionsMap);
    }, []);

    function positionsFilterChange(position) {
        setPositionsFilter({
            ...positionsFilter,
            [position]: !positionsFilter[position],
        });
    }

    return (
        <div>
            <Card>
                <div className={classes.header}>
                    <div className={classes.positionToggles}>
                        {POSITIONS.map((pos) => {
                            return (
                                <PositionColor key={pos} position={pos}>
                                    <Switch
                                        onChange={(e) => {
                                            console.log(`${pos}: `, e);
                                            positionsFilterChange(pos);
                                        }}
                                        label={pos.toUpperCase()}
                                        checked={positionsFilter[pos] || false}
                                    />
                                </PositionColor>
                            );
                        })}
                    </div>
                    <div className={classes.searchBar}>
                        <Search
                            onSearch={(value) => {
                                setSearchTerm(value);
                            }}
                            debounce={350}
                        />
                    </div>
                    <div className={classes.slider}>
                        <DualSlider
                            values={valueFilter}
                            onChange={handleValueFilterChange}
                            max={valueFilterLimits.max}
                            min={valueFilterLimits.min}
                            step={0.5}
                        />
                    </div>
                    <div className={classes.ruleSelect}></div>
                </div>
            </Card>
            <Card
                isLoading={loadingPlayers}
                header={
                    <span className={classes.sourceBoxTitle}>
                        Available Players ({availablePlayers.length})
                    </span>
                }>
                <PlayerCardContainer
                    showPlaceholder={false}
                    width="160rem"
                    players={availablePlayers}
                />
            </Card>
        </div>
    );
}

export default PlayerSourceBox;
