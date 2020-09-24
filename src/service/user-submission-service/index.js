import axios from 'axios';

class UserSubmissionService {
  constructor() {
  }

  totalAcCount(res) {
    return Object.values(res.solveCountByType).reduce((a, b) => a + b);
  }

  makeLineCharData(res) {
    const labels = [];
    const datasets = [];
    const acCounts = {label: 'AC count', backgroundColor: '#06630b', data: []};
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

  makeSolveTypeByChartData({solveCountByType}) {
    const pieChartData = {
      labels: [],
      datasets: [{
        label: 'Solve count by type',
        borderWidth: 1,
        backgroundColor: [],
        data: []
      }]
    };

    Object.keys(solveCountByType).sort().forEach(key => {
      pieChartData.labels.push(key);
      pieChartData.datasets[0].backgroundColor.push('#42586d');
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
    const solveByTypeChartData = this.makeSolveTypeByChartData(res);

    return {
      lineChartData,
      totalSubmissionCount: res.totalSubmissionCount,
      acCount,
      solveByTypeChartData
    };
  }
}

export default new UserSubmissionService();
