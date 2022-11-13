const { Course, CourseCategory, Category } = require('../../models');
const HTTP_CODE = require('../../utils/httpCode');
const createError = require('http-errors');
const sharp = require('sharp');
const { s3upload, s3getUrl } = require('../../utils/third-parties/awsS3');
const { fullCurrentDate } = require('../../utils/date');

class CourseController {
  /**
   * ToDO:
   * List page quality
   * orders
   * filters
   * returns with categories
   */
  static list = async (req, res, next) => {
    try {
      const courses = await Course.findAll({
        include: [
          {
            model: CourseCategory,
            attributes: ['id'],
            as: 'CourseCategory',
            include: [{ model: Category, attributes: ['id', 'name'], as: 'Category' }],
          },
        ],
      });
      const data = await Promise.all(courses.map(this.#transform));

      return res.status(HTTP_CODE.OK).json({ data });
    } catch (error) {
      next(createError(HTTP_CODE.INTERNAL_SERVER_ERROR, error));
    }
  };

  static create = async ({ body, files }, res, next) => {
    try {
      const filesStore = await this.#validateFile(files);

      const categories = body.categories_ids.map((id) => {
        return { category_id: id };
      });

      let course = await Course.create(
        {
          name: body.name,
          description: body.description,
          image_url: filesStore['image']?.path,
          CourseCategory: categories,
        },
        {
          include: ['CourseCategory'],
        },
      );

      course = await Course.findByPk(course.id, {
        include: [
          {
            model: CourseCategory,
            attributes: ['id'],
            as: 'CourseCategory',
            include: [{ model: Category, attributes: ['id', 'name'], as: 'Category' }],
          },
        ],
      });

      const data = await this.#transform(course);
      return res.status(HTTP_CODE.OK).json({ data });
    } catch (error) {
      next(createError(HTTP_CODE.INTERNAL_SERVER_ERROR, error));
    }
  };

  static update = async ({ body, params: { id } }, res, next) => {
    try {
      let course = await Course.findByPk(id);

      await course.update({
        name: body.name,
        description: body.description,
      });

      // DELETE OLD RELATION AND CREATE NEW RELATIONS

      if (body.categories_ids) {
        await CourseCategory.destroy({
          where: {
            course_id: course.id,
          },
          force: true,
        });
        const categories = body.categories_ids.map((id) => {
          return { category_id: id, course_id: course.id };
        });
        await CourseCategory.bulkCreate(categories);
      }

      // FIND AND FORMAT

      course = await Course.findByPk(course.id, {
        include: [
          {
            model: CourseCategory,
            attributes: ['id'],
            as: 'CourseCategory',
            include: [{ model: Category, attributes: ['id', 'name'], as: 'Category' }],
          },
        ],
      });

      const data = await this.#transform(course);
      return res.status(HTTP_CODE.OK).json({ data });
    } catch (error) {
      next(createError(HTTP_CODE.INTERNAL_SERVER_ERROR, error));
    }
  };

  static #validateFile = async (files) => {
    const filterFiles = !files ? [] : files.filter((file) => ['image'].includes(file.fieldname));
    let filesStore = { image: {} };

    await Promise.all(
      filterFiles.map(async (file) => {
        let extName = file.originalname.split('.').pop().toLocaleLowerCase();
        let storePath = `Hackathon/course/course-${fullCurrentDate()}.${extName}`;
        let buffer = await sharp(file.buffer).webp({ quality: 20 }).toBuffer();

        filesStore[file.fieldname].path = storePath;
        return s3upload(buffer, storePath);
      }),
    );
    return filesStore;
  };

  static #transform = async (current) => {
    return new Promise(async function (resolve, reject) {
      try {
        const categories = current.CourseCategory
          ? current.CourseCategory.map((e) => {
              return {
                id: e.Category.id,
                name: e.Category.name,
              };
            })
          : [];

        const data = {
          id: current.id,
          name: current.name,
          description: current.description,
          image_url: await s3getUrl(current.image_url),
          category: categories,
        };

        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };
}

module.exports = CourseController;
