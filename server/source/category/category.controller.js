const { Category, UserCategory } = require('../../models');
const HTTP_CODE = require('../../utils/httpCode');
const createError = require('http-errors');
const db = require('../../models');

class CategoryController {
  static async list(req, res, next) {
    try {
      const categories = await Category.findAll();
      return res.status(HTTP_CODE.OK).json({ data: categories });
    } catch (error) {
      next(createError(HTTP_CODE.INTERNAL_SERVER_ERROR, error));
    }
  }

  static async createPreferences({ body: { preferences } }, res, next) {
    try {
      const listUniqueUserIds = [
        ...new Set(
          preferences.map(({ user_id }) => {
            return user_id;
          }),
        ),
      ];

      await db.sequelize.transaction(async (t) => {
        await Promise.all(
          preferences.map(async (item) => {
            await UserCategory.findOrCreate({
              where: {
                user_id: item.user_id,
                category_id: item.category_id,
              },
              defaults: {
                user_id: item.user_id,
                category_id: item.category_id,
              },
              transaction: t,
            });
          }),
        );
        return 0;
      });

      const data = await UserCategory.findAll({
        where: {
          user_id: listUniqueUserIds,
        },
      });
      return res.status(HTTP_CODE.CREATED).json({ data });
    } catch (error) {
      next(createError(HTTP_CODE.INTERNAL_SERVER_ERROR, error));
    }
  }

  static async updatePreferences({ body: { preferences } }, res, next) {
    try {
      const listUniqueUserIds = [
        ...new Set(
          preferences.map(({ user_id }) => {
            return user_id;
          }),
        ),
      ];

      await db.sequelize.transaction(async (t) => {
        await UserCategory.destroy({
          where: {
            user_id: listUniqueUserIds,
            //category_id: listUniqueCategoryIds,
          },
          force: true,
          transaction: t,
        });

        await Promise.all(
          preferences.map(async (item) => {
            await UserCategory.findOrCreate({
              where: {
                user_id: item.user_id,
                category_id: item.category_id,
              },
              defaults: {
                user_id: item.user_id,
                category_id: item.category_id,
              },
              transaction: t,
            });
          }),
        );
        return 0;
      });

      const data = await UserCategory.findAll({
        where: {
          user_id: listUniqueUserIds,
        },
      });
      return res.status(HTTP_CODE.CREATED).json({ data });
    } catch (error) {
      next(createError(HTTP_CODE.INTERNAL_SERVER_ERROR, error));
    }
  }

  static async userPreferences(req, res, next) {
    try {
      const { id } = req.USER_LOGGED;
      const preferences = [
        ...(await UserCategory.findAll({
          where: { user_id: id },
          include: ['Category'],
        })),
      ].map((preference) => {
        return preference.Category;
      });
      return res.json({ data: preferences });
    } catch (error) {
      next(createError(HTTP_CODE.INTERNAL_SERVER_ERROR, error));
    }
  }
}

module.exports = CategoryController;
