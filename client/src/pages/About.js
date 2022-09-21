import Card from 'components/ui/Card';
import classes from './About.module.scss';

function About() {
    return (
        <section className={classes.section}>
            <Card header="About">
                <section className={classes.body}>
                    <p>
                        Trade value data is provided by{' '}
                        <a href="https://www.reddit.com/user/PeakedInHighSkool">
                            PeakedInHighSkool
                        </a>{' '}
                        via reddit. Support his{' '}
                        <a href="https://www.patreon.com/Peakedinhighskool/posts">Patreon</a> for
                        advanced scoring settings and early access to data.
                        <br />
                        Player data and photos are provided by ESPN.
                    </p>
                    <p>
                        Developed using Node.js and React. Hosted via Firebase. Please contact{' '}
                        <a href="https://www.reddit.com/user/connguy">connguy</a> on reddit for
                        inquiries.
                    </p>
                </section>
            </Card>
        </section>
    );
}

export default About;
