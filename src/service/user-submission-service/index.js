import axios from 'axios';
import util from "@/util";

class UserSubmissionService {
  constructor() {
  }

  totalAcCount(res) {
    return Object.values(res.solveCountByType).reduce((a, b) => a + b);
  }

  makeLineCharData(res) {
    const labels = [];
    const datasets = [];
    const acCounts = {label: 'AC count', backgroundColor: '#0aa804', data: []};
    const submissionCounts = {label: 'Submission count', backgroundColor: '#081c01', data: []};

    res.countAra.forEach(data => {
      labels.push(data.date);
      acCounts.data.push(data.uniqueAcCount);
      submissionCounts.data.push(data.totalSubmission);
    });
    datasets.push(acCounts);
    datasets.push(submissionCounts);

    return {labels, datasets};
  }

  makePieCharData({solveCountByType}) {
    const pieChartData = {
      labels: [],
      datasets: [{
        borderWidth: 1,
        backgroundColor: [],
        data: []
      }]
    };

    Object.keys(solveCountByType).forEach(key => {
      pieChartData.labels.push(key);
      pieChartData.datasets[0].backgroundColor.push(util.dynamicColors());
      pieChartData.datasets[0].data.push(solveCountByType[key]);
    });

    return pieChartData;
  }

  async getSubmissionData(handleId, days) {
    const url = `http://localhost:8080/users/${handleId}/submissions/count?days=${days}`;
    const res = await axios.get(url).then(response => {
      return response.data;
    });
    const lineChartData = this.makeLineCharData(res);
    const acCount = this.totalAcCount(res);
    const pieChartData = this.makePieCharData(res);

    return {
      lineChartData,
      totalSubmissionCount: res.totalSubmissionCount,
      acCount,
      pieChartData
    };
  }
}

export default new UserSubmissionService();
