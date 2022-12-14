import Card from 'components/ui/Card';
import classes from './About.module.scss';

function About() {
    return (
        <section className={classes.section}>
            <Card header="About">
                <section className={classes.body}>
                    <p>
                        Trade value data is provided by{' '}
                        <a href="https://peakedinhighskool.com/">PeakedInHighSkool</a>. Support his{' '}
                        <a href="https://www.patreon.com/Peakedinhighskool/posts">Patreon</a> for
                        advanced scoring settings and early access to data.
                        <br />
                        Player data and photos are provided by ESPN.
                    </p>
                    <p>
                        Developed using Node.js and React. Hosted via Firebase. Please contact{' '}
                        <a href="https://www.reddit.com/user/ffdata_dev">ffdata_dev</a> on reddit
                        for inquiries.
                    </p>
                    <h4>Art Credits</h4>
                    <ul className={classes.artCreditsList}>
                        <li>
                            Trend by iconbysonny from{' '}
                            <a
                                href="https://thenounproject.com/browse/icons/term/trend/"
                                target="_blank"
                                title="trend Icons"
                                rel="noreferrer">
                                Noun Project
                            </a>
                        </li>
                    </ul>
                </section>
            </Card>
        </section>
    );
}

export default About;
