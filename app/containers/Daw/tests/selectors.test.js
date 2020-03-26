import {
  selectDawDomain,
  makeSelectMenuStates,
  makeSelectBpm,
  makeSelectVol,
  makeSelectTrackVol,
  makeSelectPlaying,
  makeSelectCurrentStep,
  makeSelectStepState,
  makeSelectSelectedTrack,
  makeSelectTrackNames,
  makeSelectSideBarOpen,
} from '../selectors';

describe('selectDawDomain', () => {
  describe('selectDawDomain', () => {
    it('Should select the Daw domain', () => {
      const dawState = {
        dawData: {},
      };
      const mockedState = {
        daw: dawState,
      };

      expect(selectDawDomain(mockedState)).toEqual(dawState);
    });
  });

  describe('makeSelectMenuStates', () => {
    const menuStatesSelector = makeSelectMenuStates();
    it('Should select the menu states', () => {
      const menuStates = { File: false };
      const mockedState = {
        daw: {
          menuStates,
        },
      };

      expect(menuStatesSelector(mockedState)).toEqual(menuStates);
    });
  });

  describe('makeSelectBpm', () => {
    const bpmSelector = makeSelectBpm();
    it('Should select the bpm', () => {
      const bpm = '80';
      const mockedState = {
        daw: {
          bpm,
        },
      };

      expect(bpmSelector(mockedState)).toEqual(bpm);
    });
  });

  describe('makeSelectVol', () => {
    const volSelector = makeSelectVol();
    it('Should select the vol', () => {
      const vol = -10;
      const mockedState = {
        daw: {
          vol,
        },
      };

      expect(volSelector(mockedState)).toEqual(vol);
    });
  });

  describe('makeSelectTrackVol', () => {
    const trackVolSelector = makeSelectTrackVol();
    it('Should select the track vols', () => {
      const trackVol = [-10];
      const mockedState = {
        daw: {
          trackVol,
        },
      };

      expect(trackVolSelector(mockedState)).toEqual(trackVol);
    });
  });

  describe('makeSelectPlaying', () => {
    const playingSelector = makeSelectPlaying();
    it('Should select the playing indicator', () => {
      const playing = false;
      const mockedState = {
        daw: {
          playing,
        },
      };

      expect(playingSelector(mockedState)).toEqual(playing);
    });
  });

  describe('makeSelectCurrentStep', () => {
    const currentStepSelector = makeSelectCurrentStep();
    it('Should select the current step', () => {
      const currentStep = 1;
      const mockedState = {
        daw: {
          currentStep,
        },
      };

      expect(currentStepSelector(mockedState)).toEqual(currentStep);
    });
  });

  describe('makeSelectStepState', () => {
    const stepStateSelector = makeSelectStepState();
    it('Should select the step state', () => {
      const stepState = [[0]];
      const mockedState = {
        daw: {
          stepState,
        },
      };

      expect(stepStateSelector(mockedState)).toEqual(stepState);
    });
  });

  describe('makeSelectSelectedTrack', () => {
    const selectedTrackSelector = makeSelectSelectedTrack();
    it('Should select the selected track', () => {
      const selectedTrack = 'Track1';
      const mockedState = {
        daw: {
          selectedTrack,
        },
      };

      expect(selectedTrackSelector(mockedState)).toEqual(selectedTrack);
    });
  });

  describe('makeSelectTrackNames', () => {
    const trackNamesSelector = makeSelectTrackNames();
    it('Should select the track names', () => {
      const trackNames = ['Track 1'];
      const mockedState = {
        daw: {
          trackNames,
        },
      };

      expect(trackNamesSelector(mockedState)).toEqual(trackNames);
    });
  });

  describe('makeSelectSideBarOpen', () => {
    const sideBarOpenSelector = makeSelectSideBarOpen();
    it('Should select the menu states', () => {
      const sideBarOpen = false;
      const mockedState = {
        daw: {
          sideBarOpen,
        },
      };

      expect(sideBarOpenSelector(mockedState)).toEqual(sideBarOpen);
    });
  });
});
