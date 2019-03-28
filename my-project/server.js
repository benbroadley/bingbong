/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const _ = require('lodash');

const playersFromFile = require('./src/assets/players');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 4000;

const whoWon = (groups, games) => {
  _.forEach(games, (game) => {
    game.whoWon = game.score1 > game.score2 ? game.player1 : game.player2;
    game.difference = Math.abs(game.score1 - game.score2);
  });

  const players = [];

  _.forEach(groups, (groupPlayers, group) => {
    _.forEach(groupPlayers, (groupPlayer) => {
      const player = _.cloneDeep(groupPlayer);
      player.group = group;
      player.gamesWon = 0;
      player.difference = 0;
      _.forEach(_.filter(games, g => g.player1 === groupPlayer.name || g.player2 === groupPlayer.name), (game) => {
        if (game.whoWon === groupPlayer.name) {
          player.gamesWon += 1;
          player.difference += game.difference;
        } else {
          player.difference -= game.difference;
        }
      });
      players.push(player);
    });
  });

  return _.groupBy(_.orderBy(players, ['gamesWon', 'difference'], ['desc', 'desc']), p => p.group);
};

app.post('/game', (req, res) => {
  console.log('Called POST /game');
  let allGameData = fs.readFileSync('games.txt', 'utf8');
  allGameData = JSON.parse(allGameData);
  allGameData.push(req.body);
  const dataToAdd = JSON.stringify(allGameData, undefined, 2);
  fs.writeFileSync('games.txt', dataToAdd);
  res.status(200).send('Added.');
});

app.get('/game', (req, res) => {
  console.log('Called GET /game');
  const games = JSON.parse(fs.readFileSync('games.txt', 'utf8'));
  res.send(whoWon(playersFromFile, games));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
