import { useState } from 'react';
import classes from './Card.module.scss';
import LoadingOverlay from './LoadingOverlay';

function Card(props) {
    const {
        isLoading = false,
        className = '',
        header,
        collapsible = false,
        children,
        ...otherProps
    } = props;
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div
            {...otherProps}
            className={`${classes.card} ${collapsed ? classes.collapsed : ''} ${className}`}>
            {header && (
                <div className={classes.header}>
                    {typeof header === 'string' ? (
                        <span className={classes.headerText}>{header}</span>
                    ) : (
                        header
                    )}
                </div>
            )}
            <div className={`${classes.body}`}>
                {isLoading && <LoadingOverlay />}
                {children}
            </div>
            {collapsible && (
                <div
                    className={classes.collapseBar}
                    onClick={() => {
                        setCollapsed(!collapsed);
                    }}>
                    <span className={collapsed ? classes.downArrow : classes.upArrow} />
                </div>
            )}
        </div>
    );
}

export default Card;
