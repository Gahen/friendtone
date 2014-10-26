'use strict';

navigator.getUserMedia = (
  navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia
);

/**
 * @ngdoc function
 * @name friendtoneApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the friendtoneApp
 */
angular.module('friendtoneApp')
    .controller('RecordRTC', function ($scope, $window) {
        var navigator = $window.navigator;
        var RecordRTC = $window.RecordRTC;
        var session = {
            audio: true
        };

        var recordRTC;

        $scope.record = function() {
            navigator.getUserMedia(session, function (mediaStream) {
                recordRTC = RecordRTC(mediaStream);
                recordRTC.startRecording();
            }, function(){
                console.log('Browser not supported');
            });
        };

        $scope.stop = function () {
            recordRTC.stopRecording(function (audioUrl) {
                $scope.audioSrc = audioUrl;

                var recordedBlob = recordRTC.getBlob();
                console.log(recordedBlob);
                /*
                recordRTC.getDataURL(function(dataURL) { });
                */
            });
        };

        $scope.switchRecord = function() {
            $scope.state = !$scope.state;
            return $scope.state ? $scope.record(): $scope.stop();
        };
    })


// another test

    .controller('RecordJS', function ($scope, $window) {
        /// ???? 
        var navigator = $window.navigator;
        var Recorder = $window.Recorder;

        var Context = $window.AudioContext || $window.webkitAudioContext;
        var context = new Context();

        // end ???

        // we need these variables for later use with the stop function
        var mediaStream;
        var rec;

        $scope.record = function() {
            // ask for permission and start recording
            navigator.getUserMedia({audio: true}, function(localMediaStream){
                mediaStream = localMediaStream;

                // create a stream source to pass to Recorder.js
                var mediaStreamSource = context.createMediaStreamSource(localMediaStream);

                // create new instance of Recorder.js using the mediaStreamSource
                rec = new Recorder(mediaStreamSource, {
                    // pass the path to recorderWorker.js file here
                    workerPath: '/bower_components/Recorderjs/recorderWorker.js'
                });

                rec.record();
            }, function(){
                console.log('Browser not supported');
            });
        };

        $scope.stop = function() {
            // stop the media stream
            mediaStream.stop();

            // stop Recorder.js
            rec.stop();

            // export it to WAV
            rec.exportWAV(function(e){
                rec.clear();
                Recorder.forceDownload(e, 'filename.wav');
            });
        };

        var state;
        $scope.switchRecord = function() {
            state = !state;
            return state ? $scope.record(): $scope.stop();
        };
    });
