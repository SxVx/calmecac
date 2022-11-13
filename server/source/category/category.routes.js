const router = require('express').Router();
const CategoryController = require('./category.controller');
const { verifyToken } = require('../../utils/third-parties/jwt');
const { validateCreatePreferences, validateUpdatePreferences } = require('./category.validator');

router.get('/list', verifyToken, CategoryController.list);

router.post(
  '/create-preferences',
  verifyToken,
  validateCreatePreferences,
  CategoryController.createPreferences,
);

router.post(
  '/create-preferences',
  verifyToken,
  validateCreatePreferences,
  CategoryController.createPreferences,
);

router.put(
  '/update-preferences',
  verifyToken,
  validateUpdatePreferences,
  CategoryController.updatePreferences,
);

const sdk = require('api')('@blokness/v1.0#5clkdm1elabon1uq');

router.get('/x', async (req, res) => {
  const x = await sdk
    .nftDetails({
      collection_smart_contract_address: '0xe583b581d5B294B3ddCC7DaAcfbe7afC56516E4c',
      token_id: '22045FAB-5B44-4A43-A9D4-95D4F58DE046',
      'x-api-key': 'BLK.pxBOd7gi1FzvYoKaHR9yV1Mp4Ujr9ALl4Mqj2PzwPgnjxT9tK/kgYbMHbhrpC5ww',
    })
    .then(({ data }) =>{
       return data
      },

      )
    .catch((err) => {

      console.error(err)
    });


  res.json({ x });
});

router.get('/user-preferences', verifyToken, CategoryController.userPreferences);

module.exports = router;
