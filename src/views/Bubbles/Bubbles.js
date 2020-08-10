import React from 'react'
import ReactDOM from 'react-dom'
import get from 'lodash/get';
import noop from 'lodash/noop'
import palette from '../../palette'
import './Bubbles.css'

class Bubbles extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bubbleClicked: false
        }
    }
    
    componentDidMount() {
        this.update()

        window.addEventListener('resize', this.update.bind(this), true);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedId !== this.props.selectedId) {
            this.setState({ bubbleClicked: false })
            this.update();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.update.bind(this), true);
    }

    getId(item) {
        return get(item, this.props.identifier)
    }

    update() {
        const {
            bubbleClicked
        } = this.state
        const {
            nightMode,
            color,
            selectedId
        } = this.props

        const canvas = ReactDOM.findDOMNode(this)
        const bubbles = canvas.querySelectorAll('.bubble')

        const offset = 100 // bubble size
        const canvasWidth = canvas.clientWidth - offset
        const canvasHeight = canvas.clientHeight - offset

        bubbles.forEach((bubble, index) => {
            let focusedColor = bubbleClicked ? bubble.style.color : color
            if (bubble.getAttribute('id') === selectedId) {
                bubble.setAttribute('style', `
                    color: ${focusedColor};
                    border-color:${focusedColor};
                    background: ${nightMode ? 'black' : 'white'};
            `);
            } else if (!bubbleClicked) {
                let x = Math.floor(Math.random() * canvasWidth)
                let y = Math.floor(Math.random() * canvasHeight)
                let degree = Math.floor(Math.random() * 180) * (index % 2 === 0 ? 1 : -1)
                let color = palette[Math.floor(Math.random() * palette.length)]
                bubble.setAttribute('style', `
                    left: ${x}px;
                    top: ${y}px;
                    transform: rotate(${degree}deg);
                    color: ${color};
                    border-color:${color};
                    background: ${nightMode ? 'black' : 'white'};
                `);
            }
        })
    }

    onClick(id) {
        const {
            selectedId,
            onBubbleClick
        } = this.props
        if (id !== selectedId) {
            this.setState({ bubbleClicked: true })
            onBubbleClick(id)
        }
    }

    render() {
        const {
            data,
            selectedId,
            children
        } = this.props
        return (<div className="canvas">
            {data.map((item) => {
                let classNames = ['bubble']
                let focused = this.getId(item) === selectedId
                if (focused) {
                    classNames.push('focused')
                }
                return <div className={classNames.join(" ")}
                    key={this.getId(item)} id={this.getId(item)}
                    onClick={() => this.onClick(this.getId(item))}>
                    {focused ? children : item.name}
                </div>
            })}
        </div>)
    }
}

Bubbles.defaultProps = {
    identifier: 'id',
    selectedId: '',
    onBubbleClick: noop
}

export default Bubbles
