const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        order: [['created_at', 'DESC']],
        attributes: ['id', 
        'title', 
        'content', 
        'created_at'
        ],
        include: [
            {
                model: User,
                attributes: ['id', 'username']
            }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', {
            posts, 
            loggedIn: req.session.loggedIn,
            title: 'dashboard',
            layout: 'dashboard-main'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


//edit post
router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        order: [['created_at', 'DESC']],
        attributes: ['id', 
        'title', 
        'content', 
        'created_at'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'no post found with this id' });
            return;
        }
        //serialize the data
        const post = dbPostData.get({ plain: true });
        //pass data to template
        res.render('edit-post', { 
            post,
            loggedIn: true
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// router.get('/new', withAuth, (req, res) => {
//     Post.create({
//         where: {
//             user_id: req.session.user_id
//         },
//         title: req.body.title,
//         content: req.body.content,
//         user_id: req.session.user_id
//     })
//     .then(dbPostData => {
//         const post = dbPostData.get({ plain: true });
//         res.render('new-post', {
//             post, 
//             loggedIn: req.session.loggedIn
//         });
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });


module.exports = router;