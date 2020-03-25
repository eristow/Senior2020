import {
  selectDrumMachineDomain,
  makeSelectConfig,
  makeSelectVol,
  makeSelectTrackVol,
  makeSelectBpm,
  makeSelectPlaying,
  makeSelectStepState,
  makeSelectCurrentStep,
  makeSelectTitle,
  makeSelectLoadUrl,
} from '../selectors';

describe('selectDrumMachineDomain', () => {
  describe('selectDrumMachineDomain', () => {
    it('Should select the DrumMachine domain', () => {
      const drumMachineState = {
        drumMachineData: {},
      };
      const mockedState = {
        drumMachine: drumMachineState,
      };

      expect(selectDrumMachineDomain(mockedState)).toEqual(drumMachineState);
    });
  });

  describe('makeSelectConfig', () => {
    const selectedKitSelector = makeSelectConfig();
    it('Should select the selected config', () => {
      const config = 2;
      const mockedState = {
        drumMachine: {
          config,
        },
      };

      expect(selectedKitSelector(mockedState)).toEqual(config);
    });
  });

  describe('makeSelectVol', () => {
    const volSelector = makeSelectVol();
    it('Should select the vol', () => {
      const vol = 2;
      const mockedState = {
        drumMachine: {
          vol,
        },
      };

      expect(volSelector(mockedState)).toEqual(vol);
    });
  });

  describe('makeSelectTrackVol', () => {
    const trackVolSelector = makeSelectTrackVol();
    it('Should select the track vol', () => {
      const trackVol = { Snare: 1 };
      const mockedState = {
        drumMachine: {
          trackVol,
        },
      };

      expect(trackVolSelector(mockedState)).toEqual(trackVol);
    });
  });

  describe('makeSelectBpm', () => {
    const tempoSelector = makeSelectBpm();
    it('Should select the bpm', () => {
      const bpm = '2';
      const mockedState = {
        drumMachine: {
          bpm,
        },
      };

      expect(tempoSelector(mockedState)).toEqual(bpm);
    });
  });

  describe('makeSelectPlaying', () => {
    const playingSelector = makeSelectPlaying();
    it('Should select playing', () => {
      const playing = true;
      const mockedState = {
        drumMachine: {
          playing,
        },
      };

      expect(playingSelector(mockedState)).toEqual(playing);
    });
  });

  describe('makeSelectStepState', () => {
    const stepStateSelector = makeSelectStepState();
    it('Should select the step state', () => {
      const stepState = {
        Snare: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      };
      const mockedState = {
        drumMachine: {
          stepState,
        },
      };

      expect(stepStateSelector(mockedState)).toEqual(stepState);
    });
  });

  describe('makeSelectCurrentStep', () => {
    const currentStepSelector = makeSelectCurrentStep();
    it('Should select the current step', () => {
      const currentStep = 2;
      const mockedState = {
        drumMachine: {
          currentStep,
        },
      };

      expect(currentStepSelector(mockedState)).toEqual(currentStep);
    });
  });

  describe('makeSelectTitle', () => {
    const titleSelector = makeSelectTitle();
    it('Should select the title', () => {
      const title = 'The Title';
      const mockedState = {
        drumMachine: {
          title,
        },
      };

      expect(titleSelector(mockedState)).toEqual(title);
    });
  });

  describe('makeSelectLoadUrl', () => {
    const loadUrlSelector = makeSelectLoadUrl();
    it('Should select the load url', () => {
      const loadUrl = 's3aws.com';
      const mockedState = {
        drumMachine: {
          loadUrl,
        },
      };

      expect(loadUrlSelector(mockedState)).toEqual(loadUrl);
    });
  });
});
