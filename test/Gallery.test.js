import React from 'react'
import { mount, shallow } from 'enzyme'
import { expect } from 'chai'

import Gallery from '../src/components/Gallery'

describe('<Gallery/>', function() {

	const yesterday = (Date.now() - 24*60*60*1000);
	const twoWeeksAgo = (Date.now() - 14*24*60*60*1000);
	const oneYearAgo = (Date.now() - 365*24*60*60*1000);
	const asciis = [
		{ id: 1, face: ':)', size: 2, price: 3, date:  yesterday},
		{ id: 2, face: ':(', size: 4, price: 520, date: twoWeeksAgo },
		{ id: 3, face: ':|', size: 6, price: 700, date: oneYearAgo }
	];

	it('should have an <li> element per ascii + one ad', function() {
		const wrapper = mount(<Gallery asciis={asciis} />);
		expect(wrapper.find('li')).to.have.length(asciis.length + 1);
	});

	it('should display price properly formatted', function() {
		const wrapper = mount(<Gallery asciis={asciis} />);
		expect(wrapper.find('li p.price').first().text()).to.contain('$0.03');
		expect(wrapper.find('li p.price').at(1).text()).to.contain('$5.2');
		expect(wrapper.find('li p.price').at(2).text()).to.contain('$7');
	});

	it('should display date in format ...ago if date is shorter than 1 week ago', function() {
		const wrapper = mount(<Gallery asciis={asciis} />);
		expect(wrapper.find('li p.date').first().text()).to.contain('ago');
		expect(wrapper.find('li p.date').at(1).text()).to.not.contain('ago');
	});

	it('should display date in format DD/MM/YYYY if date is shorter than 1 week ago', function() {
		const wrapper = mount(<Gallery asciis={asciis} />);
		expect(wrapper.find('li p.date').first().text()).to.not.contain('/');
		expect(wrapper.find('li p.date').at(1).text()).to.contain('/');
		expect(wrapper.find('li p.date').at(1).text().length).to.equal(10);
	});

	it('should display faces in the proper font size', function() {
		const wrapper = mount(<Gallery asciis={asciis} />);
		expect(wrapper.find('li p.face').first().text()).to.contain(':)');
		expect(wrapper.find('li p.face').first().html().match(/style="([^"]*)"/i)[1]).to.contain('font-size: 2px;');
		expect(wrapper.find('li p.face').at(1).html().match(/style="([^"]*)"/i)[1]).to.contain('font-size: 4px;');
		expect(wrapper.find('li p.face').at(2).html().match(/style="([^"]*)"/i)[1]).to.contain('font-size: 6px;');
	});

	it('should display an <Ad> every twenty faces', function() {
		const longArray = Array.apply(null, Array(50)).map(function (ob, i) {return {id: i, face: ':)', size: 2, price: 3}});
		const wrapper = mount(<Gallery asciis={longArray} />);
		expect(wrapper.find('li')).to.have.length(longArray.length + 3);
		expect(wrapper.find('li').at(0).html()).to.contain('<img class="ad" src="/ad/?r=');
		expect(wrapper.find('li').at(21).html()).to.contain('<img class="ad" src="/ad/?r=');
		expect(wrapper.find('li').at(42).html()).to.contain('<img class="ad" src="/ad/?r=');
	});

});
