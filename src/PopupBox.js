import React from 'react';

import './popupBox.css';

const PopupBox = (props) => {
    return (
        <div>
            <div className={"popup-box-overlay "} hidden={props.visible ? false : true}>
                <button onClick={props.onClose}>Close</button>
                <p>This is a popup box</p>
                <form onSubmit={props.onSubmit}>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default PopupBox;
