import React from "react";

/*
 Basic React Component which holds  other
 */
class Layout extends React.Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default Layout;