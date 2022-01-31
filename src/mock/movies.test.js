import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Movies from './movies';
import mockAxios from 'axios';

jest.mock("axios");
mockAxios.get.mockImplementation(() => Promise.resolve({
  data: {
    title: 'Aniket Kumar',
    status:'success'
  }
}))
configure({ adapter: new Adapter() }) // Connecting Enzyme

describe('<Movies />', () => {
    it("axios test", async () => {
      const result = await Movies();
      console.log(result);
      expect(result.title).toBe('Aniket Kumar')
      expect(mockAxios.get).toHaveBeenCalledTimes(1);
      
  });
})