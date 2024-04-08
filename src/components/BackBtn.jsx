import React from 'react';

const BackBtn = () => {
    return (
        <button onClick={() => history.back()} style={{ marginBottom: "1rem", width: "max-content" }}>
            Go back
        </button>
    );
};

export default BackBtn;