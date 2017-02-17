/*
import React from 'react';
import { shallow } from 'enzyme';
import ProjectItem from './app/components/ProjectItem';

const wrapper = shallow(<ProjectItem/>);

describe('(Component) MyComponent', () => {
    it('renders without exploding', () => {
        expect(wrapper).to.have.length(1);
    });
});
*/


var chai = require('chai');

// Load Chai assertions
var expect = chai.expect;
var assert = chai.assert;
chai.should();

describe('utils', function () {
var utils = require('./app/utils/utils')
    it('should return computed percentage from getPercentage', function () {
        expect(utils.getPercentage(10,100)).to.equal(10);
        expect(utils.getPercentage(20,80)).to.equal(25);
    });

});