import { selectTimelineDomain, makeSelectDropdownValue } from '../selectors';

describe('selectTimelineDomain', () => {
  it('Should select the Timeline state', () => {
    const timelineState = {
      timelineData: {},
    };
    const mockedState = {
      timeline: timelineState,
    };

    expect(selectTimelineDomain(mockedState)).toEqual(timelineState);
  });
});

describe('makeSelectDropdownValue', () => {
  const dropdownSelector = makeSelectDropdownValue();
  it('Should select the dropdown value', () => {
    const dropdownValue = '2';
    const mockedState = {
      timeline: {
        dropdownValue,
      },
    };

    expect(dropdownSelector(mockedState)).toEqual(dropdownValue);
  });
});
