import React from "react";

let renderCount = 0;

export default function ReactHookFormApp() {
    renderCount++;

    return (
        <div className="px-4 py-4">
            <Headers renderCount={renderCount} description="">

            </Headers>
        </div>
    );
}

function Headers({renderCount, description}) {
    return (
        <>
        <label className="mt-4 mr-4 px-4 py-2 bg-white border">Render Count: {renderCount}</label>
        </>
    );
}