import {
  selectDrumMachineDomain,
  makeSelectSelectedKit,
  makeSelectVol,
  makeSelectTempo,
  makeSelectPlaying,
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

  describe('makeSelectSelectedKit', () => {
    const selectedKitSelector = makeSelectSelectedKit();
    it('Should select the selected kit', () => {
      const selectedKit = 2;
      const mockedState = {
        drumMachine: {
          selectedKit,
        },
      };

      expect(selectedKitSelector(mockedState)).toEqual(selectedKit);
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

  describe('makeSelectTempo', () => {
    const tempoSelector = makeSelectTempo();
    it('Should select the tempo', () => {
      const tempo = '2';
      const mockedState = {
        drumMachine: {
          tempo,
        },
      };

      expect(tempoSelector(mockedState)).toEqual(tempo);
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
});
