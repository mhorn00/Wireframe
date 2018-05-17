import React from 'react';
import { connect } from 'react-redux';
import { DragSource, DragLayer } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend';

function collect(monitor) {
    return {
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging()
    };
}

class DraggingFile extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (!this.props.isDragging)
            return null;
        return (
            <div style={{ background: 'black' }}>
                <p> hi </p>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default DragLayer(collect)(connect(mapStateToProps)(DraggingFile));