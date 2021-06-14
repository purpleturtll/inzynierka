import 'react-native';
import React from 'react';
import {create, act} from 'react-test-renderer';
import HomeScreen, {onSeeMorePress} from '../screens/HomeScreen'

const screenTree = create(<HomeScreen />)

describe('HomeScreen component', () => {

    // Porównanie z ostatnim zrzutem z __tests__/__snapshots__
    it('snapshot', () => {
        expect(screenTree).toMatchSnapshot();
    });

    // Spradzenie poprawności zmiany stanu
    it.todo('handleFavChange');

    // Sprawdzenie czy lista zwierząt jest zdefiniowana - do poprawy (0 calli)
    it.todo('onSeeMorePress');
    /*
    it('onSeeMorePress', () => {
        const button = screenTree.root.findByProps({ testID: "SeeMoreButton"}).props;
        act(() => button.onPress());
        const mockedFn = jest.fn(() => onSeeMorePress());
        expect(mockedFn).toBeCalledWith(undefined, expect.anything()); 
    }); 
    */   
});