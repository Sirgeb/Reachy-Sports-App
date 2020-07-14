import axios from './axios';

export const getRecentLeagueFixtures = async (leagueId) => {
  const { data: { api: { fixtures } } } = await axios.get(`/fixtures/league/${leagueId}/last/100`);
  return fixtures;
}

export const getUpcomingLeagueFixtures = async (leagueId) => {
  const { data: { api: { fixtures } } } = await axios.get(`/fixtures/league/${leagueId}/next/100`);
  return fixtures;
}

export const getStandings = async (leagueId) => {
  const { data: { api: { standings } } } = await axios.get(`/leagueTable/${leagueId}`);
  return standings;
}

export const getMatchEvents = async (fixtureId) => {
  const { data: { api: { events } } } = await axios.get(`events/${fixtureId}`);
  return events;
}

export const getMatchStatistics = async (fixtureId) => {
  const { data: { api: { statistics } } } = await axios.get(`statistics/fixture/${fixtureId}`);
  return statistics;
}
