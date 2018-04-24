import React from 'react';
import style from './Particle.scss';
import Part from 'react-particles-js';
import params from './ParticleSettings.js';

export default class Particle extends React.Component{
    render(){
        try{
            return( 
                <div className={style.container}>    
                    <Part params={params} className={style.canvas}/>
                </div>
            )
        }
        catch(error){
            return <Part params={params} className={style.canvas}/>
        }
        
    }
}