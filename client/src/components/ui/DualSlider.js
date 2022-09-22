import { useEffect, useState } from 'react';
import MUISlider from '@mui/material/Slider';
import classes from './DualSlider.module.scss';
import { deepPurple } from '@mui/material/colors';

function DualSlider(props) {
    const { values, onChange, max = 100, min = 0, step = 1 } = props;

    const [minInput, setMinInput] = useState(values[0]);
    const [maxInput, setMaxInput] = useState(values[1]);

    const [visualMax, setVisualMax] = useState(max + 4);
    const [visualMin, setVisualMin] = useState(min - 4);

    function changeMin(value) {
        const numValue = parseFloat(value);
        const noSwapValue = Math.min(numValue, values[1]);
        return Math.max(noSwapValue, min);
    }
    function changeMax(value) {
        const numValue = parseFloat(value);
        const noSwapValue = Math.max(numValue, values[0]);
        return Math.min(noSwapValue, max);
    }

    useEffect(() => {
        setMinInput(values[0]);
        setMaxInput(values[1]);
    }, [values]);

    useEffect(() => {
        setVisualMax(max + 6);
        setVisualMin(min - 6);
    }, [max, min]);

    function handleChange(e, newValue, thumb) {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (thumb === 0) {
            newValue = [changeMin(newValue[0]), newValue[1]];
        } else {
            newValue = [newValue[0], changeMax([newValue[1]])];
        }
        onChange(e, newValue, thumb);
    }

    const color = deepPurple[700];

    return (
        <div className={classes.container} style={{ color }}>
            <div className={`${classes.inputContainer} ${classes.minInput}`}>
                <input
                    className={classes.input}
                    type="number"
                    onChange={(e) => {
                        setMinInput(e.target.value);
                    }}
                    onBlur={(e) => handleChange(e, [parseFloat(minInput || 0), values[1]], 0)}
                    value={minInput}
                    min={min}
                    max={values[1]}
                    step={step}
                />
                <span>Min</span>
            </div>
            <MUISlider
                value={values}
                onChange={handleChange}
                max={visualMax}
                min={visualMin}
                step={step}
                disableSwap
                sx={{
                    color,
                    '& .MuiSlider-thumb': {
                        backgroundColor: '#fff',
                        border: '1px solid #ccc',
                        'box-shadow':
                            'rgba(0, 0, 0, 0.2) 0 .25rem .5rem, rgba(0, 0, 0, 0.2) 0 .25rem .5rem',
                        height: '3rem',
                        width: '3rem',
                        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                            boxShadow: 'inherit',
                        },
                        '&:before': {
                            display: 'none',
                        },
                    },
                }}
            />
            <div className={`${classes.inputContainer} ${classes.maxInput}`}>
                <input
                    className={classes.input}
                    type="number"
                    onChange={(e) => {
                        setMaxInput(e.target.value);
                    }}
                    onBlur={(e) => onChange(e, [values[0], parseFloat(maxInput || 0)], 1)}
                    value={maxInput}
                    min={values[0]}
                    max={max}
                    step={step}
                />
                <span>Max</span>
            </div>
        </div>
    );
}

export default DualSlider;
