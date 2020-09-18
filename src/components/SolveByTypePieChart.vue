<script>
import {Pie, mixins} from 'vue-chartjs'
const { reactiveProp } = mixins;

export default {
  extends: Pie,
  mixins: [reactiveProp],
  data () {
    return {
      options: {
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false,
      }
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
