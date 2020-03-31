import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'
configure({adapter : new Adapter()})

describe('<NavigationItems />', () => {
    let wrapper = null;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />)
    })

    it('should  render two <NavigationItems /> element if not authenticated',
    () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2)
    });

    it('should  render two <NavigationItems /> element if  authenticated',
    () => {
        wrapper.setProps({isAuth : true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    });

    it('should  render  <NavigationItems /> element if  authenticated and exact match',
    () => {
        wrapper.setProps({isAuth : true})
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true)
    });
})