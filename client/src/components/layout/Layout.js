import classes from '../../styles/Layout.module.scss';

function Layout(props) {
    return (
        <div>
            <main className={classes.main}>{props.children}</main>
        </div>
    );
}

export default Layout;
