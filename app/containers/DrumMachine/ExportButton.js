import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Tone from 'tone';
import Modal from 'react-modal';
import lame from 'lamejs';
import Recorder from 'recorder-js';
import { useInjectReducer } from 'utils/injectReducer';

import reducer from './reducer';
import { changeExportIds } from './actions';
import { makeSelectExportIds, makeSelectTitle } from './selectors';

const key = 'drumMachine';

const Button = styled.button`
  color: deepskyblue;
  border: 2px solid deepskyblue;
  background: #ffffff00;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  padding: 10px;
  font-size: 18px;
  border-radius: 4px;
  margin: 2px 2px;
  align-self: center;
  min-width: 100px;

  &:active {
    background: deepskyblue;
    color: white;
  }
`;

const Error = styled.p`
  color: #eeeeee;
`;

const modalStyles = {
  content: {
    top: '30%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'gray',
    width: 'auto',
    maxWidth: '750px',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.4)',
  },
};

export const ExportButton = ({
  buffers,
  steps,
  exportIds,
  title,
  setExportIds,
}) => {
  useInjectReducer({ key, reducer });

  const [modalString, setModalString] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const exportProject = () => {
    setModalString('Exporting...');
    setModalIsOpen(true);

    exportIds.forEach(exportId => {
      Tone.Transport.clear(exportId);
    });
    setExportIds([]);

    if (process.env.NODE_ENV !== 'test') {
      const actx = Tone.context;
      const dest = actx.createMediaStreamDestination();
      const recorder = new Recorder(dest.stream);

      Object.keys(buffers).forEach(b => {
        buffers[b].disconnect(Tone.Master);
        buffers[b].connect(dest);
      });

      let i = 0;

      const id = Tone.Transport.scheduleRepeat(time => {
        if (i === 0) {
          console.log('start');
          recorder.start();
        }
        if (i > 14) {
          console.log('stop');
          recorder.stop().then(blob => {
            console.log(blob);
          });
          Tone.Transport.stop();

          console.log(recorder);

          // recorder.exportWAV(wav => {
          //   const fileReader = new FileReader();
          //   console.log(wav);

          //   fileReader.onload = () => {
          //     console.log(fileReader.result);
          //     const mp3Data = [];
          //     const samples = new Int16Array(fileReader.result);
          //     console.log(samples);
          //     const mp3encoder = new lame.Mp3Encoder(1, 44100, 128);

          //     let mp3Buffer = mp3encoder.encodeBuffer(samples);
          //     mp3Data.push(mp3Buffer);
          //     mp3Buffer = mp3encoder.flush();
          //     mp3Data.push(mp3Buffer);

          //     const blob = new Blob(mp3Data, { type: 'audio/mp3' });
          //     console.log(blob);

          //     const blobUrl = URL.createObjectURL(blob);

          //     const link = document.createElement('a');
          //     link.href = blobUrl;
          //     link.download = `${title}.mp3`;
          //     link.style.display = 'none';
          //     document.body.appendChild(link);
          //     setModalIsOpen(false);
          //     link.click();
          //     document.body.removeChild(link);
          //   };

          //   fileReader.readAsArrayBuffer(new Blob(wav, { type: 'audio/webm' }));
          //   console.log('after');

          //   Object.keys(buffers).forEach(b => {
          //     buffers[b].disconnect(dest);
          //     buffers[b].connect(Tone.Master);
          //   });
          // });
        }
        Object.keys(buffers).forEach(b => {
          const targetStep = steps[b][i];
          const targetBuffer = buffers[b];

          if (targetStep === 1) {
            targetBuffer.start(time);
          } else if (targetStep === 2) {
            targetBuffer.start();
            targetBuffer.start('+64n');
            targetBuffer.start('+32n');
          }
        });

        // eslint-disable-next-line no-unused-expressions
        i > 14 ? (i = 0) : (i += 1);
      }, '16n');

      setExportIds([...exportIds, id]);

      Tone.Transport.start();
    }
  };

  // const closeModal = () => {
  //   setModalIsOpen(false);
  //   setModalString('');
  // };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        style={modalStyles}
        contentLabel="Exporting Modal"
      >
        <Error>{modalString}</Error>
      </Modal>
      <Button onClick={() => exportProject()}>Export</Button>
    </>
  );
};

ExportButton.propTypes = {
  buffers: PropTypes.object,
  steps: PropTypes.object,
  exportIds: PropTypes.array,
  title: PropTypes.string,
  setExportIds: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  exportIds: makeSelectExportIds(),
  title: makeSelectTitle(),
});

const mapDispatchToProps = dispatch => ({
  setExportIds: value => {
    dispatch(changeExportIds(value));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ExportButton);
