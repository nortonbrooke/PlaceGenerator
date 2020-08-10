import React from 'react'
import './ErrorBoundary.css'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false
        }
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true });
        console.log(error, info)
    }

    refresh() {
        window.location.reload();
    }

    render() {
        if (this.state.hasError) {
            return (<div className='error-page'>
                <span role="img" aria-label="Cloud with rain emoji">🌧</span>
                <div>Womp, looks like an error occurred.</div>
                <button onClick={() => this.refresh()}>Reload</button>
            </div>);
        }
        return this.props.children;
    }
}

export default ErrorBoundary
