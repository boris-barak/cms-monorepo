import * as React from 'react';

export const UnknownContentItem = ({ contentItem }: { contentItem: never }) => {
    console.log('Unknown Content Item', contentItem);
    return <div>Unknown Content Item</div>;
};
