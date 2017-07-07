import * as React from 'react';

interface LoadingSpinnerProps {
    pollQuestionsCallback: Function
}

class LoadingSpinner extends React.Component<LoadingSpinnerProps, any> {

    constructor(props: any) {
        super(props);
    }



    render() {
        return (
            <div className="loading-spinner"></div>
        );
    }
}

export {LoadingSpinner};