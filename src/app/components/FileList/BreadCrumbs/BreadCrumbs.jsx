import React from 'react';
import { connect } from 'react-redux';
import styles from './BreadCrumbs.scss';
import { setDir, resetList } from '../../../actions/filepage.actions';
import {createApolloFetch} from 'apollo-fetch';
import {URL as IP} from '../../../const';

var _fetch = createApolloFetch({uri:IP+'/graphql'})

class BreadCrumbs extends React.Component {
    constructor(props) {
        super(props);
        this.setBread = this.setBread.bind(this);
    }

    setBread(file) {
        let bread = [];
        let key = 0;
        /* part = part.substring(0, part.length - 1);
        if (part == '') {
            return;
        }
        bread.push(<div key={key++} className={styles.crumb} onClick={(e) => {
            e.preventDefault();
            let newPath = dir.slice(0, dir.indexOf(part != 'root' ? part + '/' : '/') + 1);
            console.log(newPath);
            this.props.dispatch(setDir(newPath));
            this.props.dispatch(resetList(newPath));
        }}>{part}</div>); */
        this.props.dir.forEach(path => {
            if(path!==''){
                var query = `query{file(_id:"${path}" token:"${localStorage.getItem('token')}"){
                    _id,
                    name,
                }}`
                _fetch({query}).then(res=>{
                    console.log(res);
                    if(res.data.file){
                        console.log(res.data.file);
                        bread.push((<div key={key++} className={styles.crumb}>
                                {res.data.file.name}
                            </div>))
                    }
                })
            }
        })
        return bread;
    }

    render() {
        let breadcrumbs = this.setBread(this.props.dir);

        return (
            <div className={styles.cont}>
                {breadcrumbs}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state.fileListReducer;
}

export default connect(mapStateToProps)(BreadCrumbs);