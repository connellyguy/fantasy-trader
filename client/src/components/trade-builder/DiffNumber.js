import React, { useEffect, useReducer, useState } from 'react';
import animateNumber from 'utils/animateNumber';
import classes from './DiffNumber.module.scss';

function DiffNumber(props) {
    const { value, size = 'small' } = props;
    const [displayValue, setDisplayValue] = useState(value);

    function displayValuesReducer(state, action) {
        switch (action.type) {
            case 'update':
                animateNumber(setDisplayValue, state.value, action.payload, 250);
                return { value: action.payload };
            default:
                throw new Error();
        }
    }

    const [, dispatchTotal] = useReducer(displayValuesReducer, { value });
    useEffect(() => {
        dispatchTotal({ type: 'update', payload: value });
    }, [value]);

    return (
        <React.Fragment>
            <span
                className={`
                        ${displayValue > 0 ? classes.winner : ''} 
                        ${displayValue < 0 ? classes.loser : ''}`}>
                {displayValue > 0 && '+'}
                {displayValue}
            </span>
            {displayValue > 0 && (
                <i className={`${classes.arrowUp} ${size === 'small' ? classes.small : ''}`} />
            )}
            {displayValue < 0 && (
                <i className={`${classes.arrowDown} ${size === 'small' ? classes.small : ''}`} />
            )}
        </React.Fragment>
    );
}

export default DiffNumber;
