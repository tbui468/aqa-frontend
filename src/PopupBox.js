import React from 'react';
import PropTypes from 'prop-types';

import './popupBox.css';

const PopupBox = (props) => {
    return (
        <div>
            <div className={"popup-box-overlay "} hidden={!props.visible}>
                <button onClick={props.onClose}>Close</button>
                <p>This is a popup box</p>
                {props.forms}
            </div>
        </div>
    );
};

PopupBox.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    forms: PropTypes.element
};

export default PopupBox;
