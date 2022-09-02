import React, { Component } from 'react';
import Title from './Title';
import missions from '../data/missions';
import MissionCard from './MissionCard';

class Missions extends Component {
  render() {
    const missionsHtmlElement = missions
      .map((mission) => (<MissionCard
        name={ mission.name }
        year={ mission.year }
        country={ mission.country }
        destination={ mission.destination }
        key={ mission.name }
      />));
    return (
      <div data-testid="missions" className="missions">
        <Title headline="Missões" />
        { missionsHtmlElement }
      </div>
    );
  }
}

export default Missions;
