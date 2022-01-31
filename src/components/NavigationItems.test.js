import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItem from './NavigationItem';
import NavigationItems from './NavigationItems';

configure({adapter:new Adapter()}) // Connecting Enzyme


describe('<NavigationItems />', () => {  // Will Be Made available By npm run test
    let wrapper;
    beforeEach(() => {   // For writing Multiple Tests
        wrapper = shallow(<NavigationItems />)  // For Isolated Unit Tests
    })
    it('should render two <Navigation /> elements if not authenticated', () => {  // it points to current component and allows to write one test
        // const wrapper = shallow(<NavigationItems />);
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
        // expect(wrapper.find(NavigationItem)).toHaveBeenCalledTimes(1);
    })  

    it('should render three <Navigation /> elements if not authenticated', () => {  // it points to current component and allows to write one test
        // const wrapper = shallow(<NavigationItems auth />);
        wrapper.setProps({ isAuth: true });
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
        // expect(wrapper.find(<NavigationItem></NavigationItem>)).toHaveLength(3);

    })  
    it('should render a node if we r authenticated', () => {  // it points to current component and allows to write one test
        wrapper.setProps({ isAuth: true });
        
        expect(wrapper.contains(<NavigationItem link="/logout">Log out</NavigationItem>)).toEqual(true);
    })  
})


// Each Test Run Independently