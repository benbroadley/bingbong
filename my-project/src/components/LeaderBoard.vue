<template>
  <div>
    <div v-for="(groupPlayers, group) in output" :key="group" class="row">
      <b-table striped hover :items="groupPlayers"></b-table>
    </div>

  </div>
</template>

<script>
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import { map, forEach } from 'lodash';

export default {
  name: 'LeaderBoard',
  data() {
    return {
      output: '',
      map,
    };
  },
  created() {
    axios.get('http://localhost:4000/game')
      .then((res) => {
        const outputs = res.data;
        forEach(outputs, (players) => {
          forEach(players, (player, idx) => {
            if (idx <= 1) player._rowVariant = 'success';
          });
        });
        this.output = res.data;
      })
      .catch((e) => {
        this.msg = e;
      });
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
</style>
