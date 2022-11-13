const { Video } = require('../../models');
const HTTP_CODE = require('../../utils/httpCode');
const createError = require('http-errors');
const { s3upload, s3getUrl } = require('../../utils/third-parties/awsS3');
const { fullCurrentDate } = require('../../utils/date');

class VideoController {
  static list = async ({ params: { course_id } }, res, next) => {
    try {
      const videos = await Video.findAll({
        where: { course_id },
        order: [['order_in_course', 'ASC']],
      });
      const data = await Promise.all(videos.map(this.#transform));
      return res.status(HTTP_CODE.OK).json({ data });
    } catch (error) {
      next(createError(HTTP_CODE.INTERNAL_SERVER_ERROR, error));
    }
  };

  static create = async ({ body, files, params: { course_id } }, res, next) => {
    try {
      const filesStore = await this.#validateFile(files);
      let video = await Video.create({
        course_id: course_id,
        order_in_course: body.order_in_course,
        content_url: filesStore['video']?.path,
      });

      const data = await this.#transform(video);
      return res.status(HTTP_CODE.OK).json({ data });
    } catch (error) {
      next(createError(HTTP_CODE.INTERNAL_SERVER_ERROR, error));
    }
  };

  static #validateFile = async (files) => {
    const filterFiles = !files ? [] : files.filter((file) => ['video'].includes(file.fieldname));
    let filesStore = { video: {} };

    await Promise.all(
      filterFiles.map(async (file) => {
        let extName = file.originalname.split('.').pop().toLocaleLowerCase();
        let storePath = `Hackathon/video/video-${fullCurrentDate()}.${extName}`;

        filesStore[file.fieldname].path = storePath;
        return s3upload(file.buffer, storePath);
      }),
    );
    return filesStore;
  };

  static #transform = async (current) => {
    return new Promise(async function (resolve, reject) {
      try {
        const data = {
          id: current.id,
          course_id: current.course_id,
          order_in_course: current.order_in_course,
          content_url: await s3getUrl(current.content_url),
        };

        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };
}

module.exports = VideoController;
