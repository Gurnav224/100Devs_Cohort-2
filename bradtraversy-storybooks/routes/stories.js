
const express = require('express');

const router = express.Router();
const { ensureAuth  } = require('../middlewares/auth');
const Story = require('../models/Story');


//@desc => show add page
// @route  GET /stories/add

router.get('/add', ensureAuth ,  (req, res) => {
    res.render('stories/add')
});

//@desc => Process add form
// @route  POST stories 

router.post('/', ensureAuth ,  async (req, res) => {
    try {
        req.body.user = req.user.id;;
        await Story.create(req.body);
        res.redirect('/dashboard')
    } catch (error) {
        console.error(error)
        res.render('error/500')
    }
});



//@desc => show all Stories
// @route  GET /stories/add

router.get('/', ensureAuth , async (req, res) => {
    try {
        const stories = await Story.find({status:'public'}).populate('user').sort({createdAt:'desc'}).lean();
        

        res.render('stories/index', {
            stories,
        })
    } catch (error) {
        console.error(error)
        res.render('error/500')
    }
});


//@desc => show Single Story
// @route  GET /stories/:id

router.get('/:id', ensureAuth , async (req, res) => {
    try {
        let story = await Story.findById(req.params.id).populate('user').lean();

        if(!story) {
            return res.render("error/404")
        }

            res.render('stories/show',{
                story
            })
    } catch (error) {
        console.error(error)
        res.status('error/500')
    }
});


//@desc => show story edit page
// @route  GET /stories/edit/:id

router.get('/edit/:id', ensureAuth , async (req, res) => {
    try {
        const story = await Story.findOne({
            _id:req.params.id
        }).lean();
    
        if(!story) {
            return res.render('error/404')
        }
    
        if(story.user != req.user.id) {
            res.redirect('/stories')
        }
        else{
            res.render('stories/edit',{
                story
            })
        }
    } catch (error) {
        console.error(error);
        return res.render('error/500')
    }
});


//@desc => update story
// @route  PUT stories/:id

router.put('/:id', ensureAuth , async (req, res) => {
    try {
        let story = await Story.findById(req.params.id).lean();

    if(!story){
        return res.render('error/404')
    }
    if(story.user != req.user.id) {
        res.redirect('/stories')
    }
    else{
        story = await Story.findOneAndUpdate({_id:req.params.id}, req.body,{
            new:true,
            runValidators:true
        })
        res.redirect('/dashboard')
    }
    } catch (error) {
        console.error(error);
        return res.render('error/500')
    }


});


//@desc => show add page
// @route  GET /stories/add

router.delete('/:id', ensureAuth , async (req, res) => {
    try {
        await Story.findByIdAndDelete({_id:req.params.id})
        res.redirect('/dashboard')
    } catch (error) {
        console.error(error);
        return res.render('error/500')
    }
});


//@desc => show add page
// @route  GET /stories/add

router.get('/user/:userId', ensureAuth , async (req, res) => {
    try {
        const stories = await Story.find({
            user:req.params.userId,
            status:'public'
        }).populate('user').lean();

        res.render('stories/index',{stories})
    } catch (error) {
        console.error('error',error);
        res.render('error/500')
    }
});



module.exports = router;



