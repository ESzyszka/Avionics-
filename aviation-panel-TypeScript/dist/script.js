"use strict";
class AviationInstrumentPanel {
    constructor() {
        this.airspeed = 120;
        this.altitude = 5500;
        this.verticalSpeed = 0;
        this.turnRate = 0;
        this.heading = 0;
        this.pitch = 0;
        this.elements = {};
        this.initializeElements();
        this.bindEvents();
        this.createGaugeMarkings();
        this.animate();
    }
    initializeElements() {
        // Airspeed elements
        this.elements.airspeedNeedle = document.querySelector('.airspeed-needle');
        this.elements.airspeedValue = document.getElementById('airspeed-value');
        this.elements.airspeedControl = document.getElementById('airspeed-control');
        this.elements.airspeedControlValue = document.getElementById('airspeed-control-value');
        // VSI elements
        this.elements.vsiNeedle = document.querySelector('.vsi-needle');
        this.elements.vsiValue = document.getElementById('vsi-value');
        this.elements.verticalSpeedControl = document.getElementById('vertical-speed-control');
        this.elements.verticalSpeedControlValue = document.getElementById('vertical-speed-control-value');
        // Altimeter elements
        this.elements.altHundreds = document.getElementById('alt-hundreds');
        this.elements.altThousands = document.getElementById('alt-thousands');
        this.elements.altimeterNeedle = document.querySelector('.altimeter-needle');
        this.elements.altitudeControl = document.getElementById('altitude-control');
        this.elements.altitudeControlValue = document.getElementById('altitude-control-value');
        // Turn coordinator elements
        this.elements.turnBall = document.querySelector('.turn-ball');
        this.elements.planeIcon = document.querySelector('.plane-icon');
        this.elements.turnRateDisplay = document.getElementById('turn-rate');
        this.elements.turnRateControl = document.getElementById('turn-rate-control');
        this.elements.turnRateControlValue = document.getElementById('turn-rate-control-value');
        // Attitude indicator elements
        this.elements.horizonBackground = document.querySelector('.horizon-background');
        this.elements.pitchControl = document.getElementById('pitch-control');
        this.elements.pitchControlValue = document.getElementById('pitch-control-value');
        // Heading indicator elements
        this.elements.compassRose = document.querySelector('.compass-rose');
        this.elements.headingValue = document.getElementById('heading-value');
        this.elements.headingControl = document.getElementById('heading-control');
        this.elements.headingControlValue = document.getElementById('heading-control-value');
        // Status
        this.elements.flightStatus = document.getElementById('flight-status');
    }
    bindEvents() {
        if (this.elements.airspeedControl) {
            this.elements.airspeedControl.addEventListener('input', (e) => {
                const target = e.target;
                this.updateAirspeed(target.value);
            });
        }
        if (this.elements.altitudeControl) {
            this.elements.altitudeControl.addEventListener('input', (e) => {
                const target = e.target;
                this.updateAltitude(target.value);
            });
        }
        if (this.elements.verticalSpeedControl) {
            this.elements.verticalSpeedControl.addEventListener('input', (e) => {
                const target = e.target;
                this.updateVerticalSpeed(target.value);
            });
        }
        if (this.elements.turnRateControl) {
            this.elements.turnRateControl.addEventListener('input', (e) => {
                const target = e.target;
                this.updateTurnRate(target.value);
            });
        }
        if (this.elements.headingControl) {
            this.elements.headingControl.addEventListener('input', (e) => {
                const target = e.target;
                this.updateHeading(target.value);
            });
        }
        if (this.elements.pitchControl) {
            this.elements.pitchControl.addEventListener('input', (e) => {
                const target = e.target;
                this.updatePitch(target.value);
            });
        }
    }
    updateAirspeed(value) {
        this.airspeed = parseInt(value, 10);
        if (this.elements.airspeedControlValue) {
            this.elements.airspeedControlValue.textContent = this.airspeed.toString();
        }
        // Update flight status based on airspeed
        if (this.elements.flightStatus) {
            if (this.airspeed < 55) {
                this.elements.flightStatus.textContent = 'STALL WARNING';
                this.elements.flightStatus.style.color = '#ff0000';
            }
            else if (this.airspeed >= 55 && this.airspeed <= 180) {
                this.elements.flightStatus.textContent = 'NORMAL FLIGHT';
                this.elements.flightStatus.style.color = '#00ff00';
            }
            else if (this.airspeed > 180 && this.airspeed <= 250) {
                this.elements.flightStatus.textContent = 'HIGH SPEED';
                this.elements.flightStatus.style.color = '#ffff00';
            }
            else {
                this.elements.flightStatus.textContent = 'DANGER';
                this.elements.flightStatus.style.color = '#ff0000';
            }
        }
    }
    updateAltitude(value) {
        this.altitude = parseInt(value, 10);
        if (this.elements.altitudeControlValue) {
            this.elements.altitudeControlValue.textContent = this.altitude.toString();
        }
    }
    updateVerticalSpeed(value) {
        this.verticalSpeed = parseInt(value, 10);
        if (this.elements.verticalSpeedControlValue) {
            this.elements.verticalSpeedControlValue.textContent = this.verticalSpeed.toString();
        }
    }
    updateTurnRate(value) {
        this.turnRate = parseFloat(value);
        if (this.elements.turnRateControlValue) {
            this.elements.turnRateControlValue.textContent = this.turnRate.toString();
        }
    }
    updateHeading(value) {
        this.heading = parseInt(value, 10);
        if (this.elements.headingControlValue) {
            this.elements.headingControlValue.textContent = this.heading.toString();
        }
    }
    updatePitch(value) {
        this.pitch = parseFloat(value);
        if (this.elements.pitchControlValue) {
            this.elements.pitchControlValue.textContent = this.pitch.toString();
        }
    }
    createGaugeMarkings() {
        this.createAirspeedMarkings();
        this.createVSIMarkings();
        this.createAltimeterMarkings();
    }
    createAirspeedMarkings() {
        const airspeedFace = document.querySelector('.airspeed-indicator .instrument-face');
        if (!airspeedFace)
            return;
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
                number.textContent = speed.toString();
                markingsContainer.appendChild(number);
            }
        }
        airspeedFace.appendChild(markingsContainer);
    }
    createVSIMarkings() {
        const vsiFace = document.querySelector('.vsi .instrument-face');
        if (!vsiFace)
            return;
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
                number.textContent = (vs / 100).toString();
                markingsContainer.appendChild(number);
            }
        }
        vsiFace.appendChild(markingsContainer);
    }
    createAltimeterMarkings() {
        const altimeterFace = document.querySelector('.altimeter .instrument-face');
        if (!altimeterFace)
            return;
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
        if (this.elements.airspeedNeedle) {
            this.elements.airspeedNeedle.style.transform = `translateX(-50%) translateY(-100%) rotate(${airspeedAngle}deg)`;
        }
        if (this.elements.airspeedValue) {
            this.elements.airspeedValue.textContent = this.airspeed.toString();
        }
        // Update VSI needle
        const vsiAngle = (this.verticalSpeed / 2000) * 90;
        if (this.elements.vsiNeedle) {
            this.elements.vsiNeedle.style.transform = `translateX(-50%) translateY(-100%) rotate(${vsiAngle}deg)`;
        }
        if (this.elements.vsiValue) {
            this.elements.vsiValue.textContent = this.verticalSpeed.toString();
        }
        // Update altimeter
        const altHundreds = Math.floor((this.altitude % 1000) / 100);
        const altThousands = Math.floor(this.altitude / 1000);
        if (this.elements.altHundreds) {
            this.elements.altHundreds.textContent = altHundreds.toString().padStart(2, '0');
        }
        if (this.elements.altThousands) {
            this.elements.altThousands.textContent = altThousands.toString().padStart(2, '0');
        }
        const altimeterAngle = ((this.altitude % 1000) / 1000) * 360;
        if (this.elements.altimeterNeedle) {
            this.elements.altimeterNeedle.style.transform = `translateX(-50%) translateY(-100%) rotate(${altimeterAngle}deg)`;
        }
        // Update turn coordinator ball (slip/skid indicator)
        const ballOffset = Math.max(-30, Math.min(30, this.turnRate * 10));
        const ballPosition = 50 + (ballOffset / 80) * 100; // Convert to percentage within container
        if (this.elements.turnBall) {
            this.elements.turnBall.style.left = `${Math.max(15, Math.min(85, ballPosition))}%`;
        }
        // Update airplane symbol rotation (rate of turn indicator)
        const planeRotation = this.turnRate * 10; // Scale turn rate for visible rotation
        if (this.elements.planeIcon) {
            this.elements.planeIcon.style.transform = `translateX(-50%) rotate(${planeRotation}deg)`;
        }
        if (this.elements.turnRateDisplay) {
            this.elements.turnRateDisplay.textContent = this.turnRate.toFixed(1);
        }
        // Update attitude indicator
        if (this.elements.horizonBackground) {
            this.elements.horizonBackground.style.transform = `rotateX(${this.pitch}deg)`;
        }
        // Update heading indicator
        if (this.elements.compassRose) {
            this.elements.compassRose.style.transform = `rotate(${-this.heading}deg)`;
        }
        if (this.elements.headingValue) {
            this.elements.headingValue.textContent = this.heading.toString().padStart(3, '0') + '°';
        }
        requestAnimationFrame(() => this.animate());
    }
}
// Initialize the aviation panel when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new AviationInstrumentPanel();
});
//# sourceMappingURL=script.js.map