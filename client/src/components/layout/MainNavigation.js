import Dropdown from 'components/ui/Dropdown';
import { Link, useLocation } from 'react-router-dom';
import classes from './MainNavigation.module.scss';
import { SCORING_KEYS } from 'constants/scoring-keys';
import { useSelector, useDispatch } from 'react-redux';
import { setScoringKey } from 'store/players';

function MainNavigation() {
    const location = useLocation();
    const path = location.pathname;
    const scoringKey = useSelector((state) => state.players.scoringKey);
    const dispatch = useDispatch();

    const navLinks = [
        {
            label: 'Trade Calculator',
            path: '/trade-values',
        },
        {
            label: 'About',
            path: '/about',
        },
    ];

    return (
        <header
            className={classes.sidebar}
            style={{ backgroundImage: 'url(/img/football-texture.png)' }}>
            <div className={classes.leftAlign}>
                <Link to="/" className={classes.logo}>
                    <img alt="football logo" src="/img/football-icon.png" />
                    FF DATA
                </Link>
                <nav className={classes.navLinks}>
                    {navLinks.map((navLink) => {
                        return (
                            <Link
                                key={navLink.path}
                                className={path === navLink.path ? classes.active : ''}
                                to={navLink.path}>
                                {navLink.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>
            <div className={classes.rightAlign}>
                <Dropdown
                    options={SCORING_KEYS}
                    value={scoringKey}
                    onNewValue={(value) => {
                        dispatch(setScoringKey(value));
                    }}
                />
            </div>
        </header>
    );
}

export default MainNavigation;
