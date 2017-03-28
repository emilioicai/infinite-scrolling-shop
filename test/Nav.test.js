import React from 'react'
import { mount, shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import Nav from '../src/components/Nav'

describe('<Nav/>', function() {

	it('should call `onSortSelected` passing the sort field when the selector is changed', function() {
		const onSortSelected = sinon.spy();
		const wrapper = shallow(<Nav onSortSelected={onSortSelected} />);
		const event = {target: {value: 'price'}};
		wrapper.find('select').simulate('change', event);
		expect(onSortSelected).to.have.property('callCount', 1);
		expect(onSortSelected.calledWith(event)).to.equal(true);
	});

});
