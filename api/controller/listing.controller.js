import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async(req, res, next) =>{
    // console.log(req.body)
    try {
        const listing = new Listing(req.body);

        console.log('listing bana di');

        await listing.save()
        res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
}

export const deleteListing = async(req, res, next)=>
{
    const listing = await Listing.findById(req.params.id);
    // console.log(listing);

    if(!listing ){
        next(errorHandler(404, 'Listing not found.'));
        return;
   }

   try {
        if(req.user.id !== listing.userRef){
            next(errorHandler(401, 'You can delete only your listing.'));
            return;
        }

        const deletedListing = await Listing.findByIdAndDelete(req.params.id);

        console.log('listing deleted');
        
        res.status(200).json({message : 'Listing deleted successfully.'});
        
    } catch (error) {
        next(error);   
    }

}

export const updateListing = async (req, res, next) =>{
    const listing = await Listing.findById(req.params.id);

    if(!listing ){
        next(errorHandler(404, 'Listing not found.'));
        return;
   }
   if(req.user.id !== listing.userRef){
    next(errorHandler(401, 'You can update only your listing.'));
    return;
    }


   try {

    const updatedListing = await Listing.findByIdAndUpdate(req.params.id,
        req.body,
        { new: true }
        );
        res.status(200).json(updatedListing);

   } catch (error) {
        next(error);
   }
}

export const getListing = async (req, res, next) =>{

    try {
        const listing = await Listing.findById(req.params.id);

        if(!listing){
            next(errorHandler(404, 'Listing not found!'));
        }
        console.log('listing de di');
        res.status(200).json(listing);
        
    } catch (error) {
        next(error);
    }
}

export const getListings = async (req, res, next) =>{
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;

        const searchTerm = req.query.searchTerm || '';

        // console.log(req.query);

        let offer = req.query.offer;
        if(offer === undefined || offer === 'false'){
            offer = {$in : [false, true]};
        }else{
            offer = true;
        }
        let parking = req.query.parking;
        if(parking === undefined || parking === 'false'){
            parking = {$in : [false, true]};
        }else{
            parking = true;
        }

        let type = req.query.type;
        if(type === undefined || type == 'all'){
            type = {$in : ['rent', 'sell']};
        }

        let furnished = req.query.furnished;
        if(furnished === undefined || furnished === 'false'){
            furnished = {$in : [true, false]};
        }else{
            furnished = true;
        }

        let sort = req.query.sort || 'createdAt';
        let order = req.query.order || 'desc'

        const data = await Listing.find({
            name  : { $regex:searchTerm, $options: 'i'},
            offer : offer, 
            furnished,
            type,
            parking,
        }).sort({
            [sort] : order,
        }).limit(limit).skip(startIndex);


        res.status(200).json(data);
        
    } catch (error) {
        next(error);
    }
}