# Football World Cup Scoreboard

This project is a React application which allows user to create, display and manage footbal matches. They can create, update , finish matches and can get Summary of the matches.

## Installation

1. Clone the repository:
   git clone https://github.com/AbinayaBabuSri/Worldcup-Football-Scoreboard.git
   
   cd football-scoreboard
2. Install dependencies:
    ### `npm install`

## Available Scripts

1. Start the development server: 
    ### `npm start`
2. Open your browser and navigate to: http://localhost:3000
    
    The page will reload when you make changes.
    You may also see any lint errors in the console.
3. You will see the Football World Cup Scoreboard interface where you can start new    matches, update scores, finish matches, and get the summary.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Notes

1. Entering the team names and clicking the `Start Game` button will create a new match, which will then appear in both the match dropdown and the summary.
2. After selecting a match from the dropdown, users can update the scores and save them by clicking the `Update Score` button.
3. To conclude a match, click the `Finish Game` button. Note that updating the team scores and then clicking the `Finish Game` button will not save the updated scores.
4. Upon finishing a game, the match will be removed from the dropdown but will remain visible in the summary section.
5. To view the summary of all matches, click the `Get Summary` button. Matches will be sorted by the highest total score, and if multiple matches have the same total score, ongoing matches will be listed at the top.
6. Error messages will be displayed if the `Start Game` button is clicked without entering team names, or if the `Update Score` or `Finish Game` buttons are clicked without selecting a match.
7. If a match is already in progress, attempting to start a new match with the same teams will result in an error message. A new match with the same teams can only be started once the ongoing match is finished.