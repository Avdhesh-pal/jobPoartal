import { Company } from '../model/company.model.js';
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";
export const resgisterCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "company name is required",
                success: false
            });
        };
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "You can't register same company.",
                success: false
            })
        }
        company = await Company.create({
            name: companyName,
            userId: req.id
        });
        return res.status(201).json({
            message: "Company registered successflly.",
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getCompany = async(req,res)=>{
    try {
        const userId =req.id; // logged in user id
        const companies = await Company.find({userId});
        if(!companies){
            return res.status(404).json({
                message:"Companies not found",
                success:false
            })
        }
        return res.status(200).json({
            companies,
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}
// get compnay by id
export const getCompanyById = async(req,res)=>{
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(404).json({
                message:"Company not found",
                success:false
            })
        }
        return res.status(404).json({
            company,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
export const updateCompany = async(req,res)=>{
    try {
        const {name, description, website, location} = req.body;
        let logo;
        // idhar cloudinary ayega
        if (req.file) {
      // Convert file to Data URI, upload to Cloudinary
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      logo = cloudResponse.secure_url;
    }
        const updateData = {name, description, website, location,logo};
        const company = await Company.findByIdAndUpdate(req.params.id, updateData,{new:true})
        if(!company){
            return res.status(404)({
                message:"company not found",
                success:false
            })
        }
        return res.status(200).json({
            message:"Company information updated.",
            success:true
        })
    } catch (error) {
        console.log(error);
    }find
}