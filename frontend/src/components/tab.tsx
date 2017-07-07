import * as React from 'react';

interface TabProps {
    tabHeader: string;
    tabIndex: number;
    activeTabIndex: number;
    tabClickCallback: any;
}

class Tab extends React.Component<TabProps, any> {

    constructor(props: any) {
        super(props);
    }

    tabHeaderClickHandler = () => {
        this.props.tabClickCallback(this.props.tabIndex);
    };

    render() {
        return (
            <div className={'tab ' + (this.props.tabIndex == this.props.activeTabIndex ? 'active' : 'inactive')}>
                <div className="tab-header" style={{left: (this.props.tabIndex * 96) + 'px'}} onClick={this.tabHeaderClickHandler}>{this.props.tabHeader}</div>
                <div className="tab-body">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export {Tab};