import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { getCompany,getCompanyById,resgisterCompany,updateCompany } from '../controllers/company.controllers.js';
import { singleUpload } from '../middlewares/multer.js';

const router = express.Router();

router.route("/register").post(isAuthenticated,resgisterCompany);
router.route("/get").get(isAuthenticated,getCompany);
router.route("/get/:id").get(isAuthenticated,getCompanyById);
router.route("/update/:id").put(isAuthenticated,singleUpload,  updateCompany);

export default router;