import React, { useEffect, useState } from 'react';

const Scoreboard = () => {
  const [onGoingMatches, setOnGoingMatches] = useState([]);
  const [allMatches, setAllMatches] = useState([...onGoingMatches]);
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [selectedMatchId, setSelectedMatchId] = useState('');
  const [summaryData, setSummaryData] = useState('');
  const [showSummary, setShowSummary] = useState(false); 
  const [error, setError] = useState('');
 
  const startGame = () => {
  const existingMatch =  onGoingMatches.filter((match) =>
    ((match.homeTeam.toLowerCase() === homeTeam.toLowerCase() || 
      match.homeTeam.toLowerCase() === awayTeam.toLowerCase()) 
    && (match.awayTeam.toLowerCase() === homeTeam.toLowerCase()||
      match.awayTeam.toLowerCase() === awayTeam.toLowerCase()) )
      );

    if(!homeTeam || !awayTeam){
        setError('Please enter Home Team & Away Team');
        return;
    }else if(existingMatch.length > 0){
      setError('A match between these two teams is already in progress. You can start a new match once the current one is finished');
      return;
    }
    const newMatch = {
      id: allMatches.length + 1,
      homeTeam: homeTeam,
      awayTeam: awayTeam,
      homeScore: 0,
      awayScore: 0,
      startTime: new Date().getTime()
    };
    setAllMatches([...allMatches, newMatch]);
    setOnGoingMatches([...onGoingMatches, newMatch]);
    setHomeTeam('');
    setAwayTeam('');
    setError('');
  };

  const updateScore = () => {
    if (!selectedMatchId) {
        setError('Please select a match to update score');
      return;
    }

    const updatedOnGoingMatches = onGoingMatches.map(match => {
        if (match.id === parseInt(selectedMatchId)) {          
          return {
            ...match,
            homeScore: homeScore,
            awayScore: awayScore
          };
        }
        return match;
      });

      const updatedAllMatches = allMatches.map(match => {
        if (match.id === parseInt(selectedMatchId)) {
          return {
            ...match,
            homeScore: homeScore,
            awayScore: awayScore
          };
        }
        return match;
      });

    setOnGoingMatches(updatedOnGoingMatches);
    setAllMatches(updatedAllMatches);
    setHomeScore(0);
    setAwayScore(0);
    setSelectedMatchId('');
    setError('');
  };

  const finishMatch = () => {
    if (!selectedMatchId) {
      setError('Please select a match to finish');
      return;
    }

    const updatedOngoingMatches = onGoingMatches.filter(match => match.id !== parseInt(selectedMatchId));
    const updatedAllMatches = allMatches.map(match => {
      if (match.id === parseInt(selectedMatchId)) {
        return {
          ...match
        };
      }
      return match;
    });

    setOnGoingMatches(updatedOngoingMatches);
    setAllMatches(updatedAllMatches);
    setSelectedMatchId('');
    setError('');
  };

  const getSummary = () => {
    const sortedMatches = [...allMatches].sort((a, b) => {
        const totalScoreA = a.homeScore + a.awayScore;
        const totalScoreB = b.homeScore + b.awayScore;
        if (totalScoreA !== totalScoreB) {
          return totalScoreB - totalScoreA; 
        } else {
          return b.startTime - a.startTime; 
        } 
      });
  
    const summary = sortedMatches.map(match => `${match.homeTeam} ${match.homeScore} - ${match.awayTeam} ${match.awayScore}`).join("\n");
           
    setSummaryData(summary);
    setShowSummary(true);
  };

  useEffect(() => {
    const selectedMatch = onGoingMatches.find(match => match.id === parseInt(selectedMatchId));
    if(selectedMatch){
        setHomeScore(selectedMatch.homeScore);
        setAwayScore(selectedMatch.awayScore);
    }else{
        setHomeScore(0);
        setAwayScore(0);
    }
  }, [selectedMatchId,onGoingMatches]);

  return (
    <div>
      <h1>Football World Cup Scoreboard</h1>
      <div>
        <input type="text" value={homeTeam} placeholder="Home Team" onChange={e => setHomeTeam(e.target.value)} />
        <input type="text" value={awayTeam} placeholder="Away Team" onChange={e => setAwayTeam(e.target.value)} />
        <button onClick={startGame}>Start Game</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      <div>
        <select value={selectedMatchId} onChange={e => setSelectedMatchId(e.target.value)}>
          <option value="">Select Match</option>
          {onGoingMatches.map(match => (
            <option key={match.id} value={match.id}>{`${match.homeTeam} vs ${match.awayTeam}`}</option>
          ))}
        </select>
        <input type="number" min={0} value={homeScore} placeholder="Home Score" onChange={e => setHomeScore(Number(e.target.value))} />
        <input type="number" min={0} value={awayScore} placeholder="Away Score" onChange={e => setAwayScore(Number(e.target.value))} />
        <button onClick={updateScore}>Update Score</button>
        <button onClick={finishMatch}>Finish Match</button>
        <button onClick={getSummary}>Get Summary</button>
      </div>
      {showSummary && ( 
        <div>
          <h2>Summary</h2>
          <pre>{summaryData}</pre>
        </div>
      )}
    </div>
  );
};

export default Scoreboard;