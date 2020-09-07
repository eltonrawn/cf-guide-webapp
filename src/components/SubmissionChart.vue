<script>
import {Bar, mixins} from 'vue-chartjs';
const { reactiveProp } = mixins;

export default {
  name: "BarCharto",
  extends: Bar,
  mixins: [reactiveProp],
  data: () => ({
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),

  mounted() {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
