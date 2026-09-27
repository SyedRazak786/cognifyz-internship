// Simple background job queue (Task 8 requirement: background task/job processing)
// Jobs are processed one at a time, asynchronously, without blocking incoming requests.

class JobQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
    this.completedLog = [];
  }

  add(job) {
    const jobWithId = { id: Date.now() + Math.random(), ...job, status: 'queued' };
    this.queue.push(jobWithId);
    this._processNext();
    return jobWithId.id;
  }

  async _processNext() {
    if (this.processing || this.queue.length === 0) return;
    this.processing = true;

    const job = this.queue.shift();
    job.status = 'processing';

    try {
      // Simulate work (e.g., sending an email, generating a report)
      await new Promise(resolve => setTimeout(resolve, job.durationMs || 1000));
      job.status = 'done';
      job.result = job.result || 'completed successfully';
    } catch (err) {
      job.status = 'failed';
      job.error = err.message;
    }

    this.completedLog.unshift(job);
    if (this.completedLog.length > 20) this.completedLog.pop();

    this.processing = false;
    this._processNext(); // process next job in queue, if any
  }

  getStatus() {
    return {
      pending: this.queue.length,
      currentlyProcessing: this.processing,
      recentJobs: this.completedLog
    };
  }
}

module.exports = new JobQueue();
