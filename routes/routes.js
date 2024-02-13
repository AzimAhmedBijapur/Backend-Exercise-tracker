import express from 'express';
import Exercise from '../models/exerciseModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const totalCount = await Exercise.countDocuments({});

        const allWorkouts = await Exercise.find({})
            .skip(skip)
            .limit(limit);

        return res.json({
            totalCount: totalCount,
            totalPages: Math.ceil(totalCount / limit),
            workouts: allWorkouts
        });
    } catch (error) {
        return res.status(500).json(error);
    }
});



router.get('/exercise/:id',async (req,res)=>{

    try{
        const workouts = await Exercise.findById(req.params.id);
        return res.json(workouts);
    }
    catch (error) {
        return res.json(error);
    }
    
})

router.delete('/exercise/:id', async (req, res) => {
    try {
        const deletedExercise = await Exercise.findByIdAndDelete(req.params.id);
        if (!deletedExercise) {
            return res.status(404).send('Exercise not found');
        }
        return res.status(200).json(deletedExercise);
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.post('/add', async (req, res) => {
    try {
        const {  date, duration, description } = req.body;
        const newWorkout = new Exercise({  date, duration, description });
        const savedWorkout = await newWorkout.save();
        console.log(savedWorkout)
        return res.status(201).json(savedWorkout);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


export default router;