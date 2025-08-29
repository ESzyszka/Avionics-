class AviationInstrumentPanel {
  constructor() {
    this.airspeed = 120;
    this.altitude = 5500;
    this.verticalSpeed = 0;
    this.turnRate = 0;
    this.heading = 0;
    this.pitch = 0;

    this.initializeElements();
    this.bindEvents();
    this.createGaugeMarkings();
    this.animate();
  }

  initializeElements() {
    // Airspeed elements
    this.airspeedNeedle = document.querySelector('.airspeed-needle');
    this.airspeedValue = document.getElementById('airspeed-value');
    this.airspeedControl = document.getElementById('airspeed-control');
    this.airspeedControlValue = document.getElementById('airspeed-control-value');

    // VSI elements
    this.vsiNeedle = document.querySelector('.vsi-needle');
    this.vsiValue = document.getElementById('vsi-value');
    this.verticalSpeedControl = document.getElementById('vertical-speed-control');
    this.verticalSpeedControlValue = document.getElementById('vertical-speed-control-value');

    // Altimeter elements
    this.altHundreds = document.getElementById('alt-hundreds');
    this.altThousands = document.getElementById('alt-thousands');
    this.altimeterNeedle = document.querySelector('.altimeter-needle');
    this.altitudeControl = document.getElementById('altitude-control');
    this.altitudeControlValue = document.getElementById('altitude-control-value');

    // Turn coordinator elements
    this.turnBall = document.querySelector('.turn-ball');
    this.turnRateDisplay = document.getElementById('turn-rate');
    this.turnRateControl = document.getElementById('turn-rate-control');
    this.turnRateControlValue = document.getElementById('turn-rate-control-value');

    // Attitude indicator elements
    this.horizonBackground = document.querySelector('.horizon-background');
    this.pitchControl = document.getElementById('pitch-control');
    this.pitchControlValue = document.getElementById('pitch-control-value');

    // Heading indicator elements
    this.compassRose = document.querySelector('.compass-rose');
    this.headingValue = document.getElementById('heading-value');
    this.headingControl = document.getElementById('heading-control');
    this.headingControlValue = document.getElementById('heading-control-value');

    // Status
    this.flightStatus = document.getElementById('flight-status');
  }

  bindEvents() {
    this.airspeedControl.addEventListener('input', (e) => this.updateAirspeed(e.target.value));
    this.altitudeControl.addEventListener('input', (e) => this.updateAltitude(e.target.value));
    this.verticalSpeedControl.addEventListener('input', (e) => this.updateVerticalSpeed(e.target.value));
    this.turnRateControl.addEventListener('input', (e) => this.updateTurnRate(e.target.value));
    this.headingControl.addEventListener('input', (e) => this.updateHeading(e.target.value));
    this.pitchControl.addEventListener('input', (e) => this.updatePitch(e.target.value));
  }

  updateAirspeed(value) {
    this.airspeed = parseInt(value);
    this.airspeedControlValue.textContent = this.airspeed;

    // Update flight status based on airspeed
    if (this.airspeed < 55) {
      this.flightStatus.textContent = 'STALL WARNING';
      this.flightStatus.style.color = '#ff0000';
    } else if (this.airspeed >= 55 && this.airspeed <= 180) {
      this.flightStatus.textContent = 'NORMAL FLIGHT';
      this.flightStatus.style.color = '#00ff00';
    } else if (this.airspeed > 180 && this.airspeed <= 250) {
      this.flightStatus.textContent = 'HIGH SPEED';
      this.flightStatus.style.color = '#ffff00';
    } else {
      this.flightStatus.textContent = 'DANGER';
      this.flightStatus.style.color = '#ff0000';
    }
  }

  updateAltitude(value) {
    this.altitude = parseInt(value);
    this.altitudeControlValue.textContent = this.altitude;
  }

  updateVerticalSpeed(value) {
    this.verticalSpeed = parseInt(value);
    this.verticalSpeedControlValue.textContent = this.verticalSpeed;
  }

  updateTurnRate(value) {
    this.turnRate = parseFloat(value);
    this.turnRateControlValue.textContent = this.turnRate;
  }

  updateHeading(value) {
    this.heading = parseInt(value);
    this.headingControlValue.textContent = this.heading;
  }

  updatePitch(value) {
    this.pitch = parseFloat(value);
    this.pitchControlValue.textContent = this.pitch;
  }

  createGaugeMarkings() {
    this.createAirspeedMarkings();
    this.createVSIMarkings();
    this.createAltimeterMarkings();
  }

  createAirspeedMarkings() {
    const airspeedFace = document.querySelector('.airspeed-indicator .instrument-face');
    const markingsContainer = document.createElement('div');
    markingsContainer.className = 'airspeed-markings';
    markingsContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    `;

    // Create markings for airspeed indicator
    for (let speed = 0; speed <= 300; speed += 20) {
      const angle = (speed / 300) * 270 - 135;
      const marking = document.createElement('div');
      const isMajor = speed % 40 === 0;

      marking.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: ${isMajor ? '2px' : '1px'};
        height: ${isMajor ? '20px' : '10px'};
        background: #fff;
        transform-origin: bottom center;
        transform: translate(-50%, -100%) rotate(${angle}deg);
        box-shadow: 0 0 3px rgba(255, 255, 255, 0.5);
      `;
      markingsContainer.appendChild(marking);

      // Add speed numbers for major markings
      if (isMajor) {
        const number = document.createElement('div');
        const numberAngle = angle;
        const numberDistance = 110;
        const numberX = Math.sin(numberAngle * Math.PI / 180) * numberDistance;
        const numberY = -Math.cos(numberAngle * Math.PI / 180) * numberDistance;

        number.style.cssText = `
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(${numberX}px, ${numberY}px) translate(-50%, -50%);
          color: #fff;
          font-size: 10px;
          font-weight: bold;
          text-shadow: 0 0 3px rgba(255, 255, 255, 0.5);
        `;
        number.textContent = speed;
        markingsContainer.appendChild(number);
      }
    }

    airspeedFace.appendChild(markingsContainer);
  }

  createVSIMarkings() {
    const vsiFace = document.querySelector('.vsi .instrument-face');
    const markingsContainer = document.createElement('div');
    markingsContainer.className = 'vsi-markings';
    markingsContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    `;

    // Create markings for VSI
    for (let vs = -2000; vs <= 2000; vs += 500) {
      const angle = (vs / 2000) * 90; // VSI typically shows ±2000 fpm
      const marking = document.createElement('div');
      const isMajor = Math.abs(vs) % 1000 === 0;

      marking.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: ${isMajor ? '2px' : '1px'};
        height: ${isMajor ? '15px' : '8px'};
        background: #fff;
        transform-origin: bottom center;
        transform: translate(-50%, -100%) rotate(${angle}deg);
        box-shadow: 0 0 3px rgba(255, 255, 255, 0.5);
      `;
      markingsContainer.appendChild(marking);

      // Add VS numbers for major markings
      if (isMajor && vs !== 0) {
        const number = document.createElement('div');
        const numberAngle = angle;
        const numberDistance = 100;
        const numberX = Math.sin(numberAngle * Math.PI / 180) * numberDistance;
        const numberY = -Math.cos(numberAngle * Math.PI / 180) * numberDistance;

        number.style.cssText = `
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(${numberX}px, ${numberY}px) translate(-50%, -50%);
          color: #fff;
          font-size: 9px;
          font-weight: bold;
          text-shadow: 0 0 3px rgba(255, 255, 255, 0.5);
        `;
        number.textContent = vs / 100;
        markingsContainer.appendChild(number);
      }
    }

    vsiFace.appendChild(markingsContainer);
  }

  createAltimeterMarkings() {
    const altimeterFace = document.querySelector('.altimeter .instrument-face');
    const markingsContainer = document.createElement('div');
    markingsContainer.className = 'altimeter-markings';
    markingsContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    `;

    // Create markings for altimeter (0-360 degrees for 100ft increments)
    for (let angle = 0; angle < 360; angle += 30) {
      const marking = document.createElement('div');
      const isMajor = angle % 90 === 0;

      marking.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: ${isMajor ? '2px' : '1px'};
        height: ${isMajor ? '15px' : '8px'};
        background: #fff;
        transform-origin: bottom center;
        transform: translate(-50%, -100%) rotate(${angle}deg);
        box-shadow: 0 0 3px rgba(255, 255, 255, 0.5);
      `;
      markingsContainer.appendChild(marking);
    }

    altimeterFace.appendChild(markingsContainer);
  }

  animate() {
    // Update airspeed needle
    const airspeedAngle = (this.airspeed / 300) * 270 - 135;
    this.airspeedNeedle.style.transform = `translateX(-50%) translateY(-100%) rotate(${airspeedAngle}deg)`;
    this.airspeedValue.textContent = this.airspeed;

    // Update VSI needle
    const vsiAngle = (this.verticalSpeed / 2000) * 90;
    this.vsiNeedle.style.transform = `translateX(-50%) translateY(-100%) rotate(${vsiAngle}deg)`;
    this.vsiValue.textContent = this.verticalSpeed;

    // Update altimeter
    const altHundreds = Math.floor((this.altitude % 1000) / 100);
    const altThousands = Math.floor(this.altitude / 1000);
    this.altHundreds.textContent = altHundreds.toString().padStart(2, '0');
    this.altThousands.textContent = altThousands.toString().padStart(2, '0');

    const altimeterAngle = ((this.altitude % 1000) / 1000) * 360;
    this.altimeterNeedle.style.transform = `translateX(-50%) translateY(-100%) rotate(${altimeterAngle}deg)`;

    // Update turn coordinator ball
    const ballOffset = Math.max(-30, Math.min(30, this.turnRate * 10));
    this.turnBall.style.transform = `translateX(${ballOffset}px)`;
    this.turnRateDisplay.textContent = `${this.turnRate}°/SEC`;

    // Update attitude indicator
    this.horizonBackground.style.transform = `rotateX(${this.pitch}deg)`;

    // Update heading indicator
    this.compassRose.style.transform = `rotate(${-this.heading}deg)`;
    this.headingValue.textContent = this.heading.toString().padStart(3, '0') + '°';

    requestAnimationFrame(() => this.animate());
  }
}

// Initialize the aviation panel when the page loads
document.addEventListener('DOMContentLoaded', () => {
  new AviationInstrumentPanel();
});