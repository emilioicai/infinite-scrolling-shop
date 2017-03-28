import React, { Component } from 'react'

import Ascii from './Ascii'
import Ad from './Ad'
import { AD_RATIO } from '../constants'

var styles = {};

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.adIds = [];
    }

    getAdId(i) {
    	if(this.adIds[i]) return this.adIds[i];

    	let rand = Math.floor(Math.random()*100%16 +1);
    	while(rand === this.adIds[i-1]) {
    		rand = Math.floor(Math.random()*100%16 +1);
    	}
    	this.adIds[i] = rand;
    	return rand;
    }

    render() {
        const { asciis, endOfCatalogue, loadingAsciis } = this.props;

        return (
    		<ul style={{textAlign: 'center', paddingTop: 70}}>
				{ asciis.map((ascii, i)=> {
						if(i % AD_RATIO === 0) return [<Ad key={Math.random()*100000} adId={this.getAdId(i/AD_RATIO)} />, <Ascii key={ascii.id} face={ascii.face} price={ascii.price} size={ascii.size} date={ascii.date} />]
						else return <Ascii key={Math.random()*100000} face={ascii.face} price={ascii.price} size={ascii.size} date={ascii.date} />
					})
				}
				{ loadingAsciis && <Ascii key={Math.random()*100000} face="~ Loading... ~"/> }
				{ endOfCatalogue && !loadingAsciis && <Ascii key={Math.random()*100000} face="~ end of catalogue ~"/> }
			</ul>
        )
    }
};

export default Gallery
