import React from 'react';
import { ReactComponent as TrendArrow } from './TrendArrow.svg';
import FeatherIcon from 'feather-icons-react';
import classes from './TrendNumber.module.scss';

function TrendNumber(props) {
    const { value } = props;
    const floatValue = parseFloat(value);
    return (
        <React.Fragment>
            <span
                className={`${classes.row} ${
                    floatValue > 0 ? classes.positive : floatValue < 0 ? classes.negative : ''
                }`}>
                {floatValue !== 0 ? (
                    <TrendArrow
                        style={{
                            stroke: 'currentcolor',
                            fill: 'currentcolor',
                            width: '2rem',
                            height: '1.5rem',
                        }}
                    />
                ) : (
                    <FeatherIcon icon="minus" width="2rem" height="1.5rem" stroke="currentColor" />
                )}
                {value}
            </span>
        </React.Fragment>
    );
}

export default TrendNumber;
