function calculate(calls, handle, shrink) {
  const load = calls * handle / 3600;
  let erlangB = 1;
  for (let agents = 1; agents < 2000; agents++) {
    erlangB = load * erlangB / (agents + load * erlangB);
    if (agents <= load) continue;
    const utilization = load / agents;
    const chanceOfWait = erlangB / (1 - utilization + utilization * erlangB);
    const level = 1 - chanceOfWait * Math.exp(-(agents - load) * 20 / handle);
    if (level >= 0.8) return {agents, scheduled: Math.ceil(agents / (1 - shrink / 100)), level};
  }
}
