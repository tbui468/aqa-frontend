import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AccessDenied from './AccessDenied';
import PopupBox from './PopupBox';
import TopicDisplay from './TopicDisplay';

const Profile = (props) => {
    const [editFormVisible, setEditFormVisible] = useState(false);

    const openEditForm = () => {
        setEditFormVisible(true);
        props.toggleOverlay();
    };

    const closeEditForm = () => {
        setEditFormVisible(false);
        props.toggleOverlay();
    };

    return (
        <section className="row">
            <div className="container">
                <PopupBox onClose={closeEditForm} visible={editFormVisible} />
                {props.user ? (
                    <div>
                        <h1>Profile page</h1>
                        <p>Name: {props.user.username}</p>
                        <p>Email: {props.user.email}</p>
                        <button onClick={openEditForm} >Edit profile</button>
                    </div>
                ) : (
                    <AccessDenied user={props.user} />
                )}
                <TopicDisplay user={props.user} />
            </div>
        </section>
    );
};

Profile.propTypes = {
    user: PropTypes.object,
    toggleOverlay: PropTypes.func
};

export default Profile;
