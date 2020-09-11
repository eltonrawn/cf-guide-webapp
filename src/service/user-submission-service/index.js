import axios from 'axios';

class UserSubmissionService {
  constructor() {
  }

  async getSubmissionData(handleId, days) {
    const url = `http://localhost:8080/users/${handleId}/submissions/count?days=${days}`;
    const res = await axios.get(url).then(response => {
      return response.data;
    });

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

    const chartData = {labels, datasets};
    const totalSubmissionCount = res.totalSubmissionCount;
    const acCount = acCounts.data.reduce((res, count) => {
      return res + count;
    }, 0);
    return {chartData, totalSubmissionCount, acCount};
  }
}

export default new UserSubmissionService();
