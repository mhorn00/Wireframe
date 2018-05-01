import React from 'react';

class FileElement extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        var {file} = this.props;
        return(
            <div>
                <p>{file.name}</p>
                <p>{file.uploadDate}</p>
                <p>{file.type}</p>
                <p>{file.fileSize}</p>
            </div>
        )
    }
}

export default FileElement