import { EditText } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import classes from './EditableText.module.scss';

function EditableText(props) {
    const { value, ...otherProps } = props;
    return (
        <EditText
            value={value}
            className={`${classes.label} ${classes.underline}`}
            inputClassName={classes.input}
            {...otherProps}
        />
    );
}

export default EditableText;
