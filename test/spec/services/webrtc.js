'use strict';

describe('Service: WebRTC', function () {

  // load the service's module
  beforeEach(module('friendtoneApp'));

  // instantiate service
  var WebRTC;
  beforeEach(inject(function (_WebRTC_) {
    WebRTC = _WebRTC_;
  }));

  it('should do something', function () {
    expect(!!WebRTC).toBe(true);
  });

});
