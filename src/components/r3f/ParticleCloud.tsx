import React from "react";
import * as Constants from "@/constants";

const ParticleCloud: React.FC = () => {
  // Cloud of particles that surrounds the ship
  // As the ship moves, it goes through the particles
  // The particles that get too far away are removed
  // And new particles are added as the ship moves to keep the cloud full
  console.log('Constants.PARTICLE_COUNT', Constants.PARTICLE_COUNT);
  console.log('Constants.PARTICLE_CLOUD_SIZE', Constants.PARTICLE_CLOUD_SIZE);
  return null;
};
export default ParticleCloud;
