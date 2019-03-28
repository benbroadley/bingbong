<template>
  <div>
    <pre class="text-left">{{ output }}</pre>
  </div>
</template>

<script>
import axios from 'axios';
import { map } from 'lodash';

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
