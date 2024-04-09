import React from 'react';

const BackBtn = () => {
    return (
        <button onClick={() => history.back()} style={{ marginBottom: "1rem", width: "max-content", marginTop: "1rem" }}>
            Go back
        </button>
    );
};

export default BackBtn;