import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem'

configure({adapter: new Adapter()})


describe('<NavigationItems />', ()=>{
    it('shoould render two <NavigationItems /> if not authenticated', ()=>{
        const wrapper = shallow(<NavigationItems />);
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    })

    it('shoould render 3 <NavigationItems /> if authenticated', ()=>{
        const wrapper = shallow(<NavigationItems isAuthenticated/>);
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    })

    it('shoould render 3 <NavigationItems /> if authenticated', ()=>{
        const wrapper = shallow(<NavigationItems isAuthenticated/>);
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true)
    })
});