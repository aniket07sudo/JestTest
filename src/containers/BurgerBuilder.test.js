import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BurgerBuilder} from './BurgerBuilder';
import BuildControls from '../components/BuildControls';

configure({adapter:new Adapter()}) // Connecting Enzyme

describe('<BurgerBuilder />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}  />)
    });

    it("should render build controls when receiving props", () => {
        wrapper.setProps({ ing: { salad: 0 } });
        expect(wrapper.find(BuildControls)).toHaveLength(1);
        // expect(wrapper.find("#any-btn").text()).toBe("clickme");
        // expect(wrapper.find("#any-btn")).simulate("click");
    })
})