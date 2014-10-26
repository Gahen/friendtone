'use strict';

/**
 * @ngdoc directive
 * @name friendtoneApp.directive:ftAudioShare
 * @description
 * # ftAudioShare
 */
angular.module('friendtoneApp')
    .directive('ftAudioShare', function ($window, mySocket) {
        return {
            templateUrl: '/views/directives/audioshare.html',
            restrict: 'E',
            link: function postLink($scope, element) {
                var navigator = $window.navigator;
                var RecordRTC = $window.RecordRTC;
                var session = {
                    audio: true
                };

                var recordRTC;

                var pc = new $window.RTCPeerConnection();
                pc.onaddstream = function(obj) {
                    var audio = angular.element('<audio></audio>');
                    element.append(audio);
                    audio[0].srcObject = obj.stream;
                };

                // Helper functions
                function endCall() {
                    var audios = document.getElementsByTagName('audio');
                    for (var i = 0; i < audios.length; i++) {
                        audios[i].pause();
                    }
                    pc.close();
                }

                function error() { endCall(); }

                $scope.connect = function() {
                    // Get a list of friends from a server
                    // User selects a friend to start a peer connection with
                    navigator.getUserMedia(session, function(stream) {
                        pc.onaddstream({stream: stream});
                        // Adding a local stream won't trigger the onaddstream callback
                        pc.addStream(stream);

                        pc.createOffer(function(offer) {
                            pc.setLocalDescription(new $window.RTCSessionDescription(offer), function() {
                                mySocket.send(JSON.stringify(offer));
                            }, error);
                        }, error);
                    }, error);

                };

                mySocket.setHandler('message', function(msg) {
                    $scope.offers = [  JSON.parse(msg) ];
                });

                $scope.record = function() {
                    navigator.getUserMedia(session, function (mediaStream) {
                        recordRTC = RecordRTC(mediaStream);
                        recordRTC.startRecording();
                    }, error);
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
            }
        };
    });
