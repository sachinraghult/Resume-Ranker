const express = require("express");

const logger = require("../log");

const getNormaliser = async (req, res) => {
  try {
    const applications = req.body.applications;

    const scores = [];

    applications.map((application) => {
      if (application.preprocessing_data) {
        let preprocessing_data = JSON.parse(application.preprocessing_data);
        scores.push({
          application: application._id,
          scores: preprocessing_data.scores,
          failed: false,
        });
      } else {
        scores.push({
          application: application._id,
          scores: [],
          failed: true,
        });
      }
    });

    // let maxOverall = 0;
    // let minOverall = 1000;

    // let maxSkill = 0;
    // let minSkill = 1000;

    // let maxExp = 0;
    // let minExp = 1000;

    // let maxOrg = 0;
    // let minOrg = 1000;

    // let maxJob = 0;
    // let minJob = 1000;

    // let maxKey = 0;
    // let minKey = 1000;

    // let maxAcc = 0;
    // let minAcc = 1000;

    // scores.map((score) => {
    //   if (!score.failed) {
    //     if (score.scores[0] > maxOverall) maxOverall = score.scores[0];
    //     if (score.scores[0] < minOverall) minOverall = score.scores[0];

    //     if (score.scores[1] > maxSkill) maxSkill = score.scores[1];
    //     if (score.scores[1] < minSkill) minSkill = score.scores[1];

    //     if (score.scores[2] > maxExp) maxExp = score.scores[2];
    //     if (score.scores[2] < minExp) minExp = score.scores[2];

    //     if (score.scores[3] > maxOrg) maxOrg = score.scores[3];
    //     if (score.scores[3] < minOrg) minOrg = score.scores[3];

    //     if (score.scores[4] > maxJob) maxJob = score.scores[4];
    //     if (score.scores[4] < minJob) minJob = score.scores[4];

    //     if (score.scores[5] > maxKey) maxKey = score.scores[5];
    //     if (score.scores[5] < minKey) minKey = score.scores[5];

    //     if (score.scores[6] > maxAcc) maxAcc = score.scores[6];
    //     if (score.scores[6] < minAcc) minAcc = score.scores[6];
    //   }
    // });

    // scores.map((score) => {
    //   if (!score.failed) {
    //     if (minSkill !== maxSkill) {
    //       score.scores[1] =
    //         (score.scores[1] - minSkill + 0.001) / (maxSkill - minSkill + 0.01);
    //     } else {
    //       score.scores[1] = 1;
    //     }
    //     if (minExp !== maxExp) {
    //       score.scores[2] =
    //         (score.scores[2] - minExp + 0.001) / (maxExp - minExp + 0.01);
    //     } else {
    //       score.scores[2] = 1;
    //     }
    //     if (minOrg !== maxOrg) {
    //       score.scores[3] =
    //         (score.scores[3] - minOrg + 0.001) / (maxOrg - minOrg + 0.01);
    //     } else {
    //       score.scores[3] = 1;
    //     }
    //     if (minJob !== maxJob) {
    //       score.scores[4] =
    //         (score.scores[4] - minJob + 0.001) / (maxJob - minJob + 0.01);
    //     } else {
    //       score.scores[4] = 1;
    //     }
    //     if (minKey !== maxKey) {
    //       score.scores[5] =
    //         (score.scores[5] - minKey + 0.001) / (maxKey - minKey + 0.01);
    //     } else {
    //       score.scores[5] = 1;
    //     }
    //     if (minAcc !== maxAcc) {
    //       score.scores[6] =
    //         (score.scores[6] - minAcc + 0.001) / (maxAcc - minAcc + 0.01);
    //     } else {
    //       score.scores[6] = 1;
    //     }
    //     score.scores[0] =
    //       (score.scores[1] +
    //         score.scores[2] +
    //         score.scores[3] +
    //         score.scores[4] +
    //         score.scores[5] +
    //         score.scores[6]) /
    //       6;
    //   }
    // });

    return res.status(200).json(scores);
  } catch (e) {
    logger.error(e.stack);
    return res.status(401).send({ error: "cannot normalise the scores" });
  }
};

const router = express.Router();

router.post("/", getNormaliser);

module.exports = router;
