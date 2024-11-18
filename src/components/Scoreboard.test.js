import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect.js';
import Scoreboard from './Scoreboard';

describe('Scoreboard Component', () => {
  test('renders the scoreboard', () => {
    render(<Scoreboard />);
    expect(screen.getByText('Football World Cup Scoreboard')).toBeInTheDocument();
  });

  test('start a new game', () => {
    render(<Scoreboard />);
    const homeTeamInput = screen.getByPlaceholderText('Home Team');
    const awayTeamInput = screen.getByPlaceholderText('Away Team');
    const startGameButton = screen.getByText('Start Game');

    fireEvent.change(homeTeamInput, { target: { value: 'IND' } });
    fireEvent.change(awayTeamInput, { target: { value: 'PAK' } });
    fireEvent.click(startGameButton);

    expect(screen.queryByText('Please enter Home Team & Away Team')).not.toBeInTheDocument();
    expect(screen.queryByText('A match between these two teams is already in progress. You can start a new match once the current one is finished')).not.toBeInTheDocument();
    expect(screen.getByText('IND vs PAK')).toBeInTheDocument();
  });

  test('shows error if teams are not entered', () => {
    render(<Scoreboard />);
    const startGameButton = screen.getByText('Start Game');
    fireEvent.click(startGameButton);

    expect(screen.getByText('Please enter Home Team & Away Team')).toBeInTheDocument();
  });

  test('shows error if match is already in progress', () => {
    render(<Scoreboard />);
    const homeTeamInput = screen.getByPlaceholderText('Home Team');
    const awayTeamInput = screen.getByPlaceholderText('Away Team');
    const startGameButton = screen.getByText('Start Game');

    fireEvent.change(homeTeamInput, { target: { value: 'IND' } });
    fireEvent.change(awayTeamInput, { target: { value: 'PAK' } });
    fireEvent.click(startGameButton);

    fireEvent.change(homeTeamInput, { target: { value: 'IND' } });
    fireEvent.change(awayTeamInput, { target: { value: 'PAK' } });
    fireEvent.click(startGameButton);

    expect(screen.getByText('A match between these two teams is already in progress. You can start a new match once the current one is finished')).toBeInTheDocument();
  });

  test('updates the score of an ongoing match', () => {
    render(<Scoreboard />);
    const homeTeamInput = screen.getByPlaceholderText('Home Team');
    const awayTeamInput = screen.getByPlaceholderText('Away Team');
    const startGameButton = screen.getByText('Start Game');
    const updateScoreButton = screen.getByText('Update Score');
    const homeScoreInput = screen.getByPlaceholderText('Home Score');
    const awayScoreInput = screen.getByPlaceholderText('Away Score');
    const matchSelect = screen.getByRole('combobox');
    
    fireEvent.change(homeTeamInput, { target: { value: 'IND' } });
    fireEvent.change(awayTeamInput, { target: { value: 'PAK' } });
    fireEvent.click(startGameButton);

    fireEvent.change(matchSelect, { target: { value: '6' } });
    fireEvent.change(homeScoreInput, { target: { value: '3' } });
    fireEvent.change(awayScoreInput, { target: { value: '4' } });
    fireEvent.click(updateScoreButton);
    
    expect(screen.getByText('Please select a match to update score')).toBeInTheDocument();
  });
  
  test('shows error if no match selected for score update', () => {
    render(<Scoreboard />);
    const updateScoreButton = screen.getByText('Update Score');
    fireEvent.click(updateScoreButton);

    expect(screen.getByText('Please select a match to update score')).toBeInTheDocument();
  });

  test('finishes an ongoing match', () => {
    render(<Scoreboard />);
    const homeTeamInput = screen.getByPlaceholderText('Home Team');
    const awayTeamInput = screen.getByPlaceholderText('Away Team');
    const startGameButton = screen.getByText('Start Game');
    const finishMatchButton = screen.getByText('Finish Match');
    const matchSelect = screen.getByRole('combobox');

    fireEvent.change(homeTeamInput, { target: { value: 'IND' } });
    fireEvent.change(awayTeamInput, { target: { value: 'PAK' } });
    fireEvent.click(startGameButton);

    fireEvent.change(matchSelect, { target: { value: '6' } });
    fireEvent.click(finishMatchButton);

    expect(screen.getByText('Please select a match to finish')).toBeInTheDocument();
    expect(screen.getByText('IND vs PAK')).toBeInTheDocument();
  });

  test('shows error if no match selected for finish', () => {
    render(<Scoreboard />);
    const finishMatchButton = screen.getByText('Finish Match');
    fireEvent.click(finishMatchButton);

    expect(screen.getByText('Please select a match to finish')).toBeInTheDocument();
  });

  test('displays summary of matches', () => {
    render(<Scoreboard />);
    const getSummaryButton = screen.getByText('Get Summary');
    fireEvent.click(getSummaryButton);

    expect(screen.getByText('Summary')).toBeInTheDocument();
  });
});
