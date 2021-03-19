import React from 'react';
import PropTypes from 'prop-types';

const PopupBox = (props) => {
    return (
        <div className="popup-background" hidden={!props.visible}>
            <button onClick={props.onClose}>Close</button>
            <p>This is a popup box</p>
            {props.forms}
        </div>
    );
};

PopupBox.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    forms: PropTypes.element
};

export default PopupBox;
