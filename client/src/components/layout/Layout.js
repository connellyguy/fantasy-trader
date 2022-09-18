import classes from './Layout.module.scss';
import MainNavigation from 'components/layout/MainNavigation';

function Layout(props) {
    return (
        <div className={classes.layout}>
            <MainNavigation />
            <main className={classes.main}>{props.children}</main>
            <div className={classes.fade} />
        </div>
    );
}

export default Layout;
