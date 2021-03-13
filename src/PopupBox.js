import React from 'react';

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

export default PopupBox;
