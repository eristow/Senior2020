/* eslint-disable */
import React, { Component } from 'react';
import './Wave.css';
import 'video.js/dist/video-js.css';
import videojs from 'video.js';
import WaveSurfer from 'wavesurfer.js';
/*
// the following imports are only needed when you're using
// the microphone plugin
import 'webrtc-adapter';

import MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone.js';
WaveSurfer.microphone = MicrophonePlugin;
*/

// register videojs-wavesurfer plugin with this import
import 'videojs-wavesurfer/dist/css/videojs.wavesurfer.css';
import Wavesurfer from 'videojs-wavesurfer/dist/videojs.wavesurfer.js';
class WaveImg extends Component {
    componentDidMount() {
        // instantiate Video.js
        this.player = videojs(this.audioNode, this.props, () => {
            // print version information at startup
            var version_info = 'Using video.js ' + videojs.VERSION +
                ' with videojs-wavesurfer ' + videojs.getPluginVersion('wavesurfer') +
                ' and wavesurfer.js ' + WaveSurfer.VERSION;
            videojs.log(version_info);
        });

        this.player.on('waveReady', (event) => {
            console.log('waveform: ready!');
        });

        this.player.on('playbackFinish', (event) => {
            console.log('playback finished.');
        });

        // error handling
        this.player.on('error', (element, error) => {
            console.error(error);
        });
    }

    // destroy player on unmount
    componentWillUnmount() {
        if (this.player) {
            this.player.dispose();
        }
    }
    render() {
        return (
        <div data-vjs-player>
            <audio ref={node => this.audioNode = node} className="video-js waveform"></audio>
        </div>
        );
    }
}

export default WaveImg;
