<template>
  <div class="hello">
    <b-form @submit="submit">
      <div class="row mb-2">
        <div class="col-1">Group:</div>
        <b-form-select v-model="game.group" :options="groupOptions" class="col-11"/>
      </div>
      <div class="row mb-2">
        <div class="col-1">Player 1:</div>
        <b-form-select inline v-model="game.player1" :options="playerOptions" class="col-5" />
        <div class="col-1">Score 1:</div>
        <b-form-select inline v-model="game.score1" :options="scoreOptions" class="col-5"/>
      </div>
      <div class="row mb-2">
        <div class="col-1">Player 2:</div>
        <b-form-select inline v-model="game.player2" :options="playerOptions" class="col-5" />
        <div class="col-1">Score 2:</div>
        <b-form-select inline v-model="game.score2" :options="scoreOptions" class="col-5"/>
      </div>
      <div class="row mb-2">
        <div class="text-red">{{ msg }}</div>
      </div>
      <b-button variant="primary" type="submit" class="mt-3 pr-5 pl-5">Save</b-button>
    </b-form>
  </div>
</template>

<script>
import { range, map } from 'lodash';
import axios from 'axios';

const players = require('../assets/players');

export default {
  name: 'EntryForm',
  data() {
    return {
      game: {
        group: 1,
        player1: '',
        player2: '',
        score1: -1,
        score2: -1,
      },
      players,
      msg: '',
      groupOptions: range(1, 5),
      scoreOptions: range(0, 21),
    };
  },
  computed: {
    playerOptions() {
      return map(this.players[this.game.group], 'name');
    },
  },
  methods: {
    submit() {
      if (this.game.score1 < 11 && this.game.score2 < 11) {
        this.msg = 'Someone must have won...';
        return;
      }

      if (Math.abs(this.game.score1 - this.game.score2) > 2 &&
        (this.game.score1 > 11 || this.game.score2 > 11)) {
        this.msg = 'How did this score even happen?';
        return;
      }

      if (Math.abs(this.game.score1 - this.game.score2) < 2) {
        this.msg = 'Must have won by at least 2 clear points.';
        return;
      }

      if (!this.game.player1 || !this.game.player2 ||
        this.game.score1 < 0 || this.game.score2 < 0) {
        this.msg = 'Some data is missing.';
        return;
      }

      if (this.game.player1 === this.game.player2) {
        this.msg = 'The players are the same...';
        return;
      }

      axios.post('http://localhost:4000/game', this.game)
        .then(() => {
          this.msg = `Added: ${JSON.stringify(this.game)}`;
        })
        .catch((e) => {
          this.msg = e;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.text-red {
  color: #d00;
}
</style>
